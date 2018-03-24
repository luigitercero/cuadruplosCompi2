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
    Comparacion.prototype.agregaretiqueta = function () {
        var lv = this.analizador.newEtiqueta();
        var lf = this.analizador.newEtiqueta();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, lv), c, f);
        this.analizador.agregarCodigo(this.analizador.genSalto(lf), c, f);
        var xor = this.analizador.opBool(this.op) + ", " + this.arg0.valor + ", " + this.arg1.valor;
        var n = new nodoOperacion_1.default(xor, 0, c, f);
        n.addEtiquetaV(lv);
        n.addEtiquetaF(lf);
        return n;
    };
    return Comparacion;
}(casteo_1.default));
exports.default = Comparacion;
//# sourceMappingURL=comparacion.js.map