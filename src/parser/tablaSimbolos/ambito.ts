import Simbolo from './simbolo'
export default class Ambito {

    public ambito: Simbolo[]
    public prefijo: string;
    public postFijo: string[];
    public ptr: number;
    constructor() {
        this.ptr = 0;
        this.postFijo = new Array();
        this.ambito = new Array();
        this.prefijo = "";
    }
    setPTR(inicio: number) {
        this.ptr = inicio;
    }
    buscarVariable(nombre: string): boolean {
        for (let index = 0; index < this.ambito.length; index++) {
            const element = this.ambito[index];
            if (element.getNombre() == nombre.toLocaleLowerCase()) {
                return true;
            }

        }
        return false;
    }
    getVariable(nombre: string): Simbolo {
        for (let index = 0; index < this.ambito.length; index++) {
            const element = this.ambito[index];
            if (element.getNombre() == nombre.toLocaleLowerCase()) {
                return element;
            }

        }
        return new Simbolo("", "", "");
    }
    agregarVariable(nombre: string, visibilidad: string, tipo: string) {
        let simbolo = new Simbolo(nombre.toLocaleLowerCase(), visibilidad, tipo);
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr
        this.siguietePosicionLibre(simbolo);
        return simbolo;
    }
    agregarSimbolo(simbolo: Simbolo) {
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr
        this.siguietePosicionLibre(simbolo);
    }

    siguietePosicionLibre(simbolo: Simbolo) {
        this.ptr++;
    }
    existeVariable(nombre: string): boolean {
        for (let index = 0; index < this.ambito.length; index++) {
            if (this.ambito[index].getNombre() == (nombre.toLocaleLowerCase())) {
                return true;
            }

        }
        return false;
    }
    getSize(): number { return this.ambito.length; }

    verVariables() {
        for (let index = 0; index < this.ambito.length; index++) {
            const element = this.ambito[index];
            console.log(element.getNombre(), element.tam, element.getTipo());
        }
    }



}