import Tabla from "./tabla";
import Metodo from "./metodo";
import Ambito from "./ambito";
import Simbolo from "./simbolo";
import { text } from "body-parser";
import { error } from "util";
import Location from "../location";
import Estructuras from "./estructura/Estructuras";


export default class Clase {
    public nombre: string;
    public poss: number;
    public tabla: Tabla;
    public metodo: Metodo[];
    public importar: Clase[];
    public estructura: Estructuras
    public herencia: boolean = false;
    public hereda_de: string = "";
    constructor(nombre: string, poss: number) {
        this.nombre = nombre.toLocaleLowerCase();
        this.poss = poss;
        this.tabla = new Tabla();
        this.crearEsto();
        this.crearPila();
        this.metodo = new Array();
        this.importar = new Array<Clase>();
        this.estructura = new Estructuras();
    }

    private crearEsto() {
        this.tabla.esto = new Ambito();
    }

    private crearPila() {
        let global = new Ambito();
        global.prefijo = this.nombre;
        global.agregarSimbolo(new Simbolo("retorno", "publico", "todo"));
        global.agregarSimbolo(new Simbolo("este", "publico", this.nombre));
        this.tabla.Lista.push(global);
    }

    public agregarMetodo(metodo: Metodo) {
        this.metodo.push(metodo);
    }

    public verMetodosDeClase() {
        console.log("/*****esto son los metodos de la clase " + this.nombre + "*****/");
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
            console.log(element.nomMetodo + ", " + element.getTipo());
        }
        console.log("/*****termina los metodos de la clase " + this.nombre + "*****/");
    }

    public verVariable() {
        console.log("/*****estas son los variablles de la clase " + this.nombre + "*****/");
        this.tabla.verVariables();
        console.log("/*****terminal las variables de la clase " + this.nombre + "*****/");
    }

    public buscarMetodo(nombre: string, location: Location, abstrac?: string): Metodo {
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
            if (element.nomMetodo == nombre.toLocaleLowerCase()) {
                return element;
            }
        }
        if (abstrac != undefined) {
            if (this.nombre.toLocaleLowerCase() == "lista") {
                for (let index = 0; index < this.metodo.length; index++) {
                    const element = this.metodo[index];
                    if (element.getNombre() == abstrac.toLocaleLowerCase()) {
                        return element;
                    }
                }

            }
        }

        if (location == undefined) {
            throw new Error("error al querer obterner el metodo " + nombre);
        } else {
            throw new Error("error al querer obterner el metodo " + nombre + " columna " + location.last_column + " line " + location.first_line);
        }
    }

    public existeMetodo(nombre: string): boolean {
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
            if (element.nomMetodo == nombre.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    }

    buscarSimbolo(nombre: string, inicio?: string, location?: Location): Simbolo {

        if (inicio === undefined) {
            let simbolo: Simbolo | null = this.tabla.buscarEnPila(nombre.toLocaleLowerCase());
            if (simbolo != null) {
                return simbolo
            } else {
                simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
                if (simbolo != null) {
                    return simbolo
                }
            }
        } else {
            let simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
            if (simbolo != null) {
                return simbolo
            }
        }
        if (location != null) {
            throw new Error("no es posible encontrar la variable " + nombre + " linea : " + location.first_line + " columna: " + location.last_column)
        }

        throw new Error("no es posible encontrar variable")
    }

    buscarSimboloenEsto(nombre: string): Simbolo {
        let simbolo;
        simbolo = this.tabla.buscarEnHeap(nombre.toLocaleLowerCase());
        if (simbolo != null) {
            return simbolo
        }
        return new Simbolo("", "", "3517442");
    }
}