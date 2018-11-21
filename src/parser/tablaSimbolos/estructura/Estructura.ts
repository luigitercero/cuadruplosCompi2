import Tabla from "../tabla";
import Metodo from "../metodo";
import Variables from "../ambito";
import Simbolo from "../simbolo";
import { text } from "body-parser";
import { error } from "util";
import Location from "../../location";

export default class Struct {
    public nombre: string;
    public poss: number;
    public variables: Variables;

    constructor(nombre: string, poss: number) {
        this.nombre = nombre.toLocaleLowerCase();
        this.poss = poss;
        this.variables = new Variables();
    }

    public agregarSimbolo(nombre: string, tipo: string) {
        this.variables.agregarSimbolo(new Simbolo(nombre, "", tipo));
    }
    agregarSim(simbolo: Simbolo) {
        this.variables.agregarSimbolo(simbolo);
    }
    public verTodosLosSimbolos() {
        console.log("/*****esto son los metodos de la clase " + this.nombre + "*****/");
        for (let index = 0; index < this.variables.ambito.length; index++) {
            const element = this.variables.ambito[index];
            console.log(element.getNombre() + ", " + element.getTipo());
        }
        console.log("/*****termina los metodos de la clase " + this.nombre + "*****/");
    }




    buscarSimbolo(nombre: string, inicio?: string, location?: Location): Simbolo {
        let simbolo: Simbolo | null = this.variables.getVariable(nombre.toLocaleLowerCase());
        if (simbolo == null) {
            throw new Error("no es posible encontrar variable")
        } else {
            return simbolo;
        }

    }

}