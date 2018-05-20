import Analizador from '../../analizador';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Simbolo from '../../tablaSimbolos/simbolo';
export default class Concatenear {

    private analizador: Analizador;
    constructor(analizador: Analizador) {
        this.analizador = analizador
    }

    ejecutar(parametro: nodoOperacion[]) {

        if (parametro.length < 3) {
            switch (parametro[0].tipo) {
                case this.analizador.INT:

                    break;
                case this.analizador.CARACTER:
                    if (parametro[0].simbolo == null) {

                    } else if (parametro[0].simbolo.tam < 1) {

                    } else if (parametro[0].simbolo.tam == 1) {
                        this.concatenar(parametro[0], parametro[1]);
                    }
                    break;
                case this.analizador.STRING:
                    //this.imprimirString(parametro[0]);
                    break;
                case this.analizador.DOUBLE:
                    //this.imprimirF(parametro[0]);
                    break;
            }

        } else {
            if (parametro.length == 3) {
                if (parametro[0].simbolo.tam == 1) {
                    this.concatenar(parametro[0], parametro[1]);
                }
            } else {
                throw this.analizador.newError("error elegir parametros", parametro[1].fila, parametro[1].column, );
            }


        }
    }


    private concatenar(arreglo0: nodoOperacion, arreglo: nodoOperacion) {
        let t1 = this.analizador.newTemporal();
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let ls = this.analizador.newEtiqueta();
        let temp = arreglo.valor
        let inicia = this.recorrer(arreglo0);
        if (arreglo.simbolo.getNombre() != "") {
            temp = this.gurdarTempol(arreglo);
        }

        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(ls), arreglo.column, arreglo.fila
        );
        /*obtener valor de la variable */
        this.analizador.agregarCodigo(
            this.analizador.getEnHeap(temp, t1), arreglo.column, arreglo.fila
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
            this.analizador.saveEnHeap(inicia, t1), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", temp, 1 + "", temp), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", inicia, 1 + "", inicia), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(ls), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap(inicia, this.analizador.NULL), arreglo.column, arreglo.fila
        );
        return t1;


    }


    /**
     * reccorre hasta que sea nula 
     * @param arreglo0 variable en donde se va a guardar la concatenacions
     */
    private recorrer(arreglo: nodoOperacion) {
        let t1 = this.analizador.newTemporal();

        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let ls = this.analizador.newEtiqueta();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", arreglo.valor, 2 + "", arreglo.valor), arreglo.column, arreglo.fila
        );


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
            this.analizador.genOperacion("+", arreglo.valor, 1 + "", arreglo.valor), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(ls), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila
        );
        return arreglo.valor;
    }


    /**
 * reccorre hasta que sea nula 
 * @param arreglo0 variable en donde se va a guardar la concatenacions
 */
    private gurdarTempol(arreglo: nodoOperacion) {
        let t1 = this.analizador.newTemporal();
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let ls = this.analizador.newEtiqueta();
        let temp = this.analizador.newTemporal();
        this.analizador.agregarCodigo(
            this.analizador.asignar("heap", temp), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", arreglo.valor, 2 + "", arreglo.valor), arreglo.column, arreglo.fila
        );

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
            this.analizador.genOperacion("+", arreglo.valor, 1 + "", arreglo.valor), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap("heap", t1), arreglo.column, arreglo.fila
        );

        this.analizador.agregarCodigo(
            this.analizador.siguiLibreHeap(), arreglo.column, arreglo.fila
        );

        this.analizador.agregarCodigo(
            this.analizador.genSalto(ls), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap("heap", this.analizador.NULL), arreglo.column, arreglo.fila
        );

        this.analizador.agregarCodigo(
            this.analizador.siguiLibreHeap(), arreglo.column, arreglo.fila
        );

        return temp;
    }
}