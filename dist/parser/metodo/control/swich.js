"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var comparacion_1 = __importDefault(require("../../exp/operacion/comparacion"));
var SWICH = /** @class */ (function () {
    function SWICH(control) {
        this.control = control;
    }
    /*
Switch
   : SWITCH   Expresion '{' CuerpoSwitch Default
   ;
*/
    SWICH.prototype.swich = function (nodo, ciclo) {
        this.control.analizador.claseA.tabla.aumetarAbmito();
        var exp = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        var cuerpoSwitch = nodo.childNode[3];
        var defau = nodo.childNode[4];
        this.cuerswich(cuerpoSwitch, exp, ciclo);
        this.deft(defau, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    SWICH.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    /**
     *Default
     *: DEFAULT ':' Cuerpo1 '}'
     *| '}'
     *;
    */
    SWICH.prototype.deft = function (nodo, ciclo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "DEFAULT":
                this.control.cuerpo1(nodo.childNode[2], ciclo);
            case "'}'":
        }
    };
    /**
     * CuerpoSwitch
     *: CuerpoSwitch Caso
     *| Caso
     *;
    */
    SWICH.prototype.cuerswich = function (nodo, val, ciclo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "CuerpoSwitch":
                this.cuerswich(nodo.childNode[0], val, ciclo);
                this.caso(nodo.childNode[1], val, ciclo);
                return val;
            case "Caso":
                this.caso(nodo.childNode[0], val, ciclo);
        }
    };
    /**
     * Caso
     *: CASE e ':' Cuerpo1
     *: CASE e ':'
     *;
    */
    SWICH.prototype.caso = function (nodo, val, ciclo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "CASE":
                var exp = this.control.analizador.exp.analizar(nodo.childNode[1]);
                if (nodo.childNode.length > 3)
                    this.resolverCaso(val, exp, nodo.childNode[3], ciclo);
                return val;
            default:
                this.control.analizador.newError("error en los case", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                break;
        }
    };
    SWICH.prototype.resolverCaso = function (arg0, arg1, nodo, ciclo) {
        var op = new comparacion_1.default(arg0, arg1, this.control.analizador, "==");
        var val = op.evaluar();
        this.ifSimple(val, nodo, ciclo);
    };
    SWICH.prototype.ifSimple = function (exp, cuerpo, ciclo) {
        this.errorIf(exp);
        var l = this.control.analizador.newEtiqueta();
        var salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo1(cuerpo, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaF), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    };
    return SWICH;
}());
exports.default = SWICH;
//# sourceMappingURL=swich.js.map