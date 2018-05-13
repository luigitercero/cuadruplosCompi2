"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfVarible = /** @class */ (function () {
    function InfVarible(temporal, done, simbolo) {
        this.temporal = temporal;
        this.done = done;
        this.simbolo = simbolo;
        this.tam = 0;
        this.dir = temporal;
        this.tamanioDeVariable = simbolo.tam;
        this.temporalDeGuardado = "";
    }
    InfVarible.prototype.gettemporalDeGuardado = function () {
        return this.temporalDeGuardado;
    };
    InfVarible.prototype.settemporalDeGuardado = function (lugar) {
        this.temporalDeGuardado = lugar;
    };
    InfVarible.prototype.addLocation = function (locatio) {
        this.location = locatio;
    };
    InfVarible.prototype.getTamanio = function () {
        return this.tamanioDeVariable;
    };
    InfVarible.prototype.setTamanio = function (tam) {
        this.tamanioDeVariable = tam;
    };
    InfVarible.prototype.getDir = function () {
        return this.dir;
    };
    return InfVarible;
}());
exports.default = InfVarible;
//# sourceMappingURL=obtenerDireccion.js.map