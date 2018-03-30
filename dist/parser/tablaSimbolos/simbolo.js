"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, visibilidad, tipo) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = this.filtro(tipo);
        this.linea = -1;
        this.possAmbito = -1;
        this.dim = new Array();
        this.tam = 1;
        this.valor = false;
    }
    Simbolo.prototype.filtro = function (tipo) {
        switch (tipo) {
            case "entero": return "int";
            case "decimal": return "double";
            case "caracter": return "caracter";
            case "booleano": return "boolean";
        }
        return tipo;
    };
    Simbolo.prototype.getNombre = function () {
        return this.nombre;
    };
    Simbolo.prototype.getVisibilidad = function () {
        return this.visibilidad;
    };
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.addDimension = function (tam) {
        this.dim.push(tam);
        this.tam = this.tam * tam;
    };
    Simbolo.prototype.getTamanio = function () {
        return this.tam;
    };
    return Simbolo;
}());
exports.default = Simbolo;
//# sourceMappingURL=simbolo.js.map