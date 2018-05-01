import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import IF1 from './if1'
import IF2 from './if2';
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
    private if1:IF1;
    private if2:IF2;
    private suitch:SWICH
    private rm:RM;
    private hacer:HACER;
    private repetir:REPETIR
    private loop:LOOP
    private contador:CONTADOR;
    private doble:DCONDICION;
    private For:FOR;
    constructor(analizador:Analizador) {
        this.analizador = analizador;
        this.if1 = new IF1(this);
        this.if2 = new IF2(this);
        this.if2 = new IF2(this);
        this.rm = new RM(this);
        this.suitch = new SWICH(this);
        this.hacer = new HACER(this);
        this.repetir = new REPETIR(this);
        this.loop = new LOOP(this);
        this.contador = new CONTADOR(this);
        this.For = new FOR(this);
        this.doble= new DCONDICION(this);
        
    }

    control (nodo:Nodo,ciclo:Salida) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "If1":
            this.if1.if1(nodo.childNode[0],ciclo);
            return ciclo;
            case "If2":
            this.if2.if2(nodo.childNode[0],ciclo);
            return ciclo;
            case "Switch":
            this.suitch.swich(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "While":
            this.rm.ejecutar(nodo.childNode[0],new Salida(true))
            return ciclo;
            case "Do_While":
            this.hacer.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "Repeat_Until":
            this.repetir.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "For":
            this.For.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "Loop":
            this.loop.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "Count":
            this.contador.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "Doble_Condicion":
            this.doble.ejecutar(nodo.childNode[0],new Salida(true));
            return ciclo;
            case "Repetir":
            this.rm.ejecutar(nodo.childNode[0],new Salida(true))
            return ciclo;
        }
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
    cuerpo(nodo:Nodo,ciclo:Salida) {
        let term = nodo.childNode[1].term;
        switch (term) {
            case "Cuerpo1":
            this.cuerpo1(nodo.childNode[1],ciclo);
            break;
            default:
            return ciclo;
        }
    }
     /**  Cuerpo1
     *  :Cuerpo1 CuerpoMetodo
     *  |CuerpoMetodo
     * 
     */
  cuerpo1(nodo:Nodo,ciclo:Salida) {
        let term  = nodo.childNode[0].term;
        switch (term) {
            case "cuerpo1":
            this.cuerpo1(nodo.childNode[0],ciclo);
            this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1],ciclo);
            return false;
            case "Cuerpo1":
            this.cuerpo1(nodo.childNode[0],ciclo);
            this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1],ciclo);
            return false;
            case "CuerpoMetodo":
            return this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[0],ciclo);
        }
        throw this.analizador.newError("error en el cuerpo",0,0);
    }

}