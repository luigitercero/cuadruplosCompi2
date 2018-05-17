"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var casteo_1 = __importDefault(require("./casteo"));
var nodoOperacion_1 = __importDefault(require("./nodoOperacion"));
var Suma = /** @class */ (function (_super) {
    __extends(Suma, _super);
    function Suma(analizador, op) {
        var _this = this;
        var arg0 = new nodoOperacion_1.default("35174492", "35174492", 0, 0);
        var arg1 = new nodoOperacion_1.default("35174492", "35174492", 0, 0);
        _this = _super.call(this, arg0, arg1, analizador) || this;
        _this.op = op;
        return _this;
    }
    Suma.prototype.setArg0 = function (nodo) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg0 =
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
        }
        else {
            this.arg0 = nodo;
        }
    };
    Suma.prototype.setArg1 = function (nodo) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg1 =
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
        }
        else {
            this.arg1 = nodo;
        }
    };
    Suma.prototype.caracterCaracter = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion_1.default(t, this.analizador.CARACTER, c, f);
    };
    Suma.prototype.numberNumber = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion_1.default(t, this.analizador.INT, c, f);
    };
    Suma.prototype.booleaBolean = function () {
        return this.numberNumber();
    };
    Suma.prototype.numberBolean = function () {
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.INT);
        return this.numberNumber();
    };
    Suma.prototype.boleanNumber = function () {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.INT);
        return this.numberNumber();
    };
    Suma.prototype.boleanCaracter = function () {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.CARACTER);
        return this.caracterCaracter();
    };
    Suma.prototype.caracterBolean = function () {
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.CARACTER);
        return this.caracterCaracter();
    };
    Suma.prototype.doubleDouble = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion_1.default(t, this.analizador.DOUBLE, c, f);
    };
    Suma.prototype.booleanDouble = function () {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.DOUBLE);
        return this.caracterCaracter();
    };
    Suma.prototype.doubleBoolean = function () {
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.DOUBLE);
        return this.caracterCaracter();
    };
    return Suma;
}(casteo_1.default));
exports.default = Suma;
//# sourceMappingURL=suma.js.map