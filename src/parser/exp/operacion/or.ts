import Casteo from "./casteo";
import nodoOperacion from "./nodoOperacion"
import Analizador from '../../../analizador';
export default class Or extends Casteo {
 
    constructor(arg0:nodoOperacion, arg1:nodoOperacion,analizador:Analizador) {
        super(arg0,arg1,analizador);
    
    }

    

    booleaBolean():nodoOperacion{
        let t = this.analizador.newTemporal();
        let c =this.arg0.column;
        let f = this.arg0.fila;
       // this.analizador.agregarCodigo(this.analizador.genOperacion(this.op,this.arg0.valor,this.arg1.valor,t),c,f);
        return new nodoOperacion(t,1,c,f);
    }
   


    
}