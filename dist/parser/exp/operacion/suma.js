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
    function Suma(arg0, arg1, analizador, op) {
        var _this = _super.call(this, arg0, arg1, analizador) || this;
        _this.op = op;
        return _this;
    }
    Suma.prototype.caracterCaracter = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion_1.default(t, 1, c, f);
    };
    Suma.prototype.numberNumber = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion_1.default(t, 1, c, f);
    };
    Suma.prototype.booleaBolean = function () {
        this.arg1 = this.castearBoleano(this.arg1);
        this.arg0 = this.castearBoleano(this.arg0);
        return this.numberNumber();
    };
    Suma.prototype.numberBolean = function () {
        this.arg1 = this.castearBoleano(this.arg1);
        return this.numberNumber();
    };
    Suma.prototype.boleanNumber = function () {
        this.arg0 = this.castearBoleano(this.arg0);
        return this.numberNumber();
    };
    Suma.prototype.boleanCaracter = function () {
        this.arg0 = this.castearBoleano(this.arg0);
        return this.caracterCaracter();
    };
    Suma.prototype.caracterBolean = function () {
        this.arg1 = this.castearBoleano(this.arg1);
        return this.caracterCaracter();
    };
    Suma.prototype.castearBoleano = function (arg0) {
        var t0 = this.analizador.newTemporal();
        var es = this.analizador.newEtiqueta();
        /*para etiqueta verdadera */
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaV), arg0.column, arg0.fila);
        this.analizador.agregarCodigo(this.analizador.asignar("1", t0), arg0.column, arg0.fila);
        this.analizador.agregarCodigo(this.analizador.genSalto(es), this.arg0.column, this.arg0.fila);
        /*para etiqueta falsa */
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaF), arg0.column, arg0.fila);
        this.analizador.agregarCodigo(this.analizador.asignar("0", t0), arg0.column, arg0.fila);
        return new nodoOperacion_1.default(t0, 1, arg0.column, arg0.fila);
    };
    return Suma;
}(casteo_1.default));
exports.default = Suma;
//# sourceMappingURL=suma.js.map