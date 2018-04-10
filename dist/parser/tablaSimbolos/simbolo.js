"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, visibilidad, tipo) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = this.filtro(tipo);
        this.linea = -1;
        this.possAmbito = -1;
        /**
         * es el tama;o del arreglo
         */
        this.dim = new Array();
        this.tam = 0;
        this.valor = new Valor();
    }
    Simbolo.prototype.getDim = function (number) {
        return this.dim[number];
    };
    Simbolo.prototype.filtro = function (tipo) {
        switch (tipo) {
            case "entero": return "entero";
            case "decimal": return "decimal";
            case "caracter": return "caracter";
            case "booleano": return "booleano";
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
    Simbolo.prototype.addValor = function (nodo, location) {
        this.valor = new Valor(nodo, location);
    };
    Simbolo.prototype.addTam = function (tam) {
        this.tam = this.tam + tam;
    };
    return Simbolo;
}());
exports.default = Simbolo;
var Valor = /** @class */ (function () {
    function Valor(valor, location) {
        if (valor != null && location != null) {
            this.valor = valor;
            this.location = location;
        }
        else {
            this.valor = null;
        }
    }
    Valor.prototype.getNodo = function () {
        if (this.valor != null) {
            return this.valor;
        }
        else {
            throw util_1.error("error no debi pasar por aqui");
        }
    };
    return Valor;
}());
//# sourceMappingURL=simbolo.js.map