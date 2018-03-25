"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion = /** @class */ (function () {
    function nodoOperacion(valor, tipo, column, fila) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
        this.etiquetaV = [];
        this.etiquetaF = [];
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
    nodoOperacion.prototype.getTipoObjeto = function () {
        switch (this.tipo) {
            case 0:
                return "boolenano";
            case 1:
                return "numero";
            case 2:
                return "caracter";
            case 3:
                return "tengo que buscar el objeto en la tabla de simbolos";
            case 4:
                return "cadena";
        }
    };
    return nodoOperacion;
}());
exports.default = nodoOperacion;
//# sourceMappingURL=nodoOperacion.js.map