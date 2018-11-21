"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REPETIR = /** @class */ (function () {
    function REPETIR(control) {
        this.control = control;
    }
    /**
     *DO Cuerpo WHILE Expresion
     *;
     * @param nodo
     * @param ciclo
     */
    REPETIR.prototype.ejecutar = function (nodo, ciclo) {
        this.control.analizador.claseA.tabla.aumetarAbmito();
        var start = this.control.analizador.newEtiqueta();
        var cuerpo = nodo.childNode[1];
        ciclo.start.push(start);
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        this.control.cuerpo(cuerpo, ciclo);
        var exp = this.control.analizador.exp.analizar(nodo.childNode[3].childNode[1]);
        ciclo.addEtiquetaSS(exp.etiquetaV);
        this.ifSimple(exp, ciclo);
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    REPETIR.prototype.escribirEtiquetaSalida = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), location.last_column, location.first_line);
        }
    };
    REPETIR.prototype.escribirEtiquetaStart = function (ciclo, location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
        }
    };
    REPETIR.prototype.escribirSaltoStart = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ciclo.start[0]), location.last_column, location.first_line);
        }
    };
    REPETIR.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    REPETIR.prototype.ifSimple = function (exp, ciclo) {
        this.errorIf(exp);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaF), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador
            .genSalto(ciclo.start[0]), exp.column, exp.fila);
    };
    return REPETIR;
}());
exports.default = REPETIR;
//# sourceMappingURL=repetir.js.map