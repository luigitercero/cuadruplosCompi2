"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var operacion_1 = __importDefault(require("../exp/operacion/operacion"));
var simbolo_1 = __importDefault(require("../tablaSimbolos/simbolo"));
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    function Variable(analizdor) {
        return _super.call(this, analizdor) || this;
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
        var visibilidad = "private";
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
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
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
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
        }
        return false;
    };
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
    Variable.prototype.var = function (nodo, tipo, visibilidad) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                if (this.analizador.claseA.tabla.esto.buscarVariable(nombre))
                    this.analizador.newError("la variable existe", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                else {
                    return new simbolo_1.default(nombre, visibilidad, tipo);
                }
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
            case "var":
                var variable = this.var(nodo.childNode[0], tipo, visibilidad);
                var val = this.analizador.exp.analizar(nodo.childNode[2]);
                if (val.tipo == "int") {
                    variable.addDimension(+val.valor);
                    return variable;
                }
                else {
                    this.analizador.newError("no se pudo evaluar el tipo", nodo.childNode[1].location.first_line, nodo.childNode[1].location.last_column);
                }
            default:
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
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
        this.analizador.log("agregando valor");
        if (nombre == "';'") {
        }
        else {
            this.evaluarAsignacion(nodo.childNode[1], simbolo, nodo.childNode[0]);
        }
    };
    Variable.prototype.evaluarAsignacion = function (nodo, simbolo, nodo2) {
        var nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        var temp;
        var pos;
        switch (nombre) {
            case "e":
                var resultado = this.analizador.exp.analizar(nodo);
                if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                    var val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                    this.analizador.agregarCodigo(this.analizador.genComentario("agregando valor a las variables " + simbolo.getNombre()), nodo2.location.first_line, nodo2.location.last_column); // es un comentario
                    pos = this.analizador.newTemporal();
                    this.analizador.agregarCodigo(this.analizador.genOperacion('+', "ptr", "1", pos), nodo2.location.first_line, nodo2.location.last_column); //buscar en pila el this
                    temp = this.analizador.newTemporal(); //temp contiene el dato en heap
                    this.analizador.agregarCodigo(this.analizador.getEnPila(pos, temp), nodo2.location.first_line, nodo2.location.last_column); // valor en la pila en this
                    var temp1 = this.analizador.newTemporal();
                    this.analizador.agregarCodigo(this.analizador.genOperacion('+', temp, simbolo.possAmbito + "", temp1), nodo2.location.first_line, nodo2.location.last_column); //moverse en heap
                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp1, val), nodo2.location.first_line, nodo2.location.last_column);
                    this.analizador.agregarCodigo(this.analizador.genComentario("aquit termina la asignacion " + simbolo.getNombre()), nodo2.location.first_line, nodo2.location.last_column);
                    simbolo.valor = true;
                }
                else {
                    throw this.analizador.newError("error por compatibilidad de tipos ", nodo2.location.first_line, nodo2.location.last_column);
                }
            case "Nuevo":
                return true;
            case "Lista":
                return false;
        }
        return false;
    };
    return Variable;
}(operacion_1.default));
exports.default = Variable;
//# sourceMappingURL=variable.js.map