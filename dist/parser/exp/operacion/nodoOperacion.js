"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("../../tablaSimbolos/simbolo"));
var nodoOperacion = /** @class */ (function () {
    function nodoOperacion(valor, tipo, column, fila) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
        this.etiquetaV = [];
        this.etiquetaF = [];
        this.dim = 0;
        this.simbolo = new simbolo_1.default("", "", "");
    }
    nodoOperacion.prototype.addEtiquetaV = function (etiqueta) {
        this.etiquetaV.push(etiqueta);
    };
    nodoOperacion.prototype.addEtiquetaF = function (etiqueta) {
        this.etiquetaF.push(etiqueta);
    };
    nodoOperacion.prototype.addEtiquetaVV = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaV.push(element);
        });
    };
    nodoOperacion.prototype.addEtiquetaFV = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaF.push(element);
        });
    };
    return nodoOperacion;
}());
exports.default = nodoOperacion;
//# sourceMappingURL=nodoOperacion.js.map