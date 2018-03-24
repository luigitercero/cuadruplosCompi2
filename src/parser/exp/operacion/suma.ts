import Casteo from "./casteo";
import nodoOperacion from "./nodoOperacion"
import Analizador from '../../../analizador';
export default class Suma extends Casteo {
    private op:string;
    constructor(arg0:nodoOperacion, arg1:nodoOperacion,analizador:Analizador,op:string) {
        super(arg0,arg1,analizador);
        this.op = op ;
    }

    
    caracterCaracter():nodoOperacion{
        let t = this.analizador.newTemporal();
        let c =this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op,this.arg0.valor,this.arg1.valor,t),c,f);
        return new nodoOperacion(t,1,c,f);
    }
    numberNumber():nodoOperacion{   
        let t = this.analizador.newTemporal();
        let c =this.arg0.column;
        let f = this.arg0.fila;
        this.analizador.agregarCodigo(this.analizador.genOperacion(this.op,this.arg0.valor,this.arg1.valor,t),c,f);
        return new nodoOperacion(t,1,c,f);
    }
    booleaBolean():nodoOperacion{
        this.arg1 = this.castearBoleano(this.arg1);
        this.arg0 = this.castearBoleano(this.arg0);
        return this.numberNumber();
    }
   
    numberBolean():nodoOperacion{
        this.arg1 = this.castearBoleano(this.arg1);
        return this.numberNumber();
    }
    boleanNumber():nodoOperacion{
        this.arg0 = this.castearBoleano(this.arg0);
        return this.numberNumber();
    }
    boleanCaracter() :nodoOperacion{
        this.arg0 = this.castearBoleano(this.arg0);
        return this.caracterCaracter();
    }
    caracterBolean() :nodoOperacion{
        this.arg1 = this.castearBoleano(this.arg1);
        return this.caracterCaracter();
    }
  castearBoleano(arg0:nodoOperacion){
    let t0 = this.analizador.newTemporal();
    let es = this.analizador.newEtiqueta();
    /*para etiqueta verdadera */
    this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaV),arg0.column,arg0.fila)
    this.analizador.agregarCodigo(this.analizador.asignar("1",t0),arg0.column,arg0.fila)
    this.analizador.agregarCodigo(this.analizador.genSalto(es),this.arg0.column,this.arg0.fila)
    /*para etiqueta falsa */
    this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaF),arg0.column,arg0.fila)
    this.analizador.agregarCodigo(this.analizador.asignar("0",t0),arg0.column,arg0.fila);
    return new nodoOperacion(t0,1,arg0.column,arg0.fila);

  }

}