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
var asignacion_1 = __importDefault(require("./asignacion"));
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(analizador) {
        return _super.call(this, analizador) || this;
    }
    /**
    
    * Declaracion
    * : Tipo var AsignarValor
    * | ID var AsignarValor
    *;
    * @param nodo
    * @param Visibilidad
    */
    Declaracion.prototype.declarar = function (nodo, Visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = "";
        var variable;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                }
                catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                }
                catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
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
    Declaracion.prototype.declaracion = function (nodo, Visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = "";
        var variable;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                }
                catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                }
                catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
        }
        return false;
    };
    return Declaracion;
}(asignacion_1.default));
exports.default = Declaracion;
//# sourceMappingURL=declaracion.js.map