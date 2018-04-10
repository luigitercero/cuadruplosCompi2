import Analizador from "../analizador";
import Nodo from "../nodo";
import nodoOperacion from '../exp/operacion/nodoOperacion';
import Variable from "./variable";
import Asignacion from "./asignacion";
export default class Declaracion extends Asignacion{
    
    constructor(analizador:Analizador)  {
        super(analizador);
 
    }

     /**
     
     * Declaracion
     * : Tipo var AsignarValor 
     * | ID var AsignarValor 
     *;
     * @param nodo 
     * @param Visibilidad 
     */
    declarar(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        let variable : ;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2],variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
               
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2],variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
            return true;
        }
        return false;
    }

    /**
     
     * Declaracion
     * : Tipo var AsignarValor 
     * | ID var AsignarValor 
     *;
     * @param nodo 
     * @param Visibilidad 
     */
    declaracion(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        let variable : nodoOperacion ;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2],variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
               
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2],variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
            return true;
        }
        return false;
    }

}