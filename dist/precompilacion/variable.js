"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("../parser/tablaSimbolos/simbolo"));
var Variable = /** @class */ (function () {
    function Variable(recoleccion) {
        this.recoleccion = recoleccion;
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
        var visibilidad = this.recoleccion.analizador.PRIVADO;
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
                    this.recoleccion.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                }
                catch (error) {
                    this.recoleccion.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.recoleccion.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2], variable);
                }
                catch (error) {
                    this.recoleccion.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
        }
        return false;
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
                if (this.recoleccion.analizador.claseA.tabla.esto.buscarVariable(nombre))
                    this.recoleccion.analizador.newError("la variable existe", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                else {
                    var sim = new simbolo_1.default(nombre, visibilidad, tipo);
                    sim.linea = nodo.childNode[0].location.first_line;
                    sim.setLocacion_declaracion(nodo.childNode[0].location);
                    return sim;
                }
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
            case "var":
                var variable = this.var(nodo.childNode[0], tipo, visibilidad);
                var val = nodo.childNode[2];
                variable.addDimension(val);
                return variable;
            default:
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        }
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
        this.recoleccion.analizador.log("agregando valor");
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