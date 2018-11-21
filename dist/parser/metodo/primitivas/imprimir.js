"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Imprimir = /** @class */ (function () {
    function Imprimir(analizador) {
        this.analizador = analizador;
    }
    Imprimir.prototype.imprimir = function (parametro) {
        var imprimir = "imprimir ( ";
        if (parametro.length < 2) {
            switch (parametro[0].tipo) {
                case this.analizador.INT:
                    this.imprimirNumero(parametro[0]);
                    break;
                case this.analizador.CARACTER:
                    if (parametro[0].simbolo == null) {
                        this.imprimirCaracter(parametro[0]);
                    }
                    else if (parametro[0].getTam() < 1) {
                        this.imprimirCaracter(parametro[0]);
                    }
                    else if (parametro[0].getTam() == 1) {
                        this.imprimirString(parametro[0], 2);
                    }
                    break;
                case this.analizador.STRING:
                    this.imprimirString(parametro[0]);
                    break;
                case this.analizador.DOUBLE:
                    this.imprimirF(parametro[0]);
                    break;
                default:
                    this.imprimirNumero(parametro[0]);
            }
        }
        else {
            this.analizador.newError("error elegir parametros", parametro[1].fila, parametro[1].column);
        }
    };
    Imprimir.prototype.imprimirF = function (arreglo) {
        this.analizador.agregarCodigo("print ( \"%f\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila);
    };
    Imprimir.prototype.imprimirNumero = function (arreglo) {
        this.analizador.agregarCodigo("print ( \"%d\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila);
    };
    Imprimir.prototype.imprimirCaracter = function (arreglo) {
        this.analizador.agregarCodigo("print ( \"%c\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila);
    };
    Imprimir.prototype.imprimirString = function (arreglo, poss) {
        var t1 = this.analizador.newTemporal();
        var lv = this.analizador.newEtiqueta();
        var lf = this.analizador.newEtiqueta();
        var ls = this.analizador.newEtiqueta();
        if (poss != undefined) {
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", arreglo.valor, poss + "", arreglo.valor), arreglo.column, arreglo.fila);
        }
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(ls), arreglo.column, arreglo.fila);
        /*obtener valor de la variable */
        this.analizador.agregarCodigo(this.analizador.getEnHeap(arreglo.valor, t1), arreglo.column, arreglo.fila);
        /**escribiendo if papara seber si es nulo */
        this.analizador.agregarCodigo(this.analizador.genOperacion("!=", t1, this.analizador.NULL, lv), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo(this.analizador.genSalto(lf), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lv), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo("print ( \"%c\" ," + t1 + ");", arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", arreglo.valor, 1 + "", arreglo.valor), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo(this.analizador.genSalto(ls), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila);
        this.analizador.agregarCodigo("print ( \"%c\" ," + this.analizador.NULL + ");", arreglo.column, arreglo.fila);
    };
    return Imprimir;
}());
exports.default = Imprimir;
//# sourceMappingURL=imprimir.js.map