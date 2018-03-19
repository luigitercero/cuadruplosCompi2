import Analizador from '../../../analizador';
import Nodo from '../../nodo';
export default class Operacion{
    protected  analizador: Analizador;
    constructor(anlaizador:Analizador){
        this.analizador = anlaizador;
    }

}