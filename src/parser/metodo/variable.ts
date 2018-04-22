

import { error } from 'util';


import nodoOperacion from '../exp/operacion/nodoOperacion';
import Simbolo from '../tablaSimbolos/simbolo';
import Analizador from '../analizador';
import Nodo from '../nodo'
import Location from '../location';
export default class Variable {
      
   public analizador:Analizador;
    
    constructor (analizador:Analizador) {
        this.analizador = analizador

    }




    /**
     * retorna un nodo Operacion
     * var  
     *: ID
     *| var '[' e ']' 
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
     var(nodo:Nodo,tipo:string,visibilidad:string):nodoOperacion{
        let term : string = nodo.childNode[0].term;
        let nombre : string ;
        switch (term) {
            case "ID" :
                nombre = nodo.childNode[0].token;
                if (
                 this.analizador.claseA.tabla.buscarEnPila(nombre))
                 this.analizador.newError("la variable existe",nodo.childNode[0].location.first_line,nodo.childNode[0].location.last_column);
                 else {
                    let s = new Simbolo( nombre,visibilidad,tipo);
                    this.analizador.claseA.tabla.agregarSimboloApila(s);
                    let op = new nodoOperacion("","",nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line);
                    op.simbolo = s;
                    return  op;
                }
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)
            case "var":
                let variable:nodoOperacion = this.var(nodo.childNode[0],tipo,visibilidad);
                let val:nodoOperacion = this.analizador.exp.analizar(nodo.childNode[2]);
                this.analizador.variable.agregarDimAHeap(variable,val,nodo.childNode[1].location);
                return variable; 
            default:
            throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)

        }
       
    }


}