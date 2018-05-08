import Recoleccion from './recoleccion'

import Nodo from "../parser/nodo";
import MetodoS from '../parser/tablaSimbolos/metodo';
import Simbolo from '../parser/tablaSimbolos/simbolo';
import nodoOperacion from '../parser/exp/operacion/nodoOperacion';
export default class Metodo {
    public recoleccion: Recoleccion;
    constructor(recoleccion: Recoleccion) {
        this.recoleccion = recoleccion;
    }

    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo 
     */
    public sobrescribir(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "SOBREESCRIBIR":
                this.recoleccion.analizador.logPorCompletar("tengo que sobreEcribir")
                this.recoleccion.analizador.log("sobrescribir a metodo: " +
                    this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.recoleccion.analizador.log("sobrescrbir a crear metodo: " +
                    this.crearMetodo(nodo.childNode[0]));
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    }

    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo 
     */
    public crearMetodo(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term
        let visibilidad = this.recoleccion.analizador.PUBLICO
        switch (nombre) {
            case "Visibilidad":
                visibilidad = nodo.childNode[0].childNode[0].token;
                this.metodo(nodo.childNode[1], visibilidad);
                return true;
            case "Metodo":
                this.recoleccion.analizador.log("crear metodo a metodo: " +
                    this.metodo(nodo.childNode[0], visibilidad));

                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    }


    /**
 * Metodo
 *   : Tip ID '(' Parametros '{'
 *   | ID ID '(' Parametros '{'
 *   | ID  TipID ID '(' Parametros '{'
 *   | Metodo  CuerpoMetodo
 *   | constructor
 *   | Principal 
 *   ;
 * @param nodo 
 */
    /**
     * Constructor
     *: ID '(' Parametros '{'
     *;
     */
    public metodo(nodo: Nodo, visi: string): boolean {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.recoleccion.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: MetodoS
        switch (nombre) {
            case "Tipo":
                this.tip0ID(nodo, visi);
                return true;
            case "ID":
                this.tip1ID(nodo, visi);
                return true;
            case "Metodo":
                this.metodo(nodo.childNode[0], visi);
                return true;
            case "Constructor":
                tipo = this.recoleccion.analizador.claseA.nombre;
                nombreMetodo = this.recoleccion.analizador.claseA.nombre;
                metodo = new MetodoS(nombreMetodo, visi, tipo, nodo.childNode[0].childNode[0].location.first_line)
                metodo.id = this.recoleccion.analizador.getContador() + "";
                this.parametros(nodo.childNode[0].childNode[2], metodo);
                this.recoleccion.analizador.claseA.agregarMetodo(metodo);
                return true;
            case "Principal":
                tipo = "Principal"
                nombreMetodo = "Principal";
                metodo = new MetodoS(nombreMetodo, visi, tipo, nodo.childNode[0].childNode[0].location.first_line)
                metodo.id = this.recoleccion.analizador.getContador() + "";
                this.recoleccion.analizador.claseA.agregarMetodo(metodo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    }

    private tip0ID(nodo: Nodo, visibilidad: string) {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.recoleccion.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: MetodoS
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].childNode[0].token;
            nombreMetodo = nodo.childNode[1].token;
            metodo = new MetodoS(nombreMetodo, visibilidad, tipo, nodo.childNode[1].location.first_line)
            metodo.id = this.recoleccion.analizador.getContador() + "";
            this.parametros(nodo.childNode[3], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        } else {
            tipo = nodo.childNode[0].childNode[0].token;
            let tam = this.tipID(nodo.childNode[1]);
            nombreMetodo = nodo.childNode[1 + 1].token;
            metodo = new MetodoS(nombreMetodo, visibilidad, tipo, nodo.childNode[1 + 1].location.first_line)
            metodo.id = this.recoleccion.analizador.getContador() + "";
            metodo.tam = tam;
            this.parametros(nodo.childNode[3 + 1], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }

    }

    private tip1ID(nodo: Nodo, visibilidad: string) {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.recoleccion.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: MetodoS
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].token;
            nombreMetodo = nodo.childNode[1].token;
            metodo = new MetodoS(nombreMetodo, visibilidad, tipo, nodo.childNode[1].location.first_line)
            metodo.id = this.recoleccion.analizador.getContador() + "";
            this.parametros(nodo.childNode[3], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        } else {
            tipo = nodo.childNode[0].childNode[0].token;
            let tam = this.tipID(nodo.childNode[1]);
            nombreMetodo = nodo.childNode[1 + 1].token;
            metodo = new MetodoS(nombreMetodo, visibilidad, tipo, nodo.childNode[1 + 1].location.first_line)
            metodo.id = this.recoleccion.analizador.getContador() + "";
            metodo.tam = tam;
            this.parametros(nodo.childNode[3 + 1], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }

    }

    private tipID(nodo: Nodo): number {
        let term = nodo.childNode[0].term
        switch (term) {
            case "'['":
                return 1;
            case "tipID":
                return this.tipID(nodo.childNode[0]) + 1;
        }
        return 0;
    }
    /**
     * Parametros
     *   : Parametro ')' 
     *   |  ')'
     *   ;
     * @param nodo 
     */
    public parametros(nodo: Nodo, metodo: MetodoS): boolean {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "')'":

                return true;
            case "Parametro":
                this.parametro(nodo.childNode[0], metodo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
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
    public parametro(nodo: Nodo, metodo: MetodoS): boolean {
        let term: string = nodo.childNode[0].term;
        let tipo: string;
        let nombre: string;
        let simbolo;
        let visibilidad = this.recoleccion.analizador.PUBLICO
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token
                simbolo = this.var(nodo.childNode[1], tipo, visibilidad, metodo)
                metodo.addParametro(simbolo);

                return true;
            case "ID":
                tipo = nodo.childNode[0].token.toLocaleLowerCase();
                simbolo = this.var(nodo.childNode[1], tipo, visibilidad, metodo)
                metodo.addParametro(simbolo);

                return true;
            case "Parametro":
                this.parametro(nodo.childNode[0], metodo);
                this.addParametron(nodo, metodo);
                return true;

        }
        this.recoleccion.analizador.newError("error al crear parametro", 0, 0);
        return false;
    }

    public addParametron(nodo: Nodo, metodo: MetodoS) {
        let term = nodo.childNode[2].term;
        let tipo: string;
        let nombre: string;
        let simbolo
        let visibilidad = this.recoleccion.analizador.PUBLICO
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[2].childNode[0].token
                simbolo = this.var(nodo.childNode[3], tipo, visibilidad, metodo)
                metodo.addParametro(simbolo);
                return true;
            case "ID":
                tipo = nodo.childNode[2].token
                simbolo = this.var(nodo.childNode[3], tipo, visibilidad, metodo)
                metodo.addParametro(simbolo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear parametro", 0, 0);

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
    var(nodo: Nodo, tipo: string, visibilidad: string, metodo: MetodoS): Simbolo {
        let term: string = nodo.childNode[0].term;
        let nombre: string;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                if (
                    metodo.buscarSimbolo(nombre))
                    this.recoleccion.analizador.newError("la variable existe", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                else {
                    return new Simbolo(nombre, visibilidad, tipo);
                }
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line)
            case "var":
                let variable: Simbolo = this.var(nodo.childNode[0], tipo, visibilidad, metodo);
                variable.addDimension(nodo.childNode[2]);
                variable.tam++;
                return variable;
            default:
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line)

        }

    }


}