
import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';


export default class IF2 {
    private control: Control
    constructor(control: Control) {
        this.control = control;
    }

    if2(nodo: Nodo, ciclo: Salida) {
        let exp: nodoOperacion = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        this.errorIf(exp);
        let cuerpoV = nodo.childNode[3];
        let CuerpoF = nodo.childNode[5];
        let l = this.control.analizador.newEtiqueta();
        let salida = [];
        salida.push(l);
        //sentecias falsas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(
            this.control.analizador.escribirEtiqueta(exp.etiquetaF),
            exp.column, exp.fila);
        this.control.cuerpo(CuerpoF, ciclo);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        //sentencias verdaderas
        this.control.analizador.claseA.tabla.aumetarAbmito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(exp.etiquetaV), exp.column, exp.fila);
        this.control.cuerpo(cuerpoV, ciclo);
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(l), exp.column, exp.fila);
        this.control.analizador.claseA.tabla.disminuirAmbito();
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(salida), exp.column, exp.fila)
    }

    private errorIf(exp: nodoOperacion) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {

        } else {
            throw this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    }
}