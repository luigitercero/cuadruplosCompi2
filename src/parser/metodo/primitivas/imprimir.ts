import Analizador from '../../analizador';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
export default class Imprimir {

    private analizador: Analizador;
    constructor(analizador: Analizador) {
        this.analizador = analizador
    }

    imprimir(parametro: nodoOperacion[]) {
        let imprimir = "imprimir ( ";
        if (parametro.length < 2) {
            switch (parametro[0].tipo) {
                case this.analizador.INT:
                    this.imprimirNumero(parametro[0]);
                    break;
                case this.analizador.CARACTER:
                    this.imprimirCaracter(parametro[0]);

                    break;
                case this.analizador.STRING:
                    this.imprimirString(parametro[0]);
                    break;
                case this.analizador.DOUBLE:
                    this.imprimirF(parametro[0]);
                    break;
            }

        } else {
            this.analizador.newError("error elegir parametros", parametro[1].fila, parametro[1].column, );
        }

    }
    private imprimirF(arreglo: nodoOperacion) {
        this.analizador.agregarCodigo(
            "print ( \"%f\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila
        );
    }
    private imprimirNumero(arreglo: nodoOperacion) {
        this.analizador.agregarCodigo(
            "print ( \"%d\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila
        );
    }
    private imprimirCaracter(arreglo: nodoOperacion) {
        this.analizador.agregarCodigo(
            "print ( \"%c\" ," + arreglo.valor + ");", arreglo.column, arreglo.fila
        );
    }
    private imprimirString(arreglo: nodoOperacion) {
        let t1 = this.analizador.newTemporal();
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let ls = this.analizador.newEtiqueta();

        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(ls), arreglo.column, arreglo.fila
        );
        /*obtener valor de la variable */
        this.analizador.agregarCodigo(
            this.analizador.getEnHeap(arreglo.valor, t1), arreglo.column, arreglo.fila
        );
        /**escribiendo if papara seber si es nulo */
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("!=", t1, this.analizador.NULL, lv), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(lf), arreglo.column, arreglo.fila
        );

        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lv), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(

            "print ( \"%c\" ," + t1 + ");", arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(

            this.analizador.genOperacion("+", arreglo.valor, 1 + "", arreglo.valor), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(ls), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            "print ( \"%c\" ," + this.analizador.NULL + ");", arreglo.column, arreglo.fila
        );
    }
}