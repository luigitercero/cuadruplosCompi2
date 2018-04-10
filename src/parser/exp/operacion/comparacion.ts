import Casteo from "./casteo";
import nodoOperacion from "./nodoOperacion"
import Analizador from '../../analizador';
export default class Comparacion extends Casteo {
    private op:string;
    constructor(arg0:nodoOperacion, arg1:nodoOperacion,analizador:Analizador,op:string) {
        super(arg0,arg1,analizador);
        this.op = op ;
    }

    

    caracterCaracter():nodoOperacion{
        return  this.agregaretiqueta();
    }
    numberNumber():nodoOperacion{   
       return  this.agregaretiqueta();
    }
    doubleDouble(){
        return  this.agregaretiqueta();
    }
  
    /**
     * funciona para las operaciones xor que se deba subir un atributo
     */
    agregaretiqueta():nodoOperacion{
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta()
        let c = this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op,this.arg0.valor,this.arg1.valor,lv),c,f);
        this.analizador.agregarCodigo(this.analizador.genSalto(lf),c,f);
        let xor = this.analizador.opBool(this.op)+", "+ this.arg0.valor+", "+this.arg1.valor
        let n = new nodoOperacion(xor,this.analizador.BOOLEANO,c,f);
        n.addEtiquetaV(lv);
        n.addEtiquetaF(lf);
        return n;
    }
}