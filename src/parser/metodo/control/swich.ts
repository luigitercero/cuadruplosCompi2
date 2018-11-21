import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';
import Comparacion from '../../exp/operacion/comparacion';
import cuerpo from '../cuerpo';


export default class SWICH {
    private control: Control
    constructor(control: Control) {
        this.control = control;
    }
    /*
Switch 
   : SWITCH   Expresion '{' CuerpoSwitch Default 
   ;
*/
    swich(nodo: Nodo, ciclo: Salida) {
        this.control.analizador.claseA.tabla.aumetarAbmito();
        let exp: nodoOperacion = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);

        let cuerpoSwitch = nodo.childNode[3];
        let defau = nodo.childNode[4];
        this.cuerswich(cuerpoSwitch, exp, ciclo);

        this.deft(defau, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
            ciclo.etiquetaS), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line
        );
        this.control.analizador.claseA.tabla.disminuirAmbito();
    }

    private errorIf(exp: nodoOperacion) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {

        } else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    }
    /**
     *Default
     *: DEFAULT ':' Cuerpo1 '}'
     *| '}'
     *;
    */
    private deft(nodo: Nodo, ciclo: Salida) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "DEFAULT":

                this.control.cuerpo1(nodo.childNode[2], ciclo);
            case "'}'":
        }
    }

    /**
     * CuerpoSwitch
     *: CuerpoSwitch Caso
     *| Caso
     *;
    */
    private cuerswich(nodo: Nodo, val: nodoOperacion, ciclo: Salida) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "CuerpoSwitch":
                this.cuerswich(nodo.childNode[0], val, ciclo);
                this.caso(nodo.childNode[1], val, ciclo);
                return val;
            case "Caso":
                this.caso(nodo.childNode[0], val, ciclo);
        }
    }

    /**
     * Caso
     *: CASE e ':' Cuerpo1
     *: CASE e ':'
     *;
    */
    private caso(nodo: Nodo, val: nodoOperacion, ciclo: Salida) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "CASE":
                let exp = this.control.analizador.exp.analizar(nodo.childNode[1]);
                if (nodo.childNode.length > 3)
                    this.resolverCaso(val, exp, nodo.childNode[3], ciclo);
                return val;
            default:
                this.control.analizador.newError("error en los case",
                    nodo.childNode[0].location.first_line,
                    nodo.childNode[0].location.last_column);
                break;
        }
    }

    private resolverCaso(arg0: nodoOperacion, arg1: nodoOperacion, nodo: Nodo, ciclo: Salida) {
        let op: Comparacion = new Comparacion(arg0, arg1, this.control.analizador, "==");
        let val = op.evaluar();
        this.ifSimple(val, nodo, ciclo);

    }

    private ifSimple(exp: nodoOperacion, cuerpo: Nodo, ciclo: Salida) {
        this.errorIf(exp);
        let l = this.control.analizador.newEtiqueta();
        let salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV),
            exp.column, exp.fila);
        this.control.cuerpo1(cuerpo, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaF),
            exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    }
}