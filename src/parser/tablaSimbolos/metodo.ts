import Simbolo from "./simbolo";
import { error } from "util";

export default class Metodo extends Simbolo {
    public id: string;
    public parametro: Simbolo[];
    public postFijo: string[];
    public nomMetodo: String;
    public preFijo: string
    public escrito: boolean = false;
    constructor(nombre: string, visibilidad: string, tipo: string, possAmbito?: number) {
        super(nombre.toLocaleLowerCase(), visibilidad.toLowerCase(), tipo.toLocaleLowerCase());
        this.id = nombre.toLocaleLowerCase();
        this.nomMetodo = nombre.toLocaleLowerCase();
        this.parametro = new Array<Simbolo>();
        this.postFijo = new Array<string>();
        this.preFijo = "";
    }

    addParametro(simbolo: Simbolo) {
        this.nomMetodo = this.nomMetodo + "_" + simbolo.getTipo();
        this.postFijo.push(simbolo.getTipo());
        this.parametro.push(simbolo);
    }
    setPrefijo(prefijo: string) {
        this.preFijo = prefijo.toLocaleLowerCase();
    }
    addPostFijo(tipo: string) {
        this.postFijo.push(tipo.toLocaleLowerCase());
    }

    buscarSimbolo(nombre: string) { return false; }
}