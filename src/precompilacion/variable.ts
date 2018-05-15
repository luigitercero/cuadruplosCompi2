
import Nodo from "../parser/nodo";

import { error } from 'util';

import Analizador from '../parser/analizador'
import nodoOperacion from '../parser/exp/operacion/nodoOperacion';
import Simbolo from '../parser/tablaSimbolos/simbolo';
export default class Variable {

    public analizador: Analizador;

    constructor(analizador: Analizador) {
        this.analizador = analizador;
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
        let visibilidad = this.analizador.PRIVADO;
        switch (nombre) {
            case "Visibilidad":
                visibilidad = nodo.childNode[0].childNode[0].token;
                this.declarar(nodo.childNode[1], visibilidad);
                return true;
            case "Declaracion":
                this.declarar(nodo.childNode[0], "Privado");
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
    declarar(nodo: Nodo, Visibilidad: string): boolean {
        let nombre: string = nodo.childNode[0].term;
        let tipo = "";
        let variable: Simbolo;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                } catch (error) {
                    throw this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }

                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                } catch (error) {
                    throw this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "CREARPUNTERO":
                this.declararPuntero(nodo, Visibilidad);
                return true;
        }
        throw this.analizador.newError("error al declarar hace falta algo", 0, 0);
    }

    declararPuntero(nodo: Nodo, visibilidad: string) {
        let tipo = "";
        let tam = 0;
        if (nodo.childNode[2].term == "Tipo") {
            tipo = nodo.childNode[2].childNode[0].token;
        } else {
            tipo = nodo.childNode[2].token;
        }
        let variable = this.varID(nodo.childNode[4], visibilidad, tipo);
        variable.setPuntero(true);
        this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
        this.asignarValor(nodo.childNode[6], variable);

        return true;

    }
    /** este var solo sirve para la primera pasada
     * var  
     *: ID
     *| var '[' e ']' 
     *
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo: Nodo, tipo: string, visibilidad: string): Simbolo {
        let term: string = nodo.childNode[0].term;
        let nombre: string;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                return this.varID(nodo.childNode[0], visibilidad, tipo);

            case "var":
                let variable: Simbolo = this.var(nodo.childNode[0], tipo, visibilidad);
                let val: Nodo = nodo.childNode[2];
                variable.addDimension(val);
                variable.addTam(1);

                return variable;

            default:
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line)

        }

    }
    varID(nodo: Nodo, visibilidad: string, tipo: string): Simbolo {
        let nombre = nodo.token;
        if (
            this.analizador.claseA.tabla.esto.buscarVariable(nombre))
            this.analizador.newError("la variable existe", nodo.location.first_line, nodo.location.last_column);
        else {
            let sim = new Simbolo(nombre, visibilidad, tipo);
            sim.linea = nodo.location.first_line;
            sim.setLocacion_declaracion(nodo.location);
            return sim;
        }
        throw this.analizador.newError("esto no puede declararse ", nodo.location.last_column, nodo.location.first_line)
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
    asignarValor(nodo: Nodo, simbolo: Simbolo) {

        let nombre: string = nodo.childNode[0].term;
        this.analizador.log("agregando valor");
        if (nombre == "';'") {

        } else {
            simbolo.addValor(nodo.childNode[1], nodo.childNode[0].location);
        }
    }
}