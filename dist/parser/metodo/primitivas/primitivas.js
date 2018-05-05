"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var imprimir_1 = __importDefault(require("./imprimir"));
var concatenar_1 = __importDefault(require("./concatenar"));
var Primitivas = /** @class */ (function () {
    function Primitivas(analizador) {
        this.analizador = analizador;
        this.imprimir = new imprimir_1.default(analizador);
        this.concatenar = new concatenar_1.default(analizador);
    }
    /**
     * Primitivas
     * :IMPRIMIR
     * |CONCATENAR
     * |CONVERTIRCADENA
     * |CONVERTIRENTERO
     * |CREARPUNTERO
     * |OBTERNERDIRECCION
     * |RESERVAMEMORIA
     * |CONSULTARTAMANIO
     * |TECLADO
     * ;
     */
    Primitivas.prototype.analizar = function (metodo, varible) {
        switch (metodo) {
            case "IMPRIMIR":
                this.imprimir.imprimir(varible);
                break;
            case "CONCATENAR":
                this.concatenar.ejecutar(varible);
                break;
            case "CONVERTIRCADENA":
            case "CONVERTIRENTERO":
            case "CREARPUNTERO":
            case "OBTERNERDIRECCION":
            case "RESERVAMEMORIA":
            case "CONSULTARTAMANIO":
            case "TECLADO":
        }
    };
    return Primitivas;
}());
exports.default = Primitivas;
//# sourceMappingURL=primitivas.js.map