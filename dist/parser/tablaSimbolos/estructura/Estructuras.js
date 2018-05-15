"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Estructura = /** @class */ (function () {
    function Estructura() {
        this.struct = new Array();
    }
    Estructura.prototype.agregarEstructura = function (estructura) {
        this.struct.push(estructura);
    };
    Estructura.prototype.verTodasLasEstructuras = function () {
        console.log("/*****esto son las estructura" + "*****/");
        for (var index = 0; index < this.struct.length; index++) {
            var element = this.struct[index];
            console.log(element.nombre);
        }
        console.log("/*****termina las estructuras  " + "*****/");
    };
    Estructura.prototype.buscarEstructura = function (nombre, location) {
        for (var index = 0; index < this.struct.length; index++) {
            var element = this.struct[index];
            if (element.nombre == nombre.toLocaleLowerCase()) {
                return element;
            }
        }
    };
    Estructura.prototype.existeEstructura = function (nombre) {
        for (var index = 0; index < this.struct.length; index++) {
            var element = this.struct[index];
            if (element.nombre == nombre.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    };
    return Estructura;
}());
exports.default = Estructura;
//# sourceMappingURL=Estructuras.js.map