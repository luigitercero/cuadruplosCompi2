"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var ambito_1 = __importDefault(require("./ambito"));
var Tabla = /** @class */ (function () {
    function Tabla() {
        this.esto = new ambito_1.default();
        this.Lista = new Array();
    }
    Tabla.prototype.aumetarAbmito = function () { };
    Tabla.prototype.disminuirAmbito = function () { };
    Tabla.prototype.buscarVariable = function (nombre) { };
    /*
    agregarVariable(nombre:string,visibilidad:string,tipo:string) {
      
    }*/
    Tabla.prototype.getActual = function () { };
    Tabla.prototype.existVarAmbitoActual = function (nombre) {
    };
    return Tabla;
}());
exports.default = Tabla;
//# sourceMappingURL=tabla.js.map