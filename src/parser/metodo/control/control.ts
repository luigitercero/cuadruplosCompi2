import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import IF1 from './if1'
import IF2 from './if2';
import IF3 from './if3';
import SWICH from './swich';
import RM from './repetirMientras'
import HACER from './hacer'
import REPETIR from './hacer'
import LOOP from './loop';
import CONTADOR from './contador';
import DCONDICION from './doble';
import FOR from './for';
export default class control {
    public analizador: Analizador;
    private if1: IF1;
    private if2: IF2;
    private if3: IF3;
    private suitch: SWICH
    private rm: RM;
    private hacer: HACER;
    private repetir: REPETIR
    private loop: LOOP
    private contador: CONTADOR;
    private doble: DCONDICION;
    private For: FOR;
    constructor(analizador: Analizador) {
        this.analizador = analizador;
        this.if1 = new IF1(this);
        this.if2 = new IF2(this);
        this.if3 = new IF3(this);
        this.rm = new RM(this);
        this.suitch = new SWICH(this);
        this.hacer = new HACER(this);
        this.repetir = new REPETIR(this);
        this.loop = new LOOP(this);
        this.contador = new CONTADOR(this);
        this.For = new FOR(this);
        this.doble = new DCONDICION(this);

    }

    control(nodo: Nodo, ciclo: Salida) {
        let term = nodo.childNode[0].term;
        let nuevoCiclo;
        switch (term) {
            case "If1":
                this.if1.if1(nodo.childNode[0], ciclo);
                return ciclo;
            case "If2":
                this.if2.if2(nodo.childNode[0], ciclo);
                return ciclo;
            case "If3":
                this.if3.if3(nodo.childNode[0], ciclo);
                return ciclo;
            case "Switch":
                nuevoCiclo = new Salida(true)
                this.suitch.swich(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "While":
                nuevoCiclo = new Salida(true)
                this.rm.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Do_While":
                nuevoCiclo = new Salida(true)
                this.hacer.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Repeat_Until":
                nuevoCiclo = new Salida(true)
                this.repetir.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "For":
                nuevoCiclo = new Salida(true)
                this.For.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Loop":
                nuevoCiclo = new Salida(true)
                this.loop.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Count":
                nuevoCiclo = new Salida(true)
                this.contador.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Doble_Condicion":
                nuevoCiclo = new Salida(true)
                this.doble.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Repetir":
                nuevoCiclo = new Salida(true)
                this.rm.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
        }
        throw this.analizador.newError("hay que agregar algo:", 0, 0);
    }
    private concatenarEtiqueta(et: Salida, ciclo: Salida) {
        ciclo.addEtiquetaRR(et.etiquetaR);

    }
    /**
     *  If1
     *:IF Expresion ESVERDADERO  Cuerpo  ESFALSO Cuerpo FINSI
     *;
     * @param nodo 
     */


    /**
     *  Cuerpo: '{'Cuerpo1 '}'
     *  | '{' '}'
     *  ;
     */
    cuerpo(nodo: Nodo, ciclo: Salida) {
        let term = nodo.childNode[1].term;
        switch (term) {
            case "Cuerpo1":
                this.cuerpo1(nodo.childNode[1], ciclo);
                break;
            default:
                return ciclo;
        }
        return ciclo
    }
    /**  Cuerpo1
    *  :Cuerpo1 CuerpoMetodo
    *  |CuerpoMetodo
    * 
    */
    cuerpo1(nodo: Nodo, ciclo: Salida) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "cuerpo1":
                this.cuerpo1(nodo.childNode[0], ciclo);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], ciclo);
                return false;
            case "Cuerpo1":
                this.cuerpo1(nodo.childNode[0], ciclo);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], ciclo);
                return false;
            case "CuerpoMetodo":
                return this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[0], ciclo);
        }
        throw this.analizador.newError("error en el cuerpo", 0, 0);
    }

}