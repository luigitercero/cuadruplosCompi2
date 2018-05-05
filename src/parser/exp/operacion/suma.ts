import Casteo from "./casteo";
import nodoOperacion from "./nodoOperacion"
import Analizador from '../../analizador';
export default class Suma extends Casteo {
    private op: string;
    constructor(analizador: Analizador, op: string) {
        let arg0: nodoOperacion = new nodoOperacion("35174492", "35174492", 0, 0);
        let arg1: nodoOperacion = new nodoOperacion("35174492", "35174492", 0, 0);
        super(arg0, arg1, analizador);
        this.op = op;
    }
    setArg0(nodo: nodoOperacion) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg0 =
                this.castearBoleano(nodo, this.analizador.INT);
        } else {
            this.arg0 = nodo;
        }
    }
    setArg1(nodo: nodoOperacion) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg1 =
                this.castearBoleano(nodo, this.analizador.INT);
        } else {
            this.arg1 = nodo;
        }
    }
    caracterCaracter(): nodoOperacion {
        let t = this.analizador.newTemporal();
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion(t, this.analizador.CARACTER, c, f);
    }
    numberNumber(): nodoOperacion {
        let t = this.analizador.newTemporal();
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion(t, this.analizador.INT, c, f);
    }
    booleaBolean(): nodoOperacion {
        return this.numberNumber();
    }
    numberBolean(): nodoOperacion {
        this.arg1 = this.castearBoleano(this.arg1, this.analizador.INT);
        return this.numberNumber();
    }
    boleanNumber(): nodoOperacion {
        this.arg0 = this.castearBoleano(this.arg0, this.analizador.INT);
        return this.numberNumber();
    }
    boleanCaracter(): nodoOperacion {
        this.arg0 = this.castearBoleano(this.arg0, this.analizador.CARACTER);
        return this.caracterCaracter();
    }
    caracterBolean(): nodoOperacion {
        this.arg1 = this.castearBoleano(this.arg1, this.analizador.CARACTER);
        return this.caracterCaracter();
    }
    castearBoleano(arg0: nodoOperacion, tipo: string) {
        let t0 = this.analizador.newTemporal();
        let es = this.analizador.newEtiqueta();
        /*para etiqueta verdadera */
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaV), arg0.column, arg0.fila)
        this.analizador.agregarCodigo(this.analizador.asignar("1", t0), arg0.column, arg0.fila)
        this.analizador.agregarCodigo(this.analizador.genSalto(es), arg0.column, arg0.fila)
        /*para etiqueta falsa */
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaF), arg0.column, arg0.fila)
        this.analizador.agregarCodigo(this.analizador.asignar("0", t0), arg0.column, arg0.fila);
        let am: string[] = new Array();
        am.push(es);
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(am), arg0.column, arg0.fila);
        return new nodoOperacion(t0, tipo, arg0.column, arg0.fila);
    }

    doubleDouble(): nodoOperacion {
        let t = this.analizador.newTemporal();
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion(t, this.analizador.DOUBLE, c, f);
    }
    booleanDouble(): nodoOperacion {
        this.arg0 = this.castearBoleano(this.arg0, this.analizador.DOUBLE);
        return this.caracterCaracter();
    }
    doubleBoolean(): nodoOperacion {
        this.arg1 = this.castearBoleano(this.arg1, this.analizador.DOUBLE);
        return this.caracterCaracter();
    }
}