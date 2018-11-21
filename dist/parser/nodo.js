"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Nodo = /** @class */ (function () {
    function Nodo(nodo) {
        this.term = nodo.term;
        this.token = nodo.token;
        this.childNode = nodo.childNode;
        this.location = nodo.location;
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
//# sourceMappingURL=nodo.js.map