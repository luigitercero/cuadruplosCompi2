import Analizador from '../../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
import Simbolo from '../tablaSimbolos/simbolo'
export default class Variable extends Operador {
      

    constructor(analizdor:Analizador){
        super(analizdor);
    }
    /**
     * DeclaracionClase
     *: Visibilidad Declaracion
     *| Declaracion
     *;
     * @param nodo 
     */
    declaracion(nodo: Nodo): boolean {
        let nombre = nodo.childNode[0].term
        let visibilidad = "private"
        switch(nombre){
            case "Visibilidad":
             visibilidad = nodo.childNode[0].childNode[0].token;
             this.declarar(nodo.childNode[1],visibilidad);
             return true;
            case "Declaracion":
             this.declarar(nodo.childNode[0],"Privado");
             return true;
        }
        return false;
    }

    /**
     
     * Declaracion
     *: Tipo Var AsignarValor 
     *| ID Var AsignarValor 
     * @param nodo 
     * @param Visibilidad 
     */
    declarar(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                this.var(nodo.childNode[1],tipo,Visibilidad);
                this.asignarValor(nodo.childNode[2],"ID");
                this.analizador.logPorCompletar("agregando variable a tabla de simbolos");
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                this.var(nodo.childNode[1],tipo,"Privada");
                this.asignarValor(nodo.childNode[2],"ID");
                return true;
        }
        return false;
    }
    /**
     * var  
     *: ID
     *| var '[' e ']' 
     *| ESTE '.'  ID
     *;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo:Nodo,tipo:string,visibilidad:string):boolean{
        
        return false;
    }
    /**
     * * AsignarValor
     *:';'
     *|'=' e ';'
     *|'=' Nuevo ';'
     *|'=' Lista ';' esta lista quiere decir los arreglos 0
     *;
     * 
     */
    asignarValor(nodo:Nodo,id:string){
       
        let nombre:string = nodo.childNode[0].term;
        this.analizador.log("agregando valor"); 
        if(nombre == "';'"){

        }else{
            this.evaluarAsignacion(nodo.childNode[1]);

        }
    }

    evaluarAsignacion(nodo:Nodo){
        let nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones")
        switch(nombre){
            case "e":
            //nodo.recorrer;
            this.analizador.exp.analizar(nodo);
            return true;
            case "nuevo":
            return true;
        }
        return false;

    }
}