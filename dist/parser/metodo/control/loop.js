"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LOOP = /** @class */ (function () {
    function LOOP(control) {
        this.control = control;
    }
    /**
     *  LOOP ID Cuerpo
     *
     *;
     * @param nodo
     * @param ciclo
     */
    LOOP.prototype.ejecutar = function (nodo, ciclo) {
        this.control.analizador.claseA.tabla.aumetarAbmito();
        var start = this.control.analizador.newEtiqueta();
        var cuerpo = nodo.childNode[2];
        ciclo.start.push(start);
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        this.control.cuerpo(cuerpo, ciclo);
        this.escribirSaltoStart(ciclo, nodo.childNode[0].location);
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    LOOP.prototype.escribirEtiquetaSalida = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), location.last_column, location.first_line);
        }
    };
    LOOP.prototype.escribirEtiquetaStart = function (ciclo, location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
        }
    };
    LOOP.prototype.escribirSaltoStart = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ciclo.start[0]), location.last_column, location.first_line);
        }
    };
    LOOP.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    LOOP.prototype.ifSimple = function (exp, cuerpo, ciclo) {
        this.errorIf(exp);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
    };
    return LOOP;
}());
exports.default = LOOP;
//# sourceMappingURL=loop.js.map