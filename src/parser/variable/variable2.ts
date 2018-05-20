import Analizador from '../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
import Simbolo from '../tablaSimbolos/simbolo'

import nodoOperacion from '../exp/operacion/nodoOperacion';
import { error } from 'util';
import Clase from '../tablaSimbolos/clase';
import Dir from './obtenerDireccion'
import Location from '../location';
import Metodo from '../tablaSimbolos/metodo';
import NodoNavegar from './nodoNavegar';
import IfG from '../sigenerico'
import Struct from '../tablaSimbolos/estructura/Estructura';

export default class Variable2 {

    public analizador: Analizador;

    constructor(analizdor: Analizador) {
        this.analizador = analizdor;
    }



}