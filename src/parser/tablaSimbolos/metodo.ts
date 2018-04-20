import Simbolo from "./simbolo";
import { error } from "util";

export default class Metodo extends Simbolo {
    public id:string;
    public parametro:Simbolo[];
    public postFijo:String[];
    public nomMetodo:String;
    constructor(nombre: string, visibilidad: string, tipo: string, possAmbito: number){
        super(nombre,visibilidad,tipo);
        this.id = nombre;
        this.nomMetodo = nombre;
        this.parametro = new Array<Simbolo>();
        this.postFijo = new Array<String>() ;
    }

    addParametro(simbolo:Simbolo){
        this.nomMetodo = this.id + "_" +simbolo.getTipo();
        this.postFijo.push(simbolo.getTipo());
        this.parametro.push(simbolo);
    }
    
    addPostFijo(tipo:String) {
        this.postFijo.push(tipo);
    }

    buscarSimbolo(nombre:string) { return false;}
}