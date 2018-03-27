export default class Simbolo {
    private nombre :string;
    private visibilidad: string;
    private tipo : number;
    
    constructor (nombre:string, visibilidad:string, tipo:number) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = tipo
    }

    getNombre () {
        return this.nombre;
    }

    getVisibilidad () {
        return this.visibilidad;
    }
    
    getTipo () {
        return this.getTipo;
    }
}