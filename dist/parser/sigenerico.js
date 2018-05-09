"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SIGENERICO = /** @class */ (function () {
    function SIGENERICO(analizador) {
        this.analizador = analizador;
        this.etiquetaV = this.analizador.newEtiqueta();
        this.etiquetaF = this.analizador.newEtiqueta();
        this.etiquetaS = this.analizador.newEtiqueta();
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
        return this.analizador.genOperacion(operador, arg0, arg1, this.etiquetaV);
    };
    SIGENERICO.prototype.genSaltoFalso = function () {
        return this.analizador.genSalto(this.etiquetaF);
    };
    SIGENERICO.prototype.escribirEtiquetaV = function () {
        return this.analizador.escribirEtiquetaS(this.etiquetaV);
    };
    SIGENERICO.prototype.escribirEtiquetaF = function () {
        return this.analizador.escribirEtiquetaS(this.etiquetaF);
    };
    SIGENERICO.prototype.escribirEtiquetaS = function () {
        return this.analizador.escribirEtiquetaS(this.etiquetaS);
    };
    SIGENERICO.prototype.escribirSaltoS = function () {
        return this.analizador.genSalto(this.etiquetaS);
    };
    return SIGENERICO;
}());
exports.default = SIGENERICO;
//# sourceMappingURL=sigenerico.js.map