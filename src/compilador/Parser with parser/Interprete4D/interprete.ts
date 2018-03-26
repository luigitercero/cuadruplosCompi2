import Operacion from "./operacion";

export default class Interprete{

    public p;
  
    constructor(inteprete){
        
        
        this.p = require('./codigoFinal');
      
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new Operacion(inteprete);
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;

    }

    leer4D(iniciaEn:number){
       if (this.p.parser.struct.codigo !=null){
            for (let index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
                console.log(this.p.parser.struct.codigo[index].poss,this.p.parser.struct.codigo[index].codigo);
               this.p.parser.indice.valor = index;
               this.p.parse(this.p.parser.struct.codigo[index].codigo);
               index = this.p.parser.indice.valor
            }
       }

    }
}