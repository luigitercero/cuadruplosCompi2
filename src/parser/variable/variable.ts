import Analizador from '../../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
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
     * resulto un Cambio Esto tiene que ser ID en vez de var
     * Declaracion
     *: Tipo ID AsignarValor 
     *| ID ID AsignarValor 
     * @param nodo 
     * @param Visibilidad 
     */
    declarar(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        let ID = nodo.childNode[0].token;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;

                this.analizador.logPorCompletar("agregando variable a tabla de simbolos");
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                
        }
        return false;
    }

}