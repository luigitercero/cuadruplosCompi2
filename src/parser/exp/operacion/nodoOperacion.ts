import Location from '../../../parser/location'
export default class nodoOperacion {
    public tipo:number;
    public valor:string;
    public column:number;
    public fila:number;
    public etiquetaV:string[];
    public etiquetaF:string[];
    constructor (valor:string, tipo:number,column:number|-1,fila:number|-1) {
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
  

    getTipoObjeto() {
        switch(this.tipo) {
            case 0:
            return "boolenano"
            case 1:
            return "numero"
            case 2:
            return "caracter"
            case 3:
        
            return "tengo que buscar el objeto en la tabla de simbolos"
            case 4:
            return "cadena"
        }
    }

}