"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Salida = /** @class */ (function () {
    function Salida(ciclo) {
        if (ciclo != null) {
            this.isCiclo = ciclo;
        }
        else {
            this.isCiclo = false;
        }
        this.etiquetaS = Array();
        this.etiquetaR = Array();
        this.start = Array();
        this.dim = -1;
    }
    /**estiquea de break */
    Salida.prototype.addEtiquetaS = function (etiqueta, location) {
        this.etiquetaS.push(etiqueta);
        this.location = location;
    };
    /**etiqueta de return */
    Salida.prototype.addEtiquetaR = function (etiqueta, location) {
        this.etiquetaR.push(etiqueta);
        this.location = location;
    };
    Salida.prototype.addEtiqueta = function (etiquetaS, etiquetaR) {
        this.addEtiquetaSS(etiquetaS);
        this.addEtiquetaSS(etiquetaR);
        this.location = location;
    };
    Salida.prototype.addEtiquetaSS = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaS.push(element);
        });
    };
    Salida.prototype.addEtiquetaRR = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaR.push(element);
        });
    };
    return Salida;
}());
exports.default = Salida;
//# sourceMappingURL=nodoSalida.js.map