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
var nodoOperacion_1 = __importDefault(require("./nodoOperacion"));
var casteo_1 = __importDefault(require("./casteo"));
var sigenerico_1 = __importDefault(require("../../sigenerico"));
var Eleva = /** @class */ (function (_super) {
    __extends(Eleva, _super);
    function Eleva(analizador) {
        var _this = this;
        var arg0 = new nodoOperacion_1.default("35174492", "35174492", 0, 0);
        var arg1 = new nodoOperacion_1.default("35174492", "35174492", 0, 0);
        _this = _super.call(this, arg0, arg1, analizador) || this;
        _this.op = "^";
        return _this;
    }
    Eleva.prototype.setArg0 = function (nodo) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg0 =
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
        }
        else {
            this.arg0 = nodo;
        }
    };
    Eleva.prototype.setArg1 = function (nodo) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg1 =
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
        }
        else {
            this.arg1 = nodo;
        }
    };
    Eleva.prototype.numberNumber = function () {
        var c = this.arg0.column;
        var f = this.arg0.fila;
        return this.elevar();
    };
    Eleva.prototype.doubleDouble = function () {
        var c = this.arg0.column;
        var f = this.arg0.fila;
        return this.elevar();
    };
    Eleva.prototype.elevar = function () {
        var si = new sigenerico_1.default(this.analizador, this.arg0.column, this.arg0.fila);
        var t0 = this.analizador.newTemporal();
        var t1 = this.analizador.newTemporal();
        var comentario = this.analizador.genComentario("inicia elevacion");
        this.analizador.agregarCodigo(this.analizador.asignar("0", t0) + comentario, this.arg0.column, this.arg0.fila);
        this.analizador.agregarCodigo(this.analizador.asignar("1", t1), this.arg0.column, this.arg0.fila);
        si.escribirEtiquetaS();
        si.genSi("<", t0, this.arg1.valor);
        si.genSaltoFalso();
        si.escribirEtiquetaV();
        this.analizador.agregarCodigo(this.analizador.genOperacion("*", t1, this.arg0.valor, t1), this.arg0.column, this.arg0.fila);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", t0, "1", t0), this.arg0.column, this.arg0.fila);
        si.escribirSaltoS();
        si.escribirEtiquetaF();
        comentario = this.analizador.genComentario("fin de elevacion");
        this.analizador.agregarCodigo(comentario, this.arg0.column, this.arg0.fila);
        return new nodoOperacion_1.default(t1, this.arg0.tipo, this.arg0.column, this.arg0.fila);
    };
    return Eleva;
}(casteo_1.default));
exports.default = Eleva;
//# sourceMappingURL=eleva.js.map