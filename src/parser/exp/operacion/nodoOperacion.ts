
export default class nodoOperacion {
    public tipo:string;
    public valor:string;
    public column:number;
    public fila:number;
    public etiquetaV:string[];
    public etiquetaF:string[];
    constructor (valor:string, tipo:string,column:number|-1,fila:number|-1) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
        this. etiquetaV=[];
        this. etiquetaF=[];
      
    }
    addEtiquetaV(etiqueta:string){
        this.etiquetaV.push(etiqueta)
    }
    addEtiquetaF(etiqueta:string){
      this.etiquetaF.push(etiqueta);
    }  

    addEtiquetaVV(etiqueta:string[]){
        etiqueta.forEach(element => {
            this.etiquetaV.push(element);
        });
    }
    addEtiquetaFV(etiqueta:string[]){
        etiqueta.forEach(element => {
            this.etiquetaF.push(element);
        });
    }
      
  



}