"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SIGENERICO = /** @class */ (function () {
    function SIGENERICO(analizador, column, line) {
        this.analizador = analizador;
        this.etiquetaV = this.analizador.newEtiqueta();
        this.etiquetaF = this.analizador.newEtiqueta();
        this.etiquetaS = this.analizador.newEtiqueta();
        this.column = column;
        this.line = line;
    }
    SIGENERICO.prototype.getEtiquetaV = function () {
        return this.etiquetaV;
    };
    SIGENERICO.prototype.getEtiquetaF = function () {
        return this.etiquetaF;
    };
    SIGENERICO.prototype.getEtiquetaS = function () {
        return this.getEtiquetaS;
    };
    SIGENERICO.prototype.genSi = function (operador, arg0, arg1) {
        this.analizador.agregarCodigo(this.analizador.genOperacion(operador, arg0, arg1, this.etiquetaV), this.column, this.line);
    };
    SIGENERICO.prototype.genSaltoFalso = function () {
        this.analizador.agregarCodigo(this.analizador.genSalto(this.etiquetaF), this.column, this.line);
    };
    SIGENERICO.prototype.escribirEtiquetaV = function () {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaV), this.column, this.line);
    };
    SIGENERICO.prototype.escribirEtiquetaF = function () {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaF), this.column, this.line);
    };
    SIGENERICO.prototype.escribirEtiquetaS = function () {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaS), this.column, this.line);
    };
    SIGENERICO.prototype.escribirSaltoS = function () {
        this.analizador.agregarCodigo(this.analizador.genSalto(this.etiquetaS), this.column, this.line);
    };
    return SIGENERICO;
}());
exports.default = SIGENERICO;
//# sourceMappingURL=sigenerico.js.map