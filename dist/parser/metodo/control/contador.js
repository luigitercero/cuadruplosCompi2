"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion_1 = __importDefault(require("../../exp/operacion/nodoOperacion"));
var comparacion_1 = __importDefault(require("../../exp/operacion/comparacion"));
var CONTADOR = /** @class */ (function () {
    function CONTADOR(control) {
        this.control = control;
    }
    /**
     *
     *COUNT Expresion Cuerpo
     *;
     * @param nodo
     * @param ciclo
     */
    CONTADOR.prototype.ejecutar = function (nodo, ciclo) {
        var location = nodo.childNode[0].location;
        this.control.analizador.claseA.tabla.aumetarAbmito();
        var exp = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        //let poss = this.control.analizador.claseA.tabla.agregarSimboloApila(new Simbolo("$$","",this.control.analizador.INT));
        var t0 = this.control.analizador.newTemporal();
        //let t11 = this.control.analizador.newTemporal();
        ciclo.start.push(this.control.analizador.newEtiqueta());
        var cuerpo = nodo.childNode[2];
        /**valor del contador 0 */
        this.control.analizador.agregarCodigo(this.control.analizador.asignar(t0, "0"), location.last_column, location.first_line);
        /*escribir etiqueta start */
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        /*sumar un uno al contador */
        this.control.analizador.agregarCodigo(this.control.analizador.genOperacion("+", t0, 1 + "", t0), location.last_column, location.first_line);
        /*evaluar si finalizo el contador*/
        var op = new nodoOperacion_1.default(t0, this.control.analizador.INT, location.last_column, location.first_line);
        var c = new comparacion_1.default(op, exp, this.control.analizador, "==");
        var value = c.evaluar();
        /*agregando etiquetas falsas si son falsas deberia seguir contando */
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(value.etiquetaF), location.last_column, location.first_line);
        /*agregando el cuerpo  */
        this.control.cuerpo(cuerpo, ciclo);
        /*despues de ejecutar al cuerpo regresa */
        this.escribirSaltoStart(ciclo, nodo.childNode[0].location);
        /*escribe etiquetas verdaderas por que aaqui salen */
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(value.etiquetaV), location.last_column, location.first_line);
        /*etiquetas de salida */
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    CONTADOR.prototype.escribirEtiquetaSalida = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), location.last_column, location.first_line);
        }
    };
    CONTADOR.prototype.escribirEtiquetaStart = function (ciclo, location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
        }
    };
    CONTADOR.prototype.escribirSaltoStart = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ciclo.start[0]), location.last_column, location.first_line);
        }
    };
    CONTADOR.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    CONTADOR.prototype.ifSimple = function (exp, cuerpo, ciclo) {
        this.errorIf(exp);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
    };
    return CONTADOR;
}());
exports.default = CONTADOR;
//# sourceMappingURL=contador.js.map