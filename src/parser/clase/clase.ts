import Analizador from "../analizador";
import Nodo from '../nodo';
import Class from '../tablaSimbolos/clase'
import Simbolo from "../tablaSimbolos/simbolo";
import nodoOperacion from "../exp/operacion/nodoOperacion";
import Metodo from "../tablaSimbolos/metodo";
import Location from "../location";
export default class Clase{

    private analizador:Analizador
    constructor(analizador:Analizador){
        this.analizador = analizador;
    }

     /**
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo 
     */
    public crearClase (nodo:Nodo):boolean{
        let nombre:string =nodo.childNode[0].term;
        switch(nombre){
            case "Clase":
                this.analizador.log("crearClase a Clase: "+ 
                this.clase(nodo.childNode[0]));
                this.exixteContructor (nodo.childNode[1].location);
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de "+nombre,0,0)
        return false;
    }


    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo 
     */
    public clase(nodo:Nodo):boolean{
        let nombre:string =nodo.childNode[0].term;
        switch(nombre){
            case "CLASE":
                this.analizador.claseA = this.analizador.buscarClase(nodo.childNode[1].token);
                this.herencia(nodo.childNode[2]);
                this.asignarVariablesGlobales();
                return true;
            case "Clase":
                this.analizador.log("clase a clase: " +
                this.clase(nodo.childNode[0]));
                this.cuerpoClase(nodo.childNode[1]);
                
                return true;
        }
      
        this.analizador.newError("no se pudo encontrar la clase con el nombre de "+nombre,0,0)
        return false;
    }
    private exixteContructor(location:Location) {
        
        let metodo = this.analizador.claseA.buscarMetodo(this.analizador.claseA.nombre)
        if ( metodo.escrito === false) {
            this.escribirContructor(location)
        }else {

        }
    }

    private escribirContructor(location:Location) {
        this.analizador.metodoA.constructorDefault(location);
    }
    /**
     * Herencia
     *:'{'
     *| HEREDADE ID '{'
     *;
     * @param nodo 
     */
    public herencia(nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "HEREDADE":
                this.analizador.logPorCompletar("herencia");
                this.analizador.log("agregando herencia " + nodo.childNode[1].token);
                return true;
            case "Herencia":
                this.herencia(nodo.childNode[0]);
                return true;
                case "'{'":
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de "+nombre,0,0)
        return false;
    }

    /**
     * este es el metod la produccion cuerpoClaes
     * CuerpoClase
     *   : DeclaracionClase 
     *   | SobreEscribir
     *   | Estruct
     * ;
     * @param nodo 
     */
    public cuerpoClase(nodo:Nodo):boolean{
        
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "DeclaracionClase"://declaracion de una variable en una clase
                return true;
            case "SobreEscribir":
                this.analizador.log("cuerpoClase a sobrescribir: "+
                this.analizador.metodoA.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.analizador.logPorCompletar("agreagar struct a tabla de simbolos");
                return true 
            case "CuerpoClase":
                this.analizador.log("cuerpoClase a cuerpoClase: " +
                this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de "+nombre,0,0)
        return false;
      
    }

    public asignarVariablesGlobales() {
       
        let nombreClase = this.analizador.claseA.nombre;
        let poss = this.analizador.claseA.poss;
        let coment = this.analizador.genComentario(nombreClase+"_Precontructor" )
        let _Precontructor = new Metodo("Preconstructor",this.analizador.PUBLICO,nombreClase);
        this.analizador.claseA.agregarMetodo(_Precontructor);
       
        let id = this.analizador.getContador();
        _Precontructor.id = id+"";
        this.analizador.agregarCodigo(this.analizador.metodoBegin(id+"")+coment,0,poss);
        coment = this.analizador.genComentario("desplazar tama;o de heap para variables de this" );
        this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",this.analizador.claseA.tabla.esto.ambito.length+"","heap")+coment,0,poss);
        
        
        for (let index = 0; index < this.analizador.claseA.tabla.esto.ambito.length; index++) {
            const element = this.analizador.claseA.tabla.esto.ambito[index];
            let sim:Simbolo = element; 
            if (sim.dim.length > 0) {
                this.agregarDimGlobal(sim);
            
                
            }
            if (element.valor.valor!= null){
                
                this.analizador.variable.evaluarAsignacionasignarValor(sim);
            }else {
                
                this.analizador.variable.incializar(sim,sim.getLocacion_de_declaracion());
            }
        }
        coment = this.analizador.genComentario("fin de metodo preconstructor para " + nombreClase );
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo"+id)+coment,0,poss);
    }
    /**
     * agrega el tama;ano necesario para los arreglos 
     * @param simbolo 
     */
    private agregarDimGlobal (simbolo:Simbolo) {
      
       
        let op = new nodoOperacion("","",0,simbolo.linea);
        op.simbolo = simbolo;
  
        
        for (let index = 0; index < simbolo.dim.length; index++) {
            const element = simbolo.dim[index];
            const val:nodoOperacion = this.analizador.exp.analizar(element);
            op.simbolo.tam = index;
            this.analizador.variable.agregarDimAHeapGLOBAL(op,val,simbolo.getLocacion_de_declaracion()); 
        }
        if (op.simbolo.tam > 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario("desplazamiento de variable a psoicion de valores"),op.column,op.fila);
            let temp =  this.analizador.variable.obtenerValorVariable(op.simbolo.getNombre(),op.fila,op.column,);
            
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.val,op.temp),op.column,op.fila);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",op.temp,"heap"),op.column,op.fila);
            //this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",1+"","heap"),op.column,op.fila);
        }else{
            this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",1+"","heap"),op.column,op.fila);
        }
    }

}