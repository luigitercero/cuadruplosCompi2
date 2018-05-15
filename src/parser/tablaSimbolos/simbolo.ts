import Nodo from "../nodo";
import location from '../location'
import { error } from "util";
import Location from "../location";
export default class Simbolo {
    private nombre: string;
    private visibilidad: string;
    private tipo: string;
    public dim: Nodo[]
    public linea: number;
    public possAmbito: number;
    public tam: number;
    public valor: Valor;
    public location: Location | any;
    private puntero: boolean;
    private lugar: string;


    setLocacion_declaracion(location: Location) {
        this.location = location;
    }

    getLocacion_de_declaracion(): Location {
        return this.location;
    }

    getDim(number: number) {
        return this.dim[number];
    }
    setPuntero(esPuntero: boolean) {
        this.puntero = esPuntero;
    }
    getPunter() {
        return this.puntero;
    }
    constructor(nombre: string, visibilidad: string, tipo: string) {

        this.visibilidad = visibilidad.toLocaleLowerCase();
        this.tipo = this.filtro(tipo.toLocaleLowerCase());
        this.linea = -1;
        this.possAmbito = -1;
        this.nombre = nombre.toLocaleLowerCase();
        /**
         * es el tama;o del arreglo
         */
        this.dim = new Array();
        this.tam = 0;
        this.valor = new Valor();
        this.puntero = false;
        this.lugar = "pila";
    }

    getLugar() {
        return this.lugar;
    }

    setLugar(lugar: string) {
        this.lugar = lugar;
    }
    private filtro(tipo: string) {
        switch (tipo) {
            case "entero": return "entero";
            case "decimal": return "decimal";
            case "caracter": return "caracter";
            case "booleano": return "booleano";
        }
        return tipo;
    }

    getNombre() {
        return this.nombre;
    }

    getVisibilidad() {
        return this.visibilidad;
    }

    getTipo(): string {
        return this.tipo;
    }

    addDimension(tam: Nodo) {
        this.dim.push(tam);
        //this.tam = this.tam *tam;
    }

    getTamanio(): number {
        return this.tam;
    }

    addValor(nodo: Nodo, location: location) {
        this.valor = new Valor(nodo, location);
    }

    addTam(tam: number) {
        this.tam = this.tam + tam;
    }
}
class Valor {
    public valor: Nodo | null;
    public location: location | any;
    constructor(valor?: Nodo, location?: location) {
        if (valor != null && location != null) {
            this.valor = valor;
            this.location = location;
        } else {
            this.valor = null;
        }
    }

    getNodo(): Nodo {
        if (this.valor != null) {
            return this.valor;
        } else {
            throw error("error no debi pasar por aqui");
        }
    }
}