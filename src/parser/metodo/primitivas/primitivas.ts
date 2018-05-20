import Variable from '../../variable/variable';
import Analizador from '../../analizador';
import Asignacion from '../../variable/asignacion'
import Nodo from '../../nodo';

import Control from '../control/control';
import Metodo from '../../tablaSimbolos/metodo';
import Salida from '../control/nodoSalida';
import { error } from 'util';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Imprimir from './imprimir'
import Concatenar from './concatenar'
import Location from '../../location';
import Simbolo from '../../tablaSimbolos/simbolo';
import saludo from '../../../router/saludo';
export default class Primitivas {

    private analizador: Analizador;
    private imprimir: Imprimir
    private concatenar: Concatenar;
    constructor(analizador: Analizador) {
        this.analizador = analizador
        this.imprimir = new Imprimir(analizador);
        this.concatenar = new Concatenar(analizador);
    }
    /**
     * Primitivas
     * :IMPRIMIR
     * |CONCATENAR
     * |CONVERTIRCADENA
     * |CONVERTIRENTERO
     * |CREARPUNTERO
     * |OBTERNERDIRECCION
     * |RESERVAMEMORIA
     * |CONSULTARTAMANIO
     * |TECLADO
     * ;
     */
    analizar(metodo: string, varible: nodoOperacion[], location: Location) {
        switch (metodo) {
            case "IMPRIMIR":
                this.imprimir.imprimir(varible);
                break;
            case "CONCATENAR":
                this.concatenar.ejecutar(varible);
                break;
            case "CONVERTIRCADENA":
            case "CONVERTIRENTERO":
            case "CREARPUNTERO":
            case "OBTERNERDIRECCION":
            case "RESERVAMEMORIA":
            case "CONSULTARTAMANIO":
            case "TECLADO":
                this.TECLADO(metodo, varible, location);
                break;
        }
    }

    public TECLADO(metodo: string, parametoM: nodoOperacion[], location: Location) {
        let tam = this.analizador.claseA.tabla.ptr
        let t1 = this.analizador.newTemporal();
        this.ambitoSimulado(tam + 0, t1, location);
        this.retorno(t1, location);

        this.ambitoSimulado(tam + 2, t1, location);
        this.Salida(parametoM, t1, location);
        this.ambitoSimulado(tam + 1, t1, location);
        this.input(t1, location);
        this.ambitoSimulado(tam + 3, t1, location);
        this.saveTipo(parametoM[1].simbolo);
        this.tipoAPila(t1, this.saveTipo(parametoM[1].simbolo) + "", location);
        this.aumentarAmbito(tam, location);
        this.escribirTeclado(location);
        this.disminuirAmbito(tam, location);

        this.ambitoSimulado(tam + 1, t1, location);
        let t2 = this.analizador.newTemporal();
        // let t3 = this.analizador.newTemporal();
        this.agregarValor(t1, t2, location);
        this.agregarValorAsimbolos(parametoM, t2, location)

    }

    private agregarValorAsimbolos(parametoM: nodoOperacion[], t2: string, location: Location) {
        let simbolo = parametoM[1].simbolo;
        let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
        switch (simbolo.getTipo()) {
            case this.analizador.CARACTER:
                if (simbolo.tam > 0) {
                    // let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                    let valor = new nodoOperacion(t2, this.analizador.STRING, location.last_column, location.first_line);
                    this.analizador.variable.setVariableFiltro(dir, valor, location);
                    return 3;
                } else {
                    this.analizador.agregarCodigo(
                        this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line
                    );
                    //let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                    let valor = new nodoOperacion(t2, this.analizador.CARACTER, location.last_column, location.first_line);
                    this.analizador.variable.setVariableFiltro(dir, valor, location);
                    return 2;
                }
            case this.analizador.DOUBLE:
                this.analizador.agregarCodigo(
                    this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line
                );
                // let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                let valor = new nodoOperacion(t2, this.analizador.DOUBLE, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 1;
            case this.analizador.INT:
                this.analizador.agregarCodigo(
                    this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line
                );
                dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                valor = new nodoOperacion(t2, this.analizador.INT, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 0;
            case this.analizador.BOOLEANO:
                this.analizador.agregarCodigo(
                    this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line
                );
                dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                valor = new nodoOperacion(t2, this.analizador.BOOLEANO, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 5;
            default:
                return -1;
        }
    }

    private saveTipo(simbolo: Simbolo): number {
        switch (simbolo.getTipo()) {
            case this.analizador.CARACTER:
                if (simbolo.tam > 0) {
                    return 3;
                } else {
                    return 2;
                }
            case this.analizador.DOUBLE:
                return 1;
            case this.analizador.INT:
                return 0;
            case this.analizador.BOOLEANO:
                return 5;
            default:
                return -1;
        }
    }
    private agregarValor(t1: string, t2: string, location: Location) {
        this.analizador.agregarCodigo(
            this.analizador.getEnPila(t1, t2), location.last_column, location.first_line
        );

    }
    private escribirTeclado(location: Location) {
        this.analizador.agregarCodigo(
            "call, , ,$_in_value", location.last_column, location.first_line
        );
    }
    private retorno(t1: string, location: Location) {
        let coment = this.analizador.genComentario("retorno que no se usa");
        let agregarValor = this.analizador.saveEnPila(t1, "0");
        this.analizador.agregarCodigo(
            agregarValor + coment, location.last_column, location.first_line
        );
    }
    private tipoAPila(t1: string, tipo: string, location: Location) {
        let coment = this.analizador.genComentario("tipo Objeto");
        let agregarValor = this.analizador.saveEnPila(t1, tipo);
        this.analizador.agregarCodigo(
            agregarValor, location.last_column, location.first_line
        );
    }
    private input(t1: string, location: Location) {
        let coment = this.analizador.genComentario("posicion de la entrada");
        let agregarValor = this.analizador.saveEnPila(t1, "heap");
        this.analizador.agregarCodigo(
            agregarValor, location.last_column, location.first_line
        );
    }
    private Salida(parametoM: nodoOperacion[], t1: string, location: Location) {
        let agregarValor = ""
        let coment = this.analizador.genComentario("posiscion de arreglo de salida");
        if (parametoM[0].tipo == this.analizador.STRING) {
            let valor = this.analizador.exp.crearArregloString(parametoM[0]);
            agregarValor = this.analizador.saveEnPila(t1, valor);
        } else {
            agregarValor = this.analizador.saveEnPila(t1, parametoM[0].valor);
        }
        this.analizador.agregarCodigo(
            agregarValor + coment, location.last_column, location.first_line
        );
    }

    private ambitoSimulado(tam: number, temporal: string, location: Location) {
        let coment = this.analizador.genComentario("subir en ambito sumulado");
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", tam + "", temporal) + coment, location.last_column, location.first_line
        );

    }
    private aumentarAmbito(tam: number, location: Location) {
        let coment = this.analizador.genComentario("aumentar ambito");
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line
        );
    }

    private disminuirAmbito(tam: number, location: Location) {
        let coment = this.analizador.genComentario("disminuir ambito");
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("-", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line
        );
    }
}