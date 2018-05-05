import Casteo from "./casteo";
import nodoOperacion from "./nodoOperacion"
import Analizador from '../../analizador';
export default class Comparacion extends Casteo {
    private op: string;
    constructor(arg0: nodoOperacion, arg1: nodoOperacion, analizador: Analizador, op: string) {
        super(arg0, arg1, analizador);
        this.op = op;
    }



    caracterCaracter(): nodoOperacion {
        return this.agregaretiqueta();
    }
    numberNumber(): nodoOperacion {
        return this.agregaretiqueta();
    }
    doubleDouble() {
        return this.agregaretiqueta();
    }
    evaluarObjeto(): nodoOperacion {

        return this.agregaretiqueta();
    }
    stringString(): nodoOperacion {

        return this.igualString();
    }

    igualString() {
        let c = this.arg0.column;
        let f = this.arg0.fila;

        if (this.arg0.simbolo != null) {
            if (this.arg0.tipo == this.analizador.CARACTER && this.arg0.simbolo.tam == 1) {
                this.referenciaDelArregloNuevInicio(this.arg0.valor, c, f);
                this.arg0.tipo = this.analizador.STRING;
            }
        }

        if (this.arg1.simbolo != null) {
            if (this.arg1.tipo == this.analizador.CARACTER && this.arg1.simbolo.tam == 1) {
                this.referenciaDelArregloNuevInicio(this.arg1.valor, c, f);
                this.arg1.tipo = this.analizador.STRING;
            }
        }

        if (this.arg0.tipo == this.analizador.STRING)
            this.arg0.valor = this.sumarTodosLosCaracteresDe(this.arg0.valor, c, f);
        if (this.arg1.tipo == this.analizador.STRING)
            this.arg1.valor = this.sumarTodosLosCaracteresDe(this.arg1.valor, c, f);
        return this.agregaretiqueta();
    }

    referenciaDelArregloNuevInicio(referencia: string, column: number, linea: number) {
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", referencia, "2", referencia), column, linea
        );
    }
    sumarTodosLosCaracteresDe(referencia: string, column: number, linea: number) {
        let start = this.analizador.newEtiqueta();
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let salida = this.analizador.newTemporal();
        let val0 = this.analizador.newTemporal();
        //la salida va a ser igual a 0
        this.analizador.agregarCodigo(this.analizador.asignar("0", salida), column, linea);
        //agregar etiquetas verdaderas
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(start), column, linea);
        //obtener los valores de cada caracter
        this.analizador.agregarCodigo(this.analizador.getEnHeap(referencia, val0),
            column, linea
        );
        //mientras no sea nulo sumar
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("!=", val0, this.analizador.NULL, lv), column, linea
        );
        //entonces si es nulo saltar a la etiqueta falsa
        this.analizador.agregarCodigo(
            this.analizador.genSalto(lf), column, linea
        );
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lv), column, linea);
        //sumar salida
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", salida, val0, salida), column, linea
        );
        //pasarse al siguiente valor de la referenecia
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", referencia, "1", referencia), column, linea
        );
        //regresar para sacar caracter
        this.analizador.agregarCodigo(
            this.analizador.genSalto(start), column, linea
        );
        //etiqueta falsa
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(lf), column, linea);
        return salida;
    }
    /**
     * funciona para las operaciones xor que se deba subir un atributo
    */
    agregaretiqueta(): nodoOperacion {
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta()
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(
            this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, lv), c, f
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(lf), c, f
        );
        let xor = this.analizador.opBool(this.op) + ", " + this.arg0.valor + ", " + this.arg1.valor
        let n = new nodoOperacion(xor, this.analizador.BOOLEANO, c, f);
        n.addEtiquetaV(lv);
        n.addEtiquetaF(lf);
        return n;
    }
}