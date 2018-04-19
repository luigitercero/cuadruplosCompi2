import Variable from '../variable';
import Analizador from '../../analizador';
import Asignacion from '../asignacion'
import Nodo from '../../nodo';
import Declaracion from '../declaracion';
import Control from '../control/control';
import Metodo from '../../tablaSimbolos/metodo';
import Salida from '../control/nodoSalida';
import { error } from 'util';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Imprimir from './imprimir'
export default class Primitivas {

    private analizador:Analizador;
    private imprimir:Imprimir
    constructor(analizador:Analizador) {
        this.analizador = analizador
        this.imprimir = new Imprimir(analizador);
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

    analizar (metodo:string, varible:nodoOperacion[]) {

        switch (metodo) {
            case "IMPRIMIR" :
            this.imprimir.imprimir(varible);
            break;
            case "CONCATENAR" :
            case "CONVERTIRCADENA":
            case "CONVERTIRENTERO":
            case "CREARPUNTERO":
            case "OBTERNERDIRECCION":
            case "RESERVAMEMORIA":
            case "CONSULTARTAMANIO":
            case "TECLADO":

        }
    }
}