import Analizador from '../../analizador';
import Nodo from '../nodo';
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
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   ;
     * @param nodo 
     */
    public metodo (nodo:Nodo ,visi:string):boolean{
        let nombre = nodo.childNode[0].term;
        let tipo:string;
        let nombreMetodo:string;

        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.analizador.logPorCompletar("agregar metodo a tabla de simbolos");
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.analizador.logPorCompletar("agregar metodo a tabla de simbolos")
                return true;
            case "Metodo":
                this.metodo(nodo.childNode[0],"");
                this.cuerpoMetodo(nodo.childNode[1]);
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
        switch(nombre){
            case "Visibilidad":
                this.analizador.log("agregar visibilidad");
                this.analizador.log("crear metodo a metodo: " +
                this.metodo(nodo.childNode[1],nodo.childNode[0].childNode[0].token));
                return true;
            case "Metodo":
                this.analizador.log("crear metodo a metodo: " +
                this.metodo(nodo.childNode[0],"pivate"));
                return true;
        }
        return false;
    }
    /**
     * Parametros
     *   : Parametro ')' 
     *   |  ')'
     *   ;
     * @param nodo 
     */
    public parametros(nodo:Nodo):boolean{
        return false;
    }

    /**
     * Parametro
     *   : Tipo ID 
     *   | ID ID 
     *   | Parametro ',' Tipo ID
     *   | Parametro ',' ID ID 
     *   ;
     * @param nodo 
     */
    public parametro(nodo:Nodo):boolean{
        return false;
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
        
        return false;
    }
    /**
     * Asignacion
     *   : var '=' e ';'
     *   | Navegar var '=' e ';'
     *   |'+=' e ';'
     *   |'*=' e ';'
     *   |'/=' e ';'
     *   | '++' ';' 
     *   | '--' ';'
     *   | var '=' Nuevo ';'
     *  ;
     * @param nodo 
     */
    public asignacion(nodo:Nodo):boolean{
        return false;
    }

}