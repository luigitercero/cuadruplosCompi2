"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var simbolo_1 = __importDefault(require("../../tablaSimbolos/simbolo"));
var nodoOperacion = /** @class */ (function () {
    function nodoOperacion(valor, tipo, column, fila) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
        this.etiquetaV = [];
        this.etiquetaF = [];
        this.dim = 0;
        this.temp = "";
        this.simbolo = new simbolo_1.default("", "", "");
        this.tam = 0;
        this.enDireccion = false;
        this.lugar = "";
        this.xor = "";
    }
    nodoOperacion.prototype.getlocation = function () {
        return this.location;
    };
    nodoOperacion.prototype.setLocation = function (location) {
        this.location = location;
    };
    nodoOperacion.prototype.getenDireccion = function () {
        return this.enDireccion;
    };
    nodoOperacion.prototype.setEnDireccion = function (endireccion) {
        this.enDireccion = endireccion;
    };
    nodoOperacion.prototype.setReff = function (reff) {
        this.reff = reff;
    };
    nodoOperacion.prototype.getReff = function () {
        return this.reff;
    };
    nodoOperacion.prototype.getTam = function () {
        return this.tam;
    };
    nodoOperacion.prototype.setTam = function (tam) {
        this.tam = tam;
    };
    nodoOperacion.prototype.addEtiquetaV = function (etiqueta) {
        this.etiquetaV.push(etiqueta);
    };
    nodoOperacion.prototype.addEtiquetaF = function (etiqueta) {
        this.etiquetaF.push(etiqueta);
    };
    nodoOperacion.prototype.addEtiquetaVV = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaV.push(element);
        });
    };
    nodoOperacion.prototype.addEtiquetaFV = function (etiqueta) {
        var _this = this;
        etiqueta.forEach(function (element) {
            _this.etiquetaF.push(element);
        });
    };
    return nodoOperacion;
}());
exports.default = nodoOperacion;
//# sourceMappingURL=nodoOperacion.js.map