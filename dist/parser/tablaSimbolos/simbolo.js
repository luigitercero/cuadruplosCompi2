"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, visibilidad, tipo) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = tipo;
    }
    Simbolo.prototype.getNombre = function () {
        return this.nombre;
    };
    Simbolo.prototype.getVisibilidad = function () {
        return this.visibilidad;
    };
    Simbolo.prototype.getTipo = function () {
        return this.getTipo;
    };
    return Simbolo;
}());
exports.default = Simbolo;
//# sourceMappingURL=simbolo.js.map