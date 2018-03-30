export default class Simbolo {
    private nombre :string;
    private visibilidad: string;
    private tipo : string;
    private dim:number[]
    public linea:number;
    public possAmbito:number;
    public tam:number;
    public valor:boolean;
    
    constructor (nombre:string, visibilidad:string, tipo:string,) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = this.filtro(tipo);
        this.linea = -1;
        this.possAmbito = -1;
        this.dim = new Array();
        this.tam = 1;
        this.valor = false;
       
    }
    private filtro(tipo:string) {
        switch(tipo){
            case "entero":return "int";
            case "decimal":return "double";
            case "caracter":return "caracter";
            case "booleano":return "boolean";
        }
        return tipo;
    }
    getNombre () {
        return this.nombre;
    }

    getVisibilidad () {
        return this.visibilidad;
    }
    
    getTipo ():string {
        return this.tipo;
    }
    addDimension(tam:number) {  
        this.dim.push(tam);
        this.tam = this.tam *tam;
    }
    getTamanio ():number {
        return this.tam;
    }
    
}