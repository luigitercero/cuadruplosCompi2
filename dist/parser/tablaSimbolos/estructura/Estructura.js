"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var ambito_1 = __importDefault(require("../ambito"));
var simbolo_1 = __importDefault(require("../simbolo"));
var Struct = /** @class */ (function () {
    function Struct(nombre, poss) {
        this.nombre = nombre.toLocaleLowerCase();
        this.poss = poss;
        this.variables = new ambito_1.default();
    }
    Struct.prototype.agregarSimbolo = function (nombre, tipo) {
        this.variables.agregarSimbolo(new simbolo_1.default(nombre, "", tipo));
    };
    Struct.prototype.agregarSim = function (simbolo) {
        this.variables.agregarSimbolo(simbolo);
    };
    Struct.prototype.verTodosLosSimbolos = function () {
        console.log("/*****esto son los metodos de la clase " + this.nombre + "*****/");
        for (var index = 0; index < this.variables.ambito.length; index++) {
            var element = this.variables.ambito[index];
            console.log(element.getNombre() + ", " + element.getTipo());
        }
        console.log("/*****termina los metodos de la clase " + this.nombre + "*****/");
    };
    Struct.prototype.buscarSimbolo = function (nombre, inicio, location) {
        var simbolo = this.variables.getVariable(nombre.toLocaleLowerCase());
        if (simbolo == null) {
            throw new Error("no es posible encontrar variable");
        }
        else {
            return simbolo;
        }
    };
    return Struct;
}());
exports.default = Struct;
//# sourceMappingURL=Estructura.js.map