
import Operacion from './operacion'
export default class Interprete{

    public p:any;
    public S:any;
    public end:any
    private index:number;
    public ambito:string [];
    

    constructor(inteprete:any){
        this.p = require('./codigoFinal');
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new Operacion(inteprete);
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        this.S = inteprete.start;
        this.end = inteprete.end;
        this.index = this.S;
        this.ambito = [];
    }

    start() {
        console.log("Iniciando lectura de cuadruplo");
        this.leer4D(this.S);
    }
    leer4D(iniciaEn:number){
        if (this.p.parser.struct.codigo !=null){
            for (let index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
                console.log(this.p.parser.struct.codigo[index].poss,this.p.parser.struct.codigo[index].codigo
                    ,this.p.parser.struct.codigo[index].columna, this.p.parser.struct.codigo[index].linea
                );
               this.p.parser.indice.valor = index;
               this.p.parser.struct.op.linea =index;
               this.p.parse(this.p.parser.struct.codigo[index].codigo);
               this.index = this.p.parser.indice.valor
               this.ambito = this.p.parser.struct.codigo[index].ambito;
                if (this.index < 0) {
                    break;
                }
                console.log("#"+this.p.parser.struct.codigo[this.index].codigo,
                this.p.parser.struct.codigo[this.index].linea,
                this.p.parser.struct.codigo[this.index].columna);
            }
            console.log("felicidades a termindo la lectura de cuadruplo") 
        }
    }

    seguir(data:any) {
        
        let tam = this.p.parser.struct.codigo.length
        while(this.index != -1){
            this.p.parser.indice.valor = this.index;
            this.p.parser.struct.op.linea =this.index;
            this.p.parse(this.p.parser.struct.codigo[this.index].codigo);
            this.index = this.p.parser.indice.valor
            this.ambito = this.p.parser.struct.codigo[this.index].ambito;
            if (this.index == -1) {
                 break;
            }
            console.log("#"+this.p.parser.struct.codigo[this.index].codigo,
            this.p.parser.struct.codigo[this.index].linea,
            this.p.parser.struct.codigo[this.index].columna
            )
            
            let codigo =this.p.parser.struct.codigo[this.index];
            for (let index2 = 0; index2 < data.length; index2++) {
                  const element = data[index2];
                  if (codigo.linea == element){
                     let arreglo = []
                     arreglo.push(codigo.poss);
                     arreglo.push(codigo.codigo);
                     arreglo.push(codigo.columna);
                     arreglo.push(codigo.linea);
                     this.index++;
                     return arreglo;
                  }
             
            }
            this.index++;
        }
        let linea =this.p.parser.struct.codigo[this.end];
        let arreglo = []
        arreglo.push(linea.poss);
        arreglo.push(linea.codigo);
        arreglo.push(linea.columna);
        arreglo.push(linea.linea);
        this.index++;
        console.log("felicidades a termindo la lectura de cuadruplo")
        return arreglo;  
        
    }

    siguiente() {
        if (this.index > 0) {
            this.p.parser.indice.valor = this.index;
            this.p.parser.struct.op.linea =this.index;
            this.p.parse(this.p.parser.struct.codigo[this.index].codigo);
            this.index = this.p.parser.indice.valor
            this.index ++;
            console.log(this.p.parser.struct.codigo[this.index].codigo,
                this.p.parser.struct.codigo[this.index].linea,
                this.p.parser.struct.codigo[this.index].columna
            )
            this.ambito = this.p.parser.struct.codigo[this.index].ambito;
        }else {
            console.log("fin de siguiente"
            );

        }
        let linea =this.p.parser.struct.codigo[this.index];

        let arreglo = []
        arreglo.push(linea.poss);
        arreglo.push(linea.codigo);
        arreglo.push(linea.columna);
        arreglo.push(linea.linea);
        return arreglo;
      
    }
}
