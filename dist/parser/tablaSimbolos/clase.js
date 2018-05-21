"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var tabla_1 = __importDefault(require("./tabla"));
var ambito_1 = __importDefault(require("./ambito"));
var simbolo_1 = __importDefault(require("./simbolo"));
var Estructuras_1 = __importDefault(require("./estructura/Estructuras"));
var Clase = /** @class */ (function () {
    function Clase(nombre, poss) {
        this.herencia = false;
        this.hereda_de = "";
        this.nombre = nombre.toLocaleLowerCase();
        this.poss = poss;
        this.tabla = new tabla_1.default();
        this.crearEsto();
        this.crearPila();
        this.metodo = new Array();
        this.importar = new Array();
        this.estructura = new Estructuras_1.default();
    }
    Clase.prototype.crearEsto = function () {
        this.tabla.esto = new ambito_1.default();
    };
    Clase.prototype.crearPila = function () {
        var global = new ambito_1.default();
        global.prefijo = this.nombre;
        global.agregarSimbolo(new simbolo_1.default("retorno", "publico", "todo"));
        global.agregarSimbolo(new simbolo_1.default("este", "publico", this.nombre));
        this.tabla.Lista.push(global);
    };
    Clase.prototype.agregarMetodo = function (metodo) {
        this.metodo.push(metodo);
    };
    Clase.prototype.verMetodosDeClase = function () {
        console.log("/*****esto son los metodos de la clase " + this.nombre + "*****/");
        for (var index = 0; index < this.metodo.length; index++) {
            var element = this.metodo[index];
            console.log(element.nomMetodo + ", " + element.getTipo());
        }
        console.log("/*****termina los metodos de la clase " + this.nombre + "*****/");
    };
    Clase.prototype.verVariable = function () {
        console.log("/*****estas son los variablles de la clase " + this.nombre + "*****/");
        this.tabla.verVariables();
        console.log("/*****terminal las variables de la clase " + this.nombre + "*****/");
    };
    Clase.prototype.buscarMetodo = function (nombre, location, abstrac) {
        for (var index = 0; index < this.metodo.length; index++) {
            var element = this.metodo[index];
            if (element.nomMetodo == nombre.toLocaleLowerCase()) {
                return element;
            }
        }
        if (abstrac != undefined) {
            if (this.nombre.toLocaleLowerCase() == "lista") {
                for (var index = 0; index < this.metodo.length; index++) {
                    var element = this.metodo[index];
                    if (element.getNombre() == abstrac.toLocaleLowerCase()) {
                        return element;
                    }
                }
            }
            if (this.nombre.toLocaleLowerCase() == "pila") {
                for (var index = 0; index < this.metodo.length; index++) {
                    var element = this.metodo[index];
                    if (element.getNombre() == abstrac.toLocaleLowerCase()) {
                        return element;
                    }
                }
            }
            if (this.nombre.toLocaleLowerCase() == "cola") {
                for (var index = 0; index < this.metodo.length; index++) {
                    var element = this.metodo[index];
                    if (element.getNombre() == abstrac.toLocaleLowerCase()) {
                        return element;
                    }
                }
            }
        }
        if (location == undefined) {
            throw new Error("error al querer obterner el metodo " + nombre);
        }
        else {
            throw new Error("error al querer obterner el metodo " + nombre + " columna " + location.last_column + " line " + location.first_line);
        }
    };
    Clase.prototype.existeMetodo = function (nombre) {
        for (var index = 0; index < this.metodo.length; index++) {
            var element = this.metodo[index];
            if (element.nomMetodo == nombre.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    };
    Clase.prototype.buscarSimbolo = function (nombre, inicio, location) {
        if (inicio === undefined) {
            var simbolo = this.tabla.buscarEnPila(nombre.toLocaleLowerCase());
            if (simbolo != null) {
                return simbolo;
            }
            else {
                simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
                if (simbolo != null) {
                    return simbolo;
                }
            }
        }
        else {
            var simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
            if (simbolo != null) {
                return simbolo;
            }
        }
        if (location != null) {
            throw new Error("no es posible encontrar la variable " + nombre + " linea : " + location.first_line + " columna: " + location.last_column);
        }
        throw new Error("no es posible encontrar variable");
    };
    Clase.prototype.buscarSimboloenEsto = function (nombre) {
        var simbolo;
        simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
        if (simbolo != null) {
            return simbolo;
        }
        return new simbolo_1.default("", "", "3517442");
    };
    return Clase;
}());
exports.default = Clase;
//# sourceMappingURL=clase.js.map