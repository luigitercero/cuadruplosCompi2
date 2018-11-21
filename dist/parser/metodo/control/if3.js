"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IF3 = /** @class */ (function () {
    function IF3(control) {
        this.control = control;
    }
    IF3.prototype.if3 = function (nodo, ciclo) {
        var exp = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        this.errorIf(exp);
        var cuerpoV = nodo.childNode[3];
        var CuerpoF = nodo.childNode[5];
        var l = this.control.analizador.newEtiqueta();
        var salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpoV, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        //sentencias falsas
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaF), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    };
    IF3.prototype.ifSimple = function (exp, cuerpo, ciclo) {
        this.errorIf(exp);
        var l = this.control.analizador.newEtiqueta();
        var salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    IF3.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            throw this.control.analizador.newError("existe error al intentar querer hacer el IF ", exp.fila, exp.column);
        }
    };
    return IF3;
}());
exports.default = IF3;
//# sourceMappingURL=if3.js.map