import Analizador from '../analizador';
import Nodo from '../nodo';
import nodoOperacion from '../exp/operacion/nodoOperacion';

import Simbolo from '../tablaSimbolos/simbolo';
import Location from '../location';
import NodoNavegar from './nodoNavegar';
import Dir from '../variable/obtenerDireccion'
import Struct from '../tablaSimbolos/estructura/Estructura';
import Estructura from '../estrucura/estructura';
export default class Asignacion {
    protected analizador: Analizador;

    constructor(analizador: Analizador) {
        this.analizador = analizador;
    }


    /**
    * * AsignarValor al declararse
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
        let location = nodo.childNode[0].location
        if (nombre == "';'") {
            this.analizador.variable.incializar(simbolo, simbolo.getLocacion_de_declaracion());
        } else {
            if (simbolo.getPunter()) {
                this.analizador.variable.incializar(simbolo, simbolo.getLocacion_de_declaracion());
            }
            this.analizador.agregarCodigo(this.analizador.genComentario
                ("agregando valor a " + simbolo.getNombre()),
                location.last_column, location.first_line);// es un comentario
            this.evaluarAsignacionasignarValor(nodo.childNode[1], simbolo, location);
        }
        this.analizador.agregarCodigo(this.analizador.genComentario
            ("fin de incializacion de variable " + simbolo.getNombre()),
            location.last_column, location.first_line);// es un comentario
    }

    evaluarAsignacionasignarValor(nodo: Nodo, simbolo: Simbolo, location: Location) {
        let nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        let temp: string;
        let pos: string
        switch (nombre) {
            case "e":
                let resultado: nodoOperacion = this.analizador.exp.analizar(nodo);
                return this.asignarValoresAvariables(resultado, simbolo, location);
            case "Nuevo":
                resultado = this.analizador.variable.getNuevo(nodo);
                return this.asignarValoresAvariables(resultado, simbolo, location);
            //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column)
            case "Lista":
                let temp = this.analizador.variable.obtenerValorVariable(simbolo.getNombre(), location.first_line, location.last_column);
                if (simbolo.tam > 0) {
                    this.analizador.variable.moverseApossDeArregloInicial(simbolo, temp, location);
                    this.analizador.recorrer(nodo, "");
                    this.analizador.variable.inicializandoLista(nodo, simbolo, location, temp);

                } else {
                    throw this.analizador.newError("error apara asignar un arrego", location.first_line, location.last_column)
                }
                return true;
        }
        this.analizador.newError("asinganr valor", location.first_line, location.last_column);
        return false;
    }

    asignarValoresAvariables(resultado: nodoOperacion, simbolo: Simbolo, location: Location) {
        if (!simbolo.getPunter()) {
            if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                this.asignarValoresAvariables2(simbolo, location, val);
                return true;
            } else if (resultado.tipo == this.analizador.NULL) {
                let val = this.analizador.NULL; //el temporal del resulttod
                this.asignarValoresAvariables2(simbolo, location, val);
                return true;

            } else if (resultado.tipo == this.analizador.STRING) {
                if (simbolo.tam > 0 && simbolo.getTipo() == this.analizador.CARACTER) {
                    let val = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column)
                    this.analizador.variable.asignarCadenaAArreglo(val, resultado, location);
                }

            } else if (resultado.tipo.toLocaleLowerCase() == "luigitercero") {
                let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                this.asignarValoresAvariables2(simbolo, location, val);
            }

            else {
                throw this.analizador.newError("error por compatibilidad de tipos " +
                    "resultado " + resultado.tipo + " simbolo " + simbolo.getTipo(), location.first_line, location.last_column);
            }
        } else {
            if (this.analizador.exp.evaluarTipo(resultado.tipo, this.analizador.INT)) {
                let a = resultado.getReff();
                let temp: Dir = this.analizador.variable.obtenerValorVariable(simbolo.getNombre(),
                    location.first_line, location.last_column);

                if (a == undefined) {
                    this.analizador.agregarCodigo(this.analizador.genComentario
                        ("mietras no sea variable se asigna la poss de memoria"),
                        location.last_column, location.first_line);
                    let val = this.analizador.exp.getValor(resultado);
                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.val, val),
                        location.last_column, location.first_line);
                } else {
                    this.AsignacionPunteros(resultado, location, temp);
                }

            } else {
                throw this.analizador.newError("error por compatibilidad de tipos ",
                    location.first_line, location.last_column);
            }
        }
    }

    private AsignacionPunteros(resultado: nodoOperacion, location: Location, varible: Dir) {
        let a = resultado.getReff();
        let val = this.analizador.exp.getValor(resultado);
        if (resultado.getenDireccion()) {
            let t0 = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val),
                location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", varible.val, "1", t0),
                location.last_column, location.first_line);
            let lugar = 0;
            if (a.done == "pila") {
                lugar = 0;
            } else {
                lugar = 1;
            }
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, lugar + ""),
                location.last_column, location.first_line);
        } else {
            if (!a.simbolo.getPunter()) {

                this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val),
                    location.last_column, location.first_line);
            } else {
                let val = a.dir;

                let t0 = this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val),
                    location.last_column, location.first_line);
                this.analizador.agregarCodigo(this.analizador.genOperacion("+", varible.val, "1", t0),
                    location.last_column, location.first_line);
                let lugar = a.gettemporalDeGuardado();

                this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, lugar + ""),
                    location.last_column, location.first_line);
            }
        }
    }
    private asignarValoresAvariables2(simbolo: Simbolo, location: Location, val: string) {
        let temp = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(), location.first_line,
            location.last_column);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(temp.temporal, val),
            location.last_column, location.first_line);
    }

    /**
       Asignar
        :'+=' e 
        |'*=' e 
        |'/=' e 
        | '++'   
        | '--'  
        | '=' Nuevo 
        | '=' e     | '=' e 
        ;
         */
    private asignar(nodo: Nodo, variable: Dir): nodoOperacion {
        let term = nodo.childNode[0].term
        switch (term) {
            case "'++'":
                return this.analizador.exp.evaluarPP(variable, "+");
            case "'--'":
                return this.analizador.exp.evaluarPP(variable, "-");
            case "'='":
                return this.getAdd(nodo.childNode[1]);
            case "'+='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "+");
            case "'*='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "*");
            case "'/='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "/");
        }
        throw this.analizador.newError("error al asignar", 0, 0)
    }

    private getAdd(nodo: Nodo): nodoOperacion {
        let term = nodo.term;
        switch (term) {
            case "Nuevo":

                return this.analizador.variable.getNuevo(nodo);
            case "e":
                return this.analizador.exp.analizar(nodo);
        }
        throw this.analizador.newError("error al asignar", 0, 0)
    }


    /**
     * Asignacion
     * Asignacion
     * : var Asignar ';'
     * | Navegar var Asignar ';'
     * ;
     * @param nodo 
     */
    public asignacion(nodo: Nodo): boolean {
        let term = nodo.childNode[0].term;
        let variable: Dir;
        let resultado: nodoOperacion;
        let location;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                if (variable.tam > 0) {
                    this.analizador.variable.validarResultado(variable);

                }
                resultado = this.asignar(nodo.childNode[1], variable);
                location = variable.location;
                if (!variable.simbolo.getPunter()) {
                    this.analizador.variable.setValVariable(variable, resultado, location);
                } else {
                    this.asignarApuntadores(variable, resultado, location);
                }
                return true;
            case "Navegar":
                let temp = this.analizador.claseA;
                let navegar = this.analizador.variable.navegar(nodo.childNode[0]);
                if (!navegar.simbolo.getPunter()) {
                    this.analizador.claseA = this.analizador.buscarClase(navegar.tipo, navegar);
                    variable = this.analizador.variable.var(nodo.childNode[1], navegar.valor);
                    this.analizador.claseA = temp;
                    resultado = this.asignar(nodo.childNode[2], variable);
                    location = variable.location;
                    this.analizador.variable.setValVariable(variable, resultado, location, navegar.valor);
                    this.analizador.claseA = temp;
                    return true;
                } else {
                    //let estructura: Struct = this.analizador.getCodEstruct().buscarEstructura(navegar.tipo, navegar.getlocation());
                    let nombre = this.analizador.variable.varParaPunteros(nodo.childNode[1]);
                    let simb: Dir = this.analizador.variable.ObtenerDirVariableEstruct(navegar.tipo, nombre.valor,
                        nombre.getlocation(), navegar.valor);
                    resultado = this.asignar(nodo.childNode[2], simb);
                    if (!simb.simbolo.getPunter()) {
                        this.analizador.variable.setValVariable(simb, resultado, nombre.getlocation());
                    } else {
                        this.asignarApuntadores(simb, resultado, nombre.getlocation());
                    }
                    return true;

                    //let Direccion: Dir = new Dir()
                    // setValorVarible(nodo.childNode[2], estructura.buscarSimbolo)

                    //this.analizador.variable.setValVariable(variable, resultado, location, navegar.valor);
                }
        }
        if (nodo.childNode[2].location != undefined) {
            throw this.analizador.newError("error algo esta mal", nodo.childNode[2].location.first_line,
                nodo.childNode[2].location.last_column);
        } else { throw this.analizador.newError("error algo esta mal", 0, 0, ); }
    }



    asignarApuntadores(simbolo: Dir, resultado: nodoOperacion, location: Location) {
        this.asignarPunteroAPuntero(simbolo, resultado, location);
    }
    private asignarPunteroAPuntero(simbolo: Dir, resultado: nodoOperacion, location: Location, inicio?: string) {

        let ap: nodoOperacion = this.analizador.variable.crearPunteroDefault(location);

        simbolo.addLocation(location);
        //let uff: string = this.analizador.variable.getVAlorD(simbolo);
        let t0: string = this.analizador.newTemporal();
        let t1: string = this.analizador.newTemporal();


        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", ap.valor, "0", t0), location.first_column, location.first_line
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", ap.valor, "1", t1), location.first_column, location.first_line
        );

        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap(t0, resultado.getReff().dir), location.first_column, location.first_line
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap(t1, resultado.getReff().gettemporalDeGuardado()), location.first_column,
            location.first_line
        );
        if (simbolo.done == "pila") {
            this.analizador.agregarCodigo(
                this.analizador.saveEnPila(simbolo.dir, ap.valor), location.first_column, location.first_line
            );
        } else {
            this.analizador.agregarCodigo(
                this.analizador.saveEnHeap(simbolo.dir, ap.valor), location.first_column, location.first_line
            );
        }

    }

}

