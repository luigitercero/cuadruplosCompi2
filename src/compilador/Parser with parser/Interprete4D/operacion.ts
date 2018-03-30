export default class Operacion{
    public es= {
        'C4D':[{'poss':-1,'codigo':"",'columna':-1,'linea':-1,}],
        'state':true,
        'etiqueta':[{'etiqueta':"",'poss':-1}],
        'metodo' :[{'metodo':"",'poss':-1}],
        'temporal':[{"tempora":"retorno","valor":4}]
    };
    constructor(lTeporales:any){
        this.es = lTeporales;
    }
    sumar(arg0:number,arg1:number,temp:string){
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
    
}