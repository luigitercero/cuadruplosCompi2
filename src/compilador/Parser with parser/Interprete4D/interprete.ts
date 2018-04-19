

class Interprete{

    public p:any;
    public S:any;
    constructor(inteprete:any){
        
        
        this.p = require('./codigoFinal');
      
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new Operacion(inteprete);
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        this.S = inteprete.start;

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
               this.p.parse(this.p.parser.struct.codigo[index].codigo);
               index = this.p.parser.indice.valor
            }
          

       }
    }
}


class Operacion{
    public es= {
        'C4D':[{'poss':-1,'codigo':"",'columna':-1,'linea':-1,}],
        'state':true,
        'etiqueta':[{'etiqueta':"",'poss':-1}],
        'metodo' :[{'metodo':"",'poss':-1}],
        'temporal':[{"tempora":"retorno","valor":4}]
    };

    public stack:number[];
    public heap:number[];
    public ptr:number= 0;
    public pth:number= 0;
    constructor(lTeporales:any){
        this.es = lTeporales;
        this.stack = new Array();
        this.heap = new Array();
    }

    igual(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 == arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }

    noigual(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 != arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }

    getSTACK(arg0:number,temp:string) {
        this.setValTemp(temp,this.stack[arg0]);
    }
    getHEAP(arg0:number,temp:string) {
        this.setValTemp(temp,this.heap[arg0]);
    }
    setHEAP(arg0:number,arg1:number) {
        this.heap[arg0] = arg1;
    }
    setSTACK(arg0:number,arg1:number) {
        this.stack[arg0] = arg1;
    }


    mayorque(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 > arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }
    menorque(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 < arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }

    mayorIgual(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 >= arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }

   menorIgual(arg0:number,etiqueta:string,arg1:number,linea:number) {
        if (arg0 <= arg1) {

            return this.eitqueta(etiqueta)
        }else {
            return linea
        }
        
    }
    sumar(arg0:number,arg1:number,temp:string){
        this.setValTemp(temp,arg0 + arg1);
    }
    sumarV(arg0:number,arg1:number,temp:string){
        this.setValTemp(temp,arg0 + arg1);
    }
    restar(arg0:number, arg1:number,temp:string){
        this.setValTemp(temp,arg0 - arg1);
    }
    multiplicar (arg0:number, arg1:number,temp:string) {
        this.setValTemp(temp,arg0 * arg1);
    }
    dividir(arg0:number, arg1:number,temp:string) {
        this.setValTemp(temp,arg0 / arg1);
    }
    
    getValtemp(temp:string){
        let key:number =  this.getPosstemp(temp);
        return this.es.temporal[key].valor;
    }

    getPosstemp(temp:string){
        let a =  temp.replace("T","");
        return +a;
    }

    setValTemp(temp:string, val:number){
        let key:number = + this.getPosstemp(temp);
        let temps = this.es.temporal[key].tempora;
        this.es.temporal[key] = {"tempora":temps,"valor":val};
    }
    convertiNumero(num:string) {
        return +num;
    }
    eitqueta(etiqueta:string) {
        let a =  etiqueta.replace("L","");
        return this.es.etiqueta[+a].poss;
    }
    printC(num:number){

        console.log(String.fromCharCode(num));
    }
    printD(num:number){

        console.log(num);
    }
    
    
}