"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var tabla_1 = __importDefault(require("./tabla"));
var ambito_1 = __importDefault(require("./ambito"));
var simbolo_1 = __importDefault(require("./simbolo"));
var Clase = /** @class */ (function () {
    function Clase(nombre, poss) {
        this.nombre = nombre;
        this.poss = poss;
        this.tabla = new tabla_1.default();
        this.crearEsto();
        this.crearPila();
        this.metodo = new Array();
    }
    Clase.prototype.crearEsto = function () {
        this.tabla.esto = new ambito_1.default();
    };
    Clase.prototype.crearPila = function () {
        var global = new ambito_1.default();
        global.prefijo = this.nombre;
        global.agregarSimbolo(new simbolo_1.default("retorno", "publico", "todo"));
        global.agregarSimbolo(new simbolo_1.default("esto", "publico", this.nombre));
    };
    return Clase;
}());
exports.default = Clase;
//# sourceMappingURL=clase.js.map