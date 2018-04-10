
import Nodo from "../parser/nodo";

import { error } from 'util';

import Recoleccion from './recoleccion' 
import nodoOperacion from '../parser/exp/operacion/nodoOperacion';
import Simbolo from '../parser/tablaSimbolos/simbolo';
export default class Variable {
      
   public recoleccion:Recoleccion;
    
    constructor (recoleccion : Recoleccion){
        this.recoleccion = recoleccion;
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
        let visibilidad = this.recoleccion.analizador.PRIVADO;
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
     * : Tipo var AsignarValor 
     * | ID var AsignarValor 
     *;
     * @param nodo 
     * @param Visibilidad 
     */
    declarar(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        let variable : Simbolo ;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.recoleccion.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2],variable);
                } catch (error) {
                    this.recoleccion.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
               
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.recoleccion.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2],variable);
                } catch (error) {
                    this.recoleccion.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
            }
            return true;
        }
        return false;
    }
    /**
     * var  
     *: ID
     *| var '[' e ']' 
     *| ESTE '.'  ID
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo:Nodo,tipo:string,visibilidad:string):Simbolo{
        let term : string = nodo.childNode[0].term;
        let nombre : string ;
        switch (term) {
            case "ID" :
                nombre = nodo.childNode[0].token;
                if (
                 this.recoleccion.analizador.claseA.tabla.esto.buscarVariable(nombre))
                 this.recoleccion.analizador.newError("la variable existe",nodo.childNode[0].location.first_line,nodo.childNode[0].location.last_column);
                 else{
                    return new Simbolo( nombre,visibilidad,tipo);
                }
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)
            case "var":
                let variable:Simbolo = this.var(nodo.childNode[0],tipo,visibilidad);
                let val:nodoOperacion = this.recoleccion.analizador.exp.analizar(nodo.childNode[2]);
                if (val.tipo == this.recoleccion.analizador.INT){
                    variable.addDimension( + val.valor);
                    return variable;
                }else{
                    this.recoleccion.analizador.newError("no se pudo evaluar el tipo",nodo.childNode[1].location.first_line,nodo.childNode[1].location.last_column);   
                }
            default:
            throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)

        }
       
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
    asignarValor(nodo:Nodo,simbolo:Simbolo){
       
        let nombre:string = nodo.childNode[0].term;
        this.recoleccion.analizador.log("agregando valor"); 
        if(nombre == "';'"){

        }else{
           simbolo.addValor(nodo.childNode[1],nodo.childNode[0].location);

        }
    }

    
    

}