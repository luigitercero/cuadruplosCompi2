"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion = /** @class */ (function () {
    function nodoOperacion(valor, tipo, column, fila) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
    }
    nodoOperacion.prototype.addEtiquetaV = function (etiqueta) {
        if (this.etiquetaV === "" || this.etiquetaV == null) {
            this.etiquetaV = etiqueta;
        }
        else {
            this.etiquetaV = this.etiquetaV + ", " + etiqueta;
        }
    };
    nodoOperacion.prototype.addEtiquetaF = function (etiqueta) {
        if (this.etiquetaF === "" || this.etiquetaF == null) {
            this.etiquetaF = etiqueta;
        }
        else {
            this.etiquetaF = this.etiquetaF + ", " + etiqueta;
        }
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