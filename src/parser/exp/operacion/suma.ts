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
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
        } else {
            this.arg0 = nodo;
        }
    }
    setArg1(nodo: nodoOperacion) {
        if (nodo.tipo == this.analizador.BOOLEANO) {
            this.arg1 =
                this.analizador.exp.castearBoleano(nodo, this.analizador.INT);
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
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.INT);
        return this.numberNumber();
    }
    boleanNumber(): nodoOperacion {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.INT);
        return this.numberNumber();
    }
    boleanCaracter(): nodoOperacion {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.CARACTER);
        return this.caracterCaracter();
    }
    caracterBolean(): nodoOperacion {
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.CARACTER);
        return this.caracterCaracter();
    }


    doubleDouble(): nodoOperacion {
        let t = this.analizador.newTemporal();
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op, this.arg0.valor, this.arg1.valor, t), c, f);
        return new nodoOperacion(t, this.analizador.DOUBLE, c, f);
    }
    booleanDouble(): nodoOperacion {
        this.arg0 = this.analizador.exp.castearBoleano(this.arg0, this.analizador.DOUBLE);
        return this.caracterCaracter();
    }
    doubleBoolean(): nodoOperacion {
        this.arg1 = this.analizador.exp.castearBoleano(this.arg1, this.analizador.DOUBLE);
        return this.caracterCaracter();
    }
}