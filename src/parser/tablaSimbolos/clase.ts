import Tabla from "./tabla";
import Metodo from "./metodo";
import Ambito from "./ambito";
import Simbolo from "./simbolo";

export default class Clase{
    public nombre :string;
    public poss : number;
    public tabla : Tabla;
    public metodo:Metodo[];

    constructor (nombre:string, poss:number) {
        this.nombre = nombre;
        this.poss = poss;
        this.tabla = new Tabla();
        this.crearEsto();
        this.crearPila();
        this.metodo = new Array();
    }    

    private crearEsto () {
        this.tabla.esto = new Ambito();
    }

   private crearPila () {
        let global = new Ambito();
        global.prefijo = this.nombre;
        global.agregarSimbolo(new Simbolo("retorno","publico","todo"));
        global.agregarSimbolo(new Simbolo("esto","publico",this.nombre));
    }


}