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
var Comparacion = /** @class */ (function (_super) {
    __extends(Comparacion, _super);
    function Comparacion(arg0, arg1, analizador, op) {
        var _this = _super.call(this, arg0, arg1, analizador) || this;
        _this.op = op;
        return _this;
    }
    Comparacion.prototype.caracterCaracter = function () {
        return this.agregaretiqueta();
    };
    Comparacion.prototype.numberNumber = function () {
        return this.agregaretiqueta();
    };
    Comparacion.prototype.doubleDouble = function () {
        return this.agregaretiqueta();
    };
    Comparacion.prototype.evaluarObjeto = function () {
        return this.agregaretiqueta();
    };
    Comparacion.prototype.stringString = function () {
        return this.igualString();
    };
    Comparacion.prototype.booleaBolean = function () {
        return this.igualarBooleano();
    };
    Comparacion.prototype.igualarBooleano = function () {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.INT);
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.INT);
        return this.agregaretiqueta();
    };
    Comparacion.prototype.igualString = function () {
        var c = this.arg0.column;
        var f = this.arg0.fila;
        if (this.arg0.simbolo != null) {
            if (this.arg0.tipo == this.analizador.CARACTER && this.arg0.simbolo.tam == 1) {
                this.referenciaDelArregloNuevInicio(this.arg0.valor, c, f);
                this.arg0.tipo = this.analizador.STRING;
            }
        }
        if (this.arg1.simbolo != null) {
            if (this.arg1.tipo == this.analizador.CARACTER && this.arg1.simbolo.tam == 1) {
                this.referenciaDelArregloNuevInicio(this.arg1.valor, c, f);
                this.arg1.tipo = this.analizador.STRING;
            }
        }
        if (this.arg0.tipo == this.analizador.STRING)
            this.arg0.valor = this.sumarTodosLosCaracteresDe(this.arg0.valor, c, f);
        if (this.arg1.tipo == this.analizador.STRING)
            this.arg1.valor = this.sumarTodosLosCaracteresDe(this.arg1.valor, c, f);
        return this.agregaretiqueta();
    };
    Comparacion.prototype.referenciaDelArregloNuevInicio = function (referencia, column, linea) {
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", referencia, "2", referencia), column, linea);
    };
    Comparacion.prototype.sumarTodosLosCaracteresDe = function (referencia, column, linea) {
        var start = this.analizador.newEtiqueta();
        var lv = this.analizador.newEtiqueta();
        var lf = this.analizador.newEtiqueta();
        var salida = this.analizador.newTemporal();
        var val0 = this.analizador.newTemporal();
        //la salida va a ser igual a 0
        this.analizador.agregarCodigo(this.analizador.asignar("0", salida), column, linea);
        //agregar etiquetas verdaderas
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(start), column, linea);
        //obtener los valores de cada caracter
        this.analizador.agregarCodigo(this.analizador.getEnHeap(referencia, val0), column, linea);
        //mientras no sea nulo sumar
        this.analizador.agregarCodigo(this.analizador.genOperacion("!=", val0, this.analizador.NULL, lv), column, linea);
        //entonces si es nulo saltar a la etiqueta falsa
        this.analizador.agregarCodigo(this.analizador.genSalto(lf), column, linea);
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lv), column, linea);
        //sumar salida
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", salida, val0, salida), column, linea);
        //pasarse al siguiente valor de la referenecia
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", referencia, "1", referencia), column, linea);
        //regresar para sacar caracter
        this.analizador.agregarCodigo(this.analizador.genSalto(start), column, linea);
        //etiqueta falsa
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lf), column, linea);
        return salida;
    };
    /**
     * funciona para las operaciones xor que se deba subir un atributo
    */
    Comparacion.prototype.agregaretiqueta = function () {
        var lv = this.analizador.newEtiqueta();
        var lf = this.analizador.newEtiqueta();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, lv), c, f);
        this.analizador.agregarCodigo(this.analizador.genSalto(lf), c, f);
        var xor = this.analizador.opBool(this.op) + ", " + this.arg0.valor + ", " + this.arg1.valor;
        var n = new nodoOperacion_1.default("", this.analizador.BOOLEANO, c, f);
        n.xor = xor;
        n.addEtiquetaV(lv);
        n.addEtiquetaF(lf);
        return n;
    };
    return Comparacion;
}(casteo_1.default));
exports.default = Comparacion;
//# sourceMappingURL=comparacion.js.map