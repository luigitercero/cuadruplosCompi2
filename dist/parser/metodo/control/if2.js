"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IF2 = /** @class */ (function () {
    function IF2(control) {
        this.control = control;
    }
    IF2.prototype.if2 = function (nodo, ciclo) {
        var exp = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        this.errorIf(exp);
        var cuerpoV = nodo.childNode[3];
        var CuerpoF = nodo.childNode[5];
        var l = this.control.analizador.newEtiqueta();
        var salida = [];
        salida.push(l);
        //sentecias falsas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaF), exp.column, exp.fila);
        this.control.cuerpo(CuerpoF, ciclo);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        //sentencias verdaderas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpoV, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    };
    IF2.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            throw this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    return IF2;
}());
exports.default = IF2;
//# sourceMappingURL=if2.js.map