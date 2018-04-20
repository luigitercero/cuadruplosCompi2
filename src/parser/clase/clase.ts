import Analizador from "../analizador";
import Nodo from '../nodo';
import Class from '../tablaSimbolos/clase'
import Simbolo from "../tablaSimbolos/simbolo";
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
        this.analizador.claseA.tabla.esto
        let nombreClase = this.analizador.claseA.nombre;
        let poss = this.analizador.claseA.poss;
        let coment = this.analizador.genComentario("nombreClase_Precontructor" )
        let nombre ="metodo"+ this.analizador.getContador();
        this.analizador.agregarCodigo(this.analizador.metodoBegin(nombre)+coment,0,poss);
        for (let index = 0; index < this.analizador.claseA.tabla.esto.ambito.length; index++) {
            const element = this.analizador.claseA.tabla.esto.ambito[index];
            if (element.valor.valor!= null){
                let sim:Simbolo = element; 
                this.analizador.variable.evaluarAsignacionasignarValor(sim);
            }
        }
        this.analizador.agregarCodigo(this.analizador.metodoEnd(nombre)+coment,0,poss);
    }

}