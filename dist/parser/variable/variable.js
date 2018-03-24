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
     *: Tipo Var AsignarValor
     *| ID Var AsignarValor
     * @param nodo
     * @param Visibilidad
     */
    Variable.prototype.declarar = function (nodo, Visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = "";
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                this.var(nodo.childNode[1], tipo, Visibilidad);
                this.asignarValor(nodo.childNode[2], "ID");
                this.analizador.logPorCompletar("agregando variable a tabla de simbolos");
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                this.var(nodo.childNode[1], tipo, "Privada");
                this.asignarValor(nodo.childNode[2], "ID");
                return true;
        }
        return false;
    };
    /**
     * var
     *: ID
     *| var '[' e ']'
     *| ESTE '.'  ID
     *;
     * @param nodo
     * @param tipo
     * @param visibilidad
     */
    Variable.prototype.var = function (nodo, tipo, visibilidad) {
        this.analizador.logPorCompletar("agrega variable a tabla de simbolos");
        return false;
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
    Variable.prototype.asignarValor = function (nodo, id) {
        var nombre = nodo.childNode[0].term;
        this.analizador.log("agregando valor");
        if (nombre == "';'") {
        }
        else {
            this.evaluarAsignacion(nodo.childNode[1]);
        }
    };
    Variable.prototype.evaluarAsignacion = function (nodo) {
        var nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        switch (nombre) {
            case "e":
                //nodo.recorrer;
                this.analizador.exp.analizar(nodo);
                return true;
            case "nuevo":
                return true;
        }
        return false;
    };
    return Variable;
}(operacion_1.default));
exports.default = Variable;
//# sourceMappingURL=variable.js.map