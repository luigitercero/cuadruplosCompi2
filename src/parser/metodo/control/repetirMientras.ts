import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';
import Comparacion from '../../exp/operacion/comparacion';
import cuerpo from '../cuerpo';
import Location from '../../location';


export default class RM {
    private control: Control
    constructor(control: Control) {
        this.control = control;
    }
    /**
     * Repetir
     *:REPETIR_MIENTRAS Expresion  Cuerpo
     *;
     * @param nodo 
     * @param ciclo 
     */
    ejecutar(nodo: Nodo, ciclo: Salida) {
        this.control.analizador.claseA.tabla.aumetarAbmito();
        let start = this.control.analizador.newEtiqueta();
        let cuerpo = nodo.childNode[2];
        ciclo.start.push(start);
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        let exp: nodoOperacion = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        ciclo.addEtiquetaSS(exp.etiquetaF);
        this.ifSimple(exp, cuerpo, ciclo);
        this.escribirSaltoStart(ciclo, nodo.childNode[0].location);
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    }

    private escribirEtiquetaSalida(ciclo: Salida, location: Location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
                ciclo.etiquetaS), location.last_column, location.first_line
            );
        }
    }

    private escribirEtiquetaStart(ciclo: Salida, location: Location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
                ciclo.start), location.last_column, location.first_line
            );
        }
    }

    private escribirSaltoStart(ciclo: Salida, location: Location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(
                ciclo.start[0]), location.last_column, location.first_line
            );
        }
    }

    private errorIf(exp: nodoOperacion) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {

        } else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    }

    private ifSimple(exp: nodoOperacion, cuerpo: Nodo, ciclo: Salida) {
        this.errorIf(exp);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV),
            exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
    }
}