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
var simbolo_1 = __importDefault(require("./simbolo"));
var Metodo = /** @class */ (function (_super) {
    __extends(Metodo, _super);
    function Metodo(nombre, visibilidad, tipo, possAmbito) {
        return _super.call(this, nombre, visibilidad, tipo) || this;
    }
    return Metodo;
}(simbolo_1.default));
exports.default = Metodo;
//# sourceMappingURL=metodo.js.map