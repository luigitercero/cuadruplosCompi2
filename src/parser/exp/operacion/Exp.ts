import Operacion from "./operacion";
import Nodo from "../../nodo";
import Dir from '../../variable/obtenerDireccion'
import nodoOperacion from "./nodoOperacion";
import Suma from "./suma";
import Location from "../../location";

export default class Exp extends Operacion {

    evaluarTipo(valorTipo: string, simboloTipo: string): boolean {
        if (simboloTipo == this.analizador.DOUBLE) {
            return this.evaluarDouble(valorTipo);
        }
        else if (simboloTipo == this.analizador.INT) {
            return this.evaluarnumber(valorTipo);
        } else if (simboloTipo == this.analizador.CARACTER) {
            return this.evaluarCaracter(valorTipo);
        } else {
            return simboloTipo == valorTipo;
        }
    }

    private evaluarDouble(valorTipo: string): boolean {
        if (valorTipo == this.analizador.DOUBLE) {
            return true;
        } else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        } else if (valorTipo == this.analizador.INT) {
            return true;
        } else if (valorTipo == this.analizador.CARACTER) {
            return true;
        } else {

            return false;
        }
    }

    private evaluarnumber(valorTipo: string): boolean {
        if (valorTipo == this.analizador.DOUBLE) {
            return false;
        } else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        } else if (valorTipo == this.analizador.INT) {
            return true;
        } else if (valorTipo == this.analizador.CARACTER) {
            return true;
        } else {
            return false;
        }
    }

    private evaluarCaracter(valorTipo: string): boolean {
        if (valorTipo == this.analizador.DOUBLE) {
            return false;
        } else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        } else if (valorTipo == this.analizador.INT) {
            return true;
        } else if (valorTipo == this.analizador.CARACTER) {
            return true;
        } else {
            return false;
        }
    }

    evaluarPP(variable: Dir, signo: string) {
        let arg1: nodoOperacion = new nodoOperacion(1 + "", this.analizador.INT, variable.location.last_column, variable.location.first_line);
        let arg0: nodoOperacion = this.analizador.variable.gerVal(variable);
        let op: Suma = new Suma(this.analizador, signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    }

    masIgual(nodo: Nodo, variable: Dir, signo: string) {
        let arg1: nodoOperacion = this.analizar(nodo);
        let arg0: nodoOperacion = this.analizador.variable.gerVal(variable);
        let op: Suma = new Suma(this.analizador, signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    }

    crearArregloString(arreglo: nodoOperacion): string {
        let valor = this.analizador.newTemporal();
        let inicia = this.analizador.newTemporal();
        this.escribir(this.analizador.genComentario("creando un arreglo apartir de un string"), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.genComentario("en " + valor + " es la posicion donde apunta el arreglo"), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.asignar("heap", valor), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.genOperacion("+", valor, "2", inicia), arreglo.column, arreglo.fila);
        let contador = this.analizador.variable.asignarCadenaAArreglo2daPArte(inicia, arreglo);
        this.escribir(this.analizador.saveEnHeap(valor, contador), arreglo.column, arreglo.fila);
        let tam = this.analizador.newTemporal();
        this.escribir(this.analizador.genOperacion("+", valor, "1", tam), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.saveEnHeap(tam, contador), arreglo.column, arreglo.fila);
        let posNueva = this.analizador.newTemporal();
        this.escribir(this.analizador.genComentario("desplazando lo necesario"), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.genOperacion("+", contador, "2", posNueva), arreglo.column, arreglo.fila);
        this.escribir(this.analizador.genOperacion("+", "heap", posNueva, "heap"), arreglo.column, arreglo.fila);
        return valor;
    }

    private escribir(salida: string, last_column: number, first_line: number) {
        this.analizador.agregarCodigo(
            salida, last_column, first_line
        );
    }

}

