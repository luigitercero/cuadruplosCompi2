"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var control = /** @class */ (function () {
    function control(analizador) {
        this.analizador = analizador;
    }
    control.prototype.control = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "If1":
                break;
            case "If2":
                break;
            case "Switch":
                break;
            case "While":
                break;
            case "Do_While":
                break;
            case "Repeat_Until":
                break;
            case "For":
                break;
            case "Loop":
                break;
            case "Count":
                break;
            case "Doble_Condicion":
                break;
            case "Repetir":
                break;
        }
    };
    /**
     *  If1
     *:IF Expresion ESVERDADERO  Cuerpo  ESFALSO Cuerpo FINSI
     *;
     * @param nodo
     */
    control.prototype.if1 = function (nodo) {
        var exp = nodo.childNode[1].childNode[1];
        var cuerpoV = nodo.childNode[3];
        var CuerpoF = nodo.childNode[5];
    };
    /**
     *  Cuerpo: '{'Cuerpo1 '}'
     *  | '{' '}'
     *  ;
     */
    control.prototype.cuerpo = function (nodo) {
        var term = nodo.childNode[1].term;
        switch (term) {
            case "Cuerpo1":
                break;
            default:
                return true;
        }
    };
    return control;
}());
exports.default = control;
//# sourceMappingURL=control.js.map