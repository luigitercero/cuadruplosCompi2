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
var Or = /** @class */ (function (_super) {
    __extends(Or, _super);
    function Or(arg0, arg1, analizador) {
        return _super.call(this, arg0, arg1, analizador) || this;
    }
    Or.prototype.booleaBolean = function () {
        var t = this.analizador.newTemporal();
        var c = this.arg0.column;
        var f = this.arg0.fila;
        // this.analizador.agregarCodigo(this.analizador.genOperacion(this.op,this.arg0.valor,this.arg1.valor,t),c,f);
        return new nodoOperacion_1.default(t, 1, c, f);
    };
    return Or;
}(casteo_1.default));
exports.default = Or;
//# sourceMappingURL=or.js.map