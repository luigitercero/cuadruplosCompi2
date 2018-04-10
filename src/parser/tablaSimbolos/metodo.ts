import Simbolo from "./simbolo";
import { error } from "util";

export default class Metodo extends Simbolo {
    public id:string;
    public parametro:Simbolo[];
    constructor(nombre: string, visibilidad: string, tipo: string, possAmbito: number){
        super(nombre,visibilidad,tipo);
        this.id = nombre;
        this.parametro = new Array<Simbolo>();
    }

    addParametro(simbolo:Simbolo){
        this.id = this.id + "_" +simbolo.getTipo();
        this.parametro.push(simbolo);
    }
    
    

    buscarSimbolo(nombre:string) { return false;}
}