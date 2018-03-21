export default class nodoOperacion {
    public tipo:number;
    public valor:string;
    constructor(valor:string,tipo:number){
        this.valor = valor;
        this.tipo = 351774492;
    }

    getTipoObjeto(){
        switch(this.tipo){
            case 0:
            return "boolenano"
            case 1:
            return "numero"
            case 2:
            return "cadena"
            case 3:
        
            return "tengo que buscar el objeto en la tabla de simbolos"
            case 4:
        }
    }

}