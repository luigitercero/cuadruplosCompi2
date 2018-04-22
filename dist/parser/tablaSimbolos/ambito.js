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
    Ambito.prototype.setPTR = function (inicio) {
        this.ptr = inicio;
    };
    Ambito.prototype.buscarVariable = function (nombre) {
        for (var index = 0; index < this.ambito.length; index++) {
            var element = this.ambito[index];
            if (element.getNombre() == nombre.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    };
    Ambito.prototype.getVariable = function (nombre) {
        for (var index = 0; index < this.ambito.length; index++) {
            var element = this.ambito[index];
            if (element.getNombre() == nombre.toLocaleLowerCase()) {
                return element;
            }
        }
        return new simbolo_1.default("", "", "");
    };
    Ambito.prototype.agregarVariable = function (nombre, visibilidad, tipo) {
        var simbolo = new simbolo_1.default(nombre.toLocaleLowerCase(), visibilidad, tipo);
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr;
        this.siguietePosicionLibre(simbolo);
        return simbolo;
    };
    Ambito.prototype.agregarSimbolo = function (simbolo) {
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr;
        this.siguietePosicionLibre(simbolo);
    };
    Ambito.prototype.siguietePosicionLibre = function (simbolo) {
        this.ptr++;
    };
    Ambito.prototype.existeVariable = function (nombre) {
        for (var index = 0; index < this.ambito.length; index++) {
            if (this.ambito[index].getNombre() == (nombre.toLocaleLowerCase())) {
                return true;
            }
        }
        return false;
    };
    Ambito.prototype.getSize = function () { return this.ambito.length; };
    Ambito.prototype.verVariables = function () {
        for (var index = 0; index < this.ambito.length; index++) {
            var element = this.ambito[index];
            console.log(element.getNombre(), element.tam, element.getTipo());
        }
    };
    return Ambito;
}());
exports.default = Ambito;
//# sourceMappingURL=ambito.js.map