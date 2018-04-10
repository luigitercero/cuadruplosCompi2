"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("./simbolo"));
var ambito_1 = __importDefault(require("./ambito"));
var Tabla = /** @class */ (function () {
    function Tabla() {
        this.actual = new ambito_1.default();
        this.esto = new ambito_1.default();
        this.Lista = new Array();
        this.Lista.push(this.actual);
        this.ptr = 0;
    }
    Tabla.prototype.addReturnAndThis = function (estoTipo) {
        var retorno = new simbolo_1.default("retorno", "", "");
        var _esto = new simbolo_1.default("esto", "", estoTipo);
        this.agregarSimboloApila(retorno);
        this.agregarSimboloApila(_esto);
    };
    Tabla.prototype.aumetarAbmito = function () {
        var nuevoAmbito = new ambito_1.default();
        nuevoAmbito.setPTR(this.ptr);
        this.Lista.push(nuevoAmbito);
        this.actual = nuevoAmbito;
    };
    Tabla.prototype.disminuirAmbito = function () {
        var ambitoActual = this.Lista[this.Lista.length - 1];
        this.ptr = this.ptr - ambitoActual.ptr;
        this.Lista.pop();
        this.actual = this.Lista[this.Lista.length - 1];
    };
    Tabla.prototype.agregarSimboloApila = function (simbolo) {
        simbolo.possAmbito = this.ptr;
        this.actual.agregarSimbolo(simbolo);
        this.siguietePosicionLibre(simbolo);
    };
    Tabla.prototype.buscarEnPila = function (nombre) {
        for (var index = 0; index < this.Lista.length; index++) {
            for (var index2 = 0; index2 < this.Lista[index].ambito.length; index2++) {
                var simbolo = this.Lista[index].ambito[index2];
                if (simbolo.getNombre() == nombre) {
                    return simbolo;
                }
            }
        }
        return null;
    };
    Tabla.prototype.buscarEnHeap = function (nombre) {
        for (var index = 0; index < this.esto.ambito.length; index++) {
            var simbolo = this.esto.ambito[index];
            if (simbolo.getNombre() == nombre) {
                return simbolo;
            }
        }
        return null;
    };
    Tabla.prototype.siguietePosicionLibre = function (simbolo) {
        this.ptr++;
    };
    /*
    agregarVariable(nombre:string,visibilidad:string,tipo:string) {
      
    }*/
    Tabla.prototype.getActual = function () { };
    Tabla.prototype.existVarAmbitoActual = function (nombre) {
    };
    Tabla.prototype.verVariables = function () {
        console.log("/** variables Locales **/");
        for (var index = 0; index < this.Lista.length; index++) {
            var element = this.Lista[index];
            element.verVariables();
        }
        console.log("/** fin de variables Locales **/");
        console.log("/** esto **/");
        this.esto.verVariables();
        console.log("/** fin Esto **/");
    };
    return Tabla;
}());
exports.default = Tabla;
//# sourceMappingURL=tabla.js.map