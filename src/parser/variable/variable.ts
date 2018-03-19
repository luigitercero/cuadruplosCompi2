import Analizador from '../../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
export default class Variable extends Operador {
      

    constructor(analizdor:Analizador){
        super(analizdor);
    }
    /**
     * DeclaracionClase
     *: Visibilidad Declaracion
     *| Declaracion
     *;
     * @param nodo 
     */
    declaracion(nodo: Nodo): true {
        throw new Error("Method not implemented.");
    }

}