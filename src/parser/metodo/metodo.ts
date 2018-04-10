import Analizador from '../analizador';
import Asignacion from './asignacion'
import Nodo from '../nodo';
import Declaracion from './declaracion';
import Metodo from '../tablaSimbolos/metodo';
import Variable from './variable';
export default class metodo {
 public analizador: Analizador;
 public asignar:Asignacion;
 public declarar:Declaracion;
 public variable:Variable;
 constructor (analizador : Analizador){
     this.analizador = analizador;
    this.asignar = new Asignacion(analizador);
    this.variable = new Variable(analizador);
    this.declarar = new Declaracion(analizador);
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
        this.analizador.claseA.tabla.aumetarAbmito();
        this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
        switch(nombre){
            case "Visibilidad":
                metodos= this.metodo(nodo.childNode[1],nodo.childNode[0].childNode[0].token);
                this.analizador.agregarCodigo(this.analizador.metodoEnd(this.analizador.claseA.nombre+"_"+metodos.id),
                nodo.childNode[2].location.last_column,nodo.childNode[2].location.first_line);
                this.analizador.claseA.tabla.disminuirAmbito();
                return true;
            case "Metodo":  
                metodos =this.metodo(nodo.childNode[0],this.analizador.PUBLICO);
                this.analizador.agregarCodigo(this.analizador.metodoEnd(this.analizador.claseA.nombre+"_"+metodos.id),
                nodo.childNode[1].location.last_column,nodo.childNode[1].location.first_line);
                this.analizador.claseA.tabla.disminuirAmbito();
                return true;
        }
        return false;
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
        //let metodo:MetodoS
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                name =nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                nombreMetodo = this.analizador.claseA.nombre + "_" + name;
                this.analizador.agregarCodigo(this.analizador.metodoBegin(nombreMetodo),nodo.childNode[0].childNode[0].location.last_column,
                nodo.childNode[0].childNode[0].location.first_line);
                metodo = this.analizador.claseA.buscarMetodo(name);
                //this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
                return metodo;
            case "ID":
                tipo = nodo.childNode[0].token;
                name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                nombreMetodo = this.analizador.claseA.nombre + "_" + name;
                this.analizador.agregarCodigo(this.analizador.metodoBegin(nombreMetodo),nodo.childNode[0].location.last_column,
                nodo.childNode[0].location.first_line);
                metodo = this.analizador.claseA.buscarMetodo(name);
                //this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
                return metodo;
            case "Metodo":
                let Nombre = this.metodo(nodo.childNode[0],visi);
                this.cuerpoMetodo(nodo.childNode[1]);
                return Nombre;
                
            case "Constructor":
                name = "constructor" + this.parametros(nodo.childNode[0].childNode[2]);
                nombreMetodo = this.analizador.claseA.nombre+"_"+ name;
                this.analizador.agregarCodigo(this.analizador.metodoBegin(nombreMetodo),nodo.childNode[0].childNode[0].location.last_column,
                nodo.childNode[0].childNode[0].location.first_line);
                this.analizador.agregarCodigo(this.analizador.llamarMetodo(this.analizador.claseA.nombre+"preconstructor"),nodo.childNode[0].childNode[0].location.last_column,
                nodo.childNode[0].childNode[0].location.first_line);
                metodo = this.analizador.claseA.buscarMetodo(name);
                this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
                return metodo;
        }
       throw this.analizador.newError("error al crear metodo",0,0);

    }

    

    /**
     * Parametros
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


       /**
     * var  
     *: ID
     *| var '[' e ']' 
    
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo:Nodo,tipo:string,visibilidad:string){
    }
    /**
     * CuerpoMetodo
     *   : Declaracion
     *   | Asignacion
     *   | getMetodoZ ';'
     *   | Control
     *   | Branching ';'
     *   ;
     * @param nodo 
     */
    public cuerpoMetodo(nodo:Nodo):boolean{
        let term = nodo.childNode[0].term
        switch(term){
            case "Declaracion":
            this.declarar.declaracion(nodo.childNode[0],"");
                return true;
            case "Asignacion":
            this.asignar.asignacion(nodo.childNode[0]);
            return true;
            case "getMetodoZ":
            return true;
            case "Control":
            return true;
            case "Branching":
            return true;
        }
        this.analizador.newError("error em cuerpo metodo",0,0);
        return false;
    }
    
    

}