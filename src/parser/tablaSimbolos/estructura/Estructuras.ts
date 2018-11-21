
import Struct from "./Estructura";
import Ambito from "../ambito";
import Simbolo from "../simbolo";
import { text } from "body-parser";
import { error } from "util";
import Location from "../../location";


export default class Estructura {
    private struct: Struct[];


    constructor() {
        this.struct = new Array();
    }

    public agregarEstructura(estructura: Struct) {
        this.struct.push(estructura)
    }

    public verTodasLasEstructuras() {
        console.log("/*****esto son las estructura" + "*****/");
        for (let index = 0; index < this.struct.length; index++) {
            const element = this.struct[index];
            console.log(element.nombre);
        }
        console.log("/*****termina las estructuras  " + "*****/");
    }


    public buscarEstructura(nombre: string, location?: Location): Struct | undefined {
        for (let index = 0; index < this.struct.length; index++) {
            const element = this.struct[index];
            if (element.nombre == nombre.toLocaleLowerCase()) {
                return element;
            }
        }
    }

    public existeEstructura(nombre: string): boolean {
        for (let index = 0; index < this.struct.length; index++) {
            const element = this.struct[index];
            if (element.nombre == nombre.toLocaleLowerCase()) {
                return true;
            }
        }
        return false;
    }

}