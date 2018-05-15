"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("../parser/tablaSimbolos/simbolo"));
var Variable = /** @class */ (function () {
    function Variable(analizador) {
        this.analizador = analizador;
    }
    /**
     * DeclaracionClase
     *: Visibilidad Declaracion
     *| Declaracion
     *;
     * @param nodo
     */
    Variable.prototype.declaracion = function (nodo) {
        var nombre = nodo.childNode[0].term;
        var visibilidad = this.analizador.PRIVADO;
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
    };
    /**
     
     * Declaracion
     * : Tipo var AsignarValor
     * | ID var AsignarValor
     *;
     * @param nodo
     * @param Visibilidad
     */
    Variable.prototype.declarar = function (nodo, Visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = "";
        var variable;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                }
                catch (error) {
                    throw this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                }
                catch (error) {
                    throw this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "CREARPUNTERO":
                this.declararPuntero(nodo, Visibilidad);
                return true;
        }
        throw this.analizador.newError("error al declarar hace falta algo", 0, 0);
    };
    Variable.prototype.declararPuntero = function (nodo, visibilidad) {
        var tipo = "";
        var tam = 0;
        if (nodo.childNode[2].term == "Tipo") {
            tipo = nodo.childNode[2].childNode[0].token;
        }
        else {
            tipo = nodo.childNode[2].token;
        }
        var variable = this.varID(nodo.childNode[4], visibilidad, tipo);
        variable.setPuntero(true);
        this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
        this.asignarValor(nodo.childNode[6], variable);
        return true;
    };
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
    Variable.prototype.var = function (nodo, tipo, visibilidad) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                return this.varID(nodo.childNode[0], visibilidad, tipo);
            case "var":
                var variable = this.var(nodo.childNode[0], tipo, visibilidad);
                var val = nodo.childNode[2];
                variable.addDimension(val);
                variable.addTam(1);
                return variable;
            default:
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        }
    };
    Variable.prototype.varID = function (nodo, visibilidad, tipo) {
        var nombre = nodo.token;
        if (this.analizador.claseA.tabla.esto.buscarVariable(nombre))
            this.analizador.newError("la variable existe", nodo.location.first_line, nodo.location.last_column);
        else {
            var sim = new simbolo_1.default(nombre, visibilidad, tipo);
            sim.linea = nodo.location.first_line;
            sim.setLocacion_declaracion(nodo.location);
            return sim;
        }
        throw this.analizador.newError("esto no puede declararse ", nodo.location.last_column, nodo.location.first_line);
    };
    /**
     * * AsignarValor
     *:';'
     *|'=' e ';'
     *|'=' Nuevo ';'
     *|'=' Lista ';' esta lista quiere decir los arreglos 0
     *;
     *
     */
    Variable.prototype.asignarValor = function (nodo, simbolo) {
        var nombre = nodo.childNode[0].term;
        this.analizador.log("agregando valor");
        if (nombre == "';'") {
        }
        else {
            simbolo.addValor(nodo.childNode[1], nodo.childNode[0].location);
        }
    };
    return Variable;
}());
exports.default = Variable;
//# sourceMappingURL=variable.js.map