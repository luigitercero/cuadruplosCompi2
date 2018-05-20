
import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';


export default class IF3 {
    private control: Control
    constructor(control: Control) {
        this.control = control;
    }

    if3(nodo: Nodo, ciclo: Salida) {
        let exp: nodoOperacion = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        this.errorIf(exp);
        let cuerpoV = nodo.childNode[3];
        let CuerpoF = nodo.childNode[5];
        let l = this.control.analizador.newEtiqueta();
        let salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpoV, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        //sentencias falsas
        this.control.analizador.agregarCodigo(
            this.control.analizador.escribirEtiqueta(exp.etiquetaF),
            exp.column, exp.fila);

        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
    }

    public ifSimple(exp: nodoOperacion, cuerpo: Nodo, ciclo: Salida) {
        this.errorIf(exp);
        let l = this.control.analizador.newEtiqueta();
        let salida = [];
        salida.push(l);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpo, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    }



    private errorIf(exp: nodoOperacion) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {

        } else {
            throw this.control.analizador.newError("existe error al intentar querer hacer el IF ", exp.fila, exp.column);
        }
    }
}