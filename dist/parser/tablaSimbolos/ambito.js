"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("./simbolo"));
var Ambito = /** @class */ (function () {
    function Ambito() {
        this.ptr = 0;
        this.postFijo = new Array();
        this.ambito = new Array();
        this.prefijo = "";
    }
    Ambito.prototype.buscarVariable = function (nombre) { };
    Ambito.prototype.agregarVariable = function (nombre, visibilidad, tipo) {
        var simbolo = new simbolo_1.default(nombre, visibilidad, tipo);
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr;
        this.ptr++;
        return simbolo;
    };
    Ambito.prototype.agregarSimbolo = function (simbolo) {
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr;
        this.siguietePosicionLibre(simbolo);
    };
    Ambito.prototype.siguietePosicionLibre = function (simbolo) {
        this.ptr = this.ptr + simbolo.getTamanio();
    };
    Ambito.prototype.existeVariable = function (nombre) {
        for (var index = 0; index < this.ambito.length; index++) {
            if (this.ambito[index].getNombre() == (nombre)) {
                return true;
            }
        }
        return false;
    };
    Ambito.prototype.getSize = function () { return this.ambito.length; };
    return Ambito;
}());
exports.default = Ambito;
//# sourceMappingURL=ambito.js.map