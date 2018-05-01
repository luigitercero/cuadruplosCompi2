import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';
import Comparacion from '../../exp/operacion/comparacion';
import cuerpo from '../cuerpo';
import Location from '../../location';
import Simbolo from '../../tablaSimbolos/simbolo';


export default class FOR {
    private control: Control
    constructor(control: Control) {
        this.control = control;
    }
    /**
     *For:FOR '('VARIABLE':' ID ';' DESDE ':' e ';' HASTA ':' e ')' Cuerpo
     *;
     * @param nodo 
     * @param ciclo 
     */
    ejecutar(nodo: Nodo, ciclo: Salida) {
        /*se aumenta el ambito */
        this.control.analizador.claseA.tabla.aumetarAbmito();
        /*creo etiqueta start */
        let start = this.control.analizador.newEtiqueta();
        /*etiqueta incio*/
        ciclo.start.push(start);
        /*saltos al cuerpo */
        let ejecucion = []; ejecucion.push(this.control.analizador.newEtiqueta());
        /*nombrede la nueva vaiable que se crea */
        let ID = nodo.childNode[4].token;
        /*este el modo del cuerpo */
        let cuerpo = nodo.childNode[14];
        /*agregar variable a la tabla de simbolos */
        this.control.analizador.claseA.tabla.agregarSimboloApila(new Simbolo(ID, "", this.control.analizador.INT));
        /*obtengo la direccion de la variable del contador */
        let dirID = this.control.analizador.variable.obtenerDirVariable(ID, nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
        dirID.addLocation(nodo.childNode[0].location);

        /**se evaluan los dos argumentos para determinas si se va a sumar o restar */
        let arg0 = this.control.analizador.exp.analizar(nodo.childNode[8]);
        let arg1 = this.control.analizador.exp.analizar(nodo.childNode[12]);
        /**agrego el argumento 0 a la variable contador ahi inicia */
        this.control.analizador.agregarCodigo(
            this.control.analizador.saveEnPila(
                dirID.dir, arg0.valor),
            nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*se escribe la etiqueta start*/
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        /*se obtiene el valor del contador*/
        arg0 = this.control.analizador.variable.gerVal(dirID);
        /*si es igual debe salir del control */
        let igual = this.igual(arg0, arg1);
        ciclo.addEtiquetaSS(igual.etiquetaV);
        this.escribirEtiqueta(igual.etiquetaF, nodo.childNode[0].location);
        /*si es mayor debe disminuir */
        let mayor = this.mayorque(arg0, arg1);
        this.escribirEtiqueta(mayor.etiquetaF, nodo.childNode[0].location);
        /*si es menor debe sumar */
        let menor = this.menorque(arg0, arg1);//ciclo.addEtiquetaSS(mayor.etiquetaF);ciclo.addEtiquetaSS(menor.etiquetaF)
        /*etiqetas verdaderas si es menor */
        this.escribirEtiqueta(mayor.etiquetaV, nodo.childNode[0].location);
        let valorN = this.control.analizador
            .exp.evaluarPP(dirID, "-");
        /*guardar el nuevo valor al contador contador -1 */
        this.control.analizador.agregarCodigo(
            this.control.analizador.saveEnPila(
                dirID.dir, valorN.valor),
            nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*saltar a la ejecucion del cuerpo */
        this.control.analizador.agregarCodigo(
            this.control.analizador.genSalto(ejecucion[0]), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line
        );
        /*escribe etiquetas verdaderas se es menor*/
        this.escribirEtiqueta(menor.etiquetaV, nodo.childNode[0].location);
        valorN = this.control.analizador
            .exp.evaluarPP(dirID, "+");
        /*guardar el nuevo valor al contador contador +1 */
        this.control.analizador.agregarCodigo(
            this.control.analizador.saveEnPila(
                dirID.dir, valorN.valor),
            nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);

        /*saltar a la ejecucion del cuerpo */
        this.control.analizador.agregarCodigo(
            this.control.analizador.genSalto(ejecucion[0]), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line
        );
        /**escribe la etiqueta de ejecucion */
        this.escribirEtiqueta(ejecucion, nodo.childNode[0].location);
        /**ejecuta el cuerpo */
        this.control.cuerpo(cuerpo, ciclo);
        /**regresa a start */
        this.escribirSaltoStart(ciclo, nodo.childNode[0].location);
        /**sale de start */
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    }
    private escribirEtiqueta(etiqueta: string[], location: Location) {
        if (etiqueta.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
                etiqueta), location.last_column, location.first_line
            );
        }
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
    private igual(arg0: nodoOperacion, arg1: nodoOperacion) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            let a: Comparacion = new Comparacion(arg0, arg1, this.control.analizador, "==");
            return a.evaluar();
        } else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    }
    private mayorque(arg0: nodoOperacion, arg1: nodoOperacion) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            let a: Comparacion = new Comparacion(arg0, arg1, this.control.analizador, ">");
            return a.evaluar();
        } else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    }
    private menorque(arg0: nodoOperacion, arg1: nodoOperacion) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            let a: Comparacion = new Comparacion(arg0, arg1, this.control.analizador, "<");
            return a.evaluar();
        } else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    }
}