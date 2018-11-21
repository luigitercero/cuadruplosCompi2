"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IF1 = /** @class */ (function () {
    function IF1(control) {
        this.control = control;
    }
    IF1.prototype.if1 = function (nodo, ciclo) {
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
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaF), exp.column, exp.fila);
        this.control.cuerpo(CuerpoF, ciclo);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    };
    IF1.prototype.ifSimple = function (exp, cuerpo, ciclo) {
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
    IF1.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar querer hacer el IF ", exp.fila, exp.column);
        }
    };
    return IF1;
}());
exports.default = IF1;
//# sourceMappingURL=if1.js.map