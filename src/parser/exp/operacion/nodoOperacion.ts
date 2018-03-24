import Location from '../../../parser/location'
export default class nodoOperacion {
    public tipo:number;
    public valor:string;
    public column:number;
    public fila:number;
    public etiquetaV:string;
    public etiquetaF:string;
    constructor (valor:string, tipo:number,column:number|-1,fila:number|-1) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
    }
    addEtiquetaV(etiqueta:string){
        if (this.etiquetaV === "" || this.etiquetaV == null ){
            this.etiquetaV =etiqueta
        }else{

            this.etiquetaV = this.etiquetaV + ", " +etiqueta
        }  
    }
    addEtiquetaF(etiqueta:string){
        if (this.etiquetaF === "" || this.etiquetaF == null ){
            this.etiquetaF =etiqueta
        }else{
            this.etiquetaF = this.etiquetaF + ", " +etiqueta
        }
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