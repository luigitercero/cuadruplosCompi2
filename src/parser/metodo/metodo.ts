import Analizador from '../analizador';
import Asignacion from './asignacion'
import Nodo from '../nodo';
import Declaracion from './declaracion';
import Metodo from '../tablaSimbolos/metodo';

import Cuerpo from './cuerpo'
import Location from '../location';
import Tabla from '../tablaSimbolos/tabla';
export default class metodo {
 public analizador: Analizador;

 
 constructor (analizador : Analizador){
     this.analizador = analizador;
     
     
}

    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo 
     */
    public sobrescribir(nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "SOBREESCRIBIR":
                this.analizador.logPorCompletar("tengo que sobreEcribir")
                this.analizador.log("sobrescribir a metodo: " + 
                this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.analizador.log("sobrescrbir a crear metodo: "+ 
                this.crearMetodo(nodo.childNode[0]));
                return true;
        }
        return false;
    }

    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo 
     */
    public crearMetodo(nodo:Nodo):boolean{
        let nombre :string = nodo.childNode[0].term
        let metodos
        let simtemp = this.analizador.claseA.tabla;
        this.analizador.claseA.tabla = new Tabla();
        this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
        this.analizador.claseA.tabla.aumetarAbmito();
        
        switch(nombre){
            case "Visibilidad":
                metodos= this.metodo(nodo.childNode[1],nodo.childNode[0].childNode[0].token);
                this.endMetodo(metodos,nodo.childNode[2].location); 
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla =simtemp;
                return true;
            case "Metodo":  
                metodos =this.metodo(nodo.childNode[0],this.analizador.PUBLICO);
                this.endMetodo(metodos,nodo.childNode[1].location); 
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla =simtemp;
                return true;
        }
        return false;
    }

    endMetodo(metodos:Metodo,location:Location) {
        let coment = this.analizador.genComentario (metodos.nomMetodo+"");
        /*
        this.analizador.agregarCodigo(this.analizador.genOperacion("-","ptr",this.analizador.claseA.tabla.ptr+"","ptr"),
         location.last_column,location.first_line);
        */
        if (metodos.getNombre() == "Principal") {
            this.analizador.setFinal();

        }
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo"+metodos.id)+coment,
         location.last_column,location.first_line);

    }

    /**
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   | constructor 
     *   ;
     * @param nodo 
     */
    /**
     * Constructor
     *: ID '(' Parametros '{'
     *;
    */
    public metodo (nodo:Nodo ,visi:string):Metodo{
        let nombre = nodo.childNode[0].term;
        let tipo:string =this.analizador.VACIO;
        let nombreMetodo:string;
        let metodo:Metodo;
        let name :string;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                metodo = this.metodoImp(name,nodo.childNode[0].childNode[0].location);
                return metodo;
            case "ID":
                tipo = nodo.childNode[0].token;
                name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                metodo = this.metodoImp(name,nodo.childNode[0].location);
                return metodo;
            case "Metodo":
                metodo = this.metodo(nodo.childNode[0],visi);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1]);
                return metodo; 
            case "Constructor":
                name = "constructor" + this.parametros(nodo.childNode[0].childNode[2]);
                nombreMetodo = this.analizador.claseA.nombre+"_"+ name;
                metodo = this.metodoImp(name,nodo.childNode[0].childNode[0].location);
                return metodo;
            case "Principal":
                name = "Principal";
                this.analizador.setStart();
                metodo = this.metodoImp(name,nodo.childNode[0].childNode[0].location);
                return metodo;
        }
       throw this.analizador.newError("error al crear metodo",0,0);

    }

    private metodoImp(name:string, location:Location) {
        let metodo:Metodo = this.analizador.claseA.buscarMetodo(name);
        metodo.preFijo = this.analizador.claseA.nombre;
        
        let comentario = this.analizador.genComentario (this.analizador.claseA.nombre+"_"+ name);
        this.analizador.agregarCodigo(this.analizador.metodoBegin(metodo.id) +comentario,location.last_column, location.first_line);
        for (let index = 0; index < metodo.parametro.length; index++) {
            const element = metodo.parametro[index];
            this.analizador.claseA.tabla.agregarSimboloApila(element);
        }
        return metodo;
    }

    

    /**
     * Parametros nodo.childNode[0].childNode[0].location
     *   : Parametro ')' 
     *   |  ')'
     *   ;
     * @param nodo 
     */
    public parametros(nodo:Nodo):string {
        let term = nodo.childNode[0].term;
        switch(term){
            case "')'":return "";
            case "Parametro": return "_"+this.parametro(nodo.childNode[0]);
        }
        this.analizador.newError("error al crear metodo",0,0);
        return "";
    }

    /**
     * Parametro
     *   : Tipo var
     *   | ID var
     *   | Parametro ',' Tipo var
     *   | Parametro ',' ID var
     *   ;
     * @param nodo 
     */
    public parametro(nodo:Nodo):string{
        let term:string = nodo.childNode[0].term;
        let tipo:string;
        let nombre:string;
        let simbolo
        switch(term){
            case "Tipo":
             tipo =nodo.childNode[0].childNode[0].token
             
             return  tipo;
            case "ID":
             tipo =nodo.childNode[0].token
             
             return  tipo
            case "Parametro":
             return this.parametro(nodo.childNode[0]) + "_"+this.addParametron(nodo);
        }
        this.analizador.newError("error al crear parametro",0,0);
        return "";
    }

    public addParametron(nodo:Nodo):string{
        let term = nodo.childNode[2].term;
        let tipo:string;
        let nombre:string;
        let simbolo
        switch(term){
            case "Tipo":
             tipo =nodo.childNode[2].childNode[0].token
             return tipo;
            case "ID":
             tipo =nodo.childNode[2].token
            return tipo;
        }
        this.analizador.newError("error al crear parametro",0,0);
        return "";
    }


    
    
    

}