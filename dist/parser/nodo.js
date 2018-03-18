"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var location_1 = __importDefault(require("../parser/location"));
var Nodo = /** @class */ (function () {
    function Nodo(nodo) {
        this.term = nodo.term;
        this.location = new location_1.default(nodo.location);
        this.token = nodo.token;
        this.childNode = nodo.childNode;
    }
    Nodo.prototype.recorrer = function (nodo, espacio) {
        var _this = this;
        console.log(espacio + nodo.term);
        nodo.childNode.forEach(function (element) {
            _this.recorrer(element, espacio + " ");
        });
    };
    return Nodo;
}());
exports.default = Nodo;
