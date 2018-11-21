"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DCONDICION = /** @class */ (function () {
    function DCONDICION(control) {
        this.control = control;
    }
    /**
     * DOBLECONDICION '(' e ',' e ')'Cuerpo
     *
     * @param nodo
     * @param ciclo
     */
    DCONDICION.prototype.ejecutar = function (nodo, ciclo) {
        //escribimos un or
        this.control.analizador.claseA.tabla.aumetarAbmito();
        var start = this.control.analizador.newEtiqueta();
        ciclo.start.push(start);
        var arg0 = nodo.childNode[2];
        var arg1 = nodo.childNode[4];
        var et = this.control.analizador.exp.operarOr(arg0, arg1);
        ciclo.addEtiquetaSS(et.etiquetaF);
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        var et2 = this.control.analizador.exp.operarAnd(arg0, arg1);
        ciclo.addEtiquetaSS(et2.etiquetaF);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(et.etiquetaV), et.column, et.fila);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(et2.etiquetaV), et2.column, et2.fila);
        var cuerpo = nodo.childNode[6];
        this.control.cuerpo(cuerpo, ciclo);
        this.escribirSaltoStart(ciclo, nodo.childNode[0].location);
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    DCONDICION.prototype.escribirEtiquetaSalida = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), location.last_column, location.first_line);
        }
    };
    DCONDICION.prototype.escribirEtiquetaStart = function (ciclo, location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
        }
    };
    DCONDICION.prototype.escribirSaltoStart = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ciclo.start[0]), location.last_column, location.first_line);
        }
    };
    DCONDICION.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    DCONDICION.prototype.ifSimple = function (exp, cuerpo, ciclo) {
        this.errorIf(exp);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
    };
    return DCONDICION;
}());
exports.default = DCONDICION;
//# sourceMappingURL=doble.js.map