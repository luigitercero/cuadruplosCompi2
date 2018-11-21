import Suma from './suma'
import Analizador from '../../analizador';
import nodoOperacion from './nodoOperacion';
import Casteo from './casteo';
import Si from '../../sigenerico'
import SIGENERICO from '../../sigenerico';
export default class Eleva extends Casteo {
    private op: string;
    constructor(analizador: Analizador) {
        let arg0: nodoOperacion = new nodoOperacion("35174492", "35174492", 0, 0);
        let arg1: nodoOperacion = new nodoOperacion("35174492", "35174492", 0, 0);
        super(arg0, arg1, analizador);
        this.op = "^";
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
    numberNumber(): nodoOperacion {

        let c = this.arg0.column;
        let f = this.arg0.fila;
        return this.elevar();
    }



    doubleDouble(): nodoOperacion {
        let c = this.arg0.column;
        let f = this.arg0.fila;
        return this.elevar();
    }

    elevar() {
        let si: SIGENERICO = new SIGENERICO(this.analizador, this.arg0.column, this.arg0.fila);
        let t0 = this.analizador.newTemporal();
        let t1 = this.analizador.newTemporal();
        let comentario = this.analizador.genComentario("inicia elevacion")
        this.analizador.agregarCodigo(
            this.analizador.asignar("0", t0) + comentario, this.arg0.column, this.arg0.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.asignar("1", t1), this.arg0.column, this.arg0.fila
        );
        si.escribirEtiquetaS()
        si.genSi("<", t0, this.arg1.valor);
        si.genSaltoFalso();
        si.escribirEtiquetaV();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("*", t1, this.arg0.valor, t1), this.arg0.column, this.arg0.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", t0, "1", t0), this.arg0.column, this.arg0.fila
        );
        si.escribirSaltoS()
        si.escribirEtiquetaF();
        comentario = this.analizador.genComentario("fin de elevacion")
        this.analizador.agregarCodigo(
            comentario, this.arg0.column, this.arg0.fila
        );

        return new nodoOperacion(t1, this.arg0.tipo, this.arg0.column, this.arg0.fila)
    }
}