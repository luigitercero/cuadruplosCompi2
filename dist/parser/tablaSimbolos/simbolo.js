"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Simbolo = /** @class */ (function () {
    function Simbolo(nombre, visibilidad, tipo) {
        this.struct = false;
        this.nombre = nombre.toLocaleLowerCase();
        this.visibilidad = visibilidad.toLocaleLowerCase();
        this.tipo = this.filtro(tipo.toLocaleLowerCase());
        this.linea = -1;
        this.possAmbito = -1;
        /**
         * es el tama;o del arreglo
         */
        this.dim = new Array();
        this.tam = 0;
        this.valor = new Valor();
        this.puntero = false;
        this.lugar = "pila";
    }
    Simbolo.prototype.isStruct = function () {
        return this.struct;
    };
    Simbolo.prototype.setStruct = function (struct) {
        this.struct = struct;
    };
    Simbolo.prototype.setLocacion_declaracion = function (location) {
        this.location = location;
    };
    Simbolo.prototype.getLocacion_de_declaracion = function () {
        return this.location;
    };
    Simbolo.prototype.getDim = function (number) {
        return this.dim[number];
    };
    Simbolo.prototype.setPuntero = function (esPuntero) {
        this.puntero = esPuntero;
    };
    Simbolo.prototype.getPunter = function () {
        return this.puntero;
    };
    Simbolo.prototype.getLugar = function () {
        return this.lugar;
    };
    Simbolo.prototype.setLugar = function (lugar) {
        this.lugar = lugar;
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
        //this.tam = this.tam *tam;
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