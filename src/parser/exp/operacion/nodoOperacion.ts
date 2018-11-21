import Simbolo from "../../tablaSimbolos/simbolo";
import Dir from "../../variable/obtenerDireccion"
import Location from "../../location";

export default class nodoOperacion {
    public tipo: string;

    public valor: string;
    public column: number;
    public fila: number;
    public etiquetaV: string[];
    public etiquetaF: string[];
    public dim: number;
    public temp: string;
    public simbolo: Simbolo;
    private tam: number;
    private reff: Dir;
    private lugar: string;
    private enDireccion: boolean;
    private location: Location;
    public xor: string
    constructor(valor: string, tipo: string, column: number | -1, fila: number | -1) {
        this.valor = valor;
        this.tipo = tipo;
        this.column = column;
        this.fila = fila;
        this.etiquetaV = [];
        this.etiquetaF = [];
        this.dim = 0;
        this.temp = "";
        this.simbolo = new Simbolo("", "", "")
        this.tam = 0;
        this.enDireccion = false;
        this.lugar = "";
        this.xor = "";

    }
    getlocation() {
        return this.location;
    }

    setLocation(location: Location) {
        this.location = location
    }
    getenDireccion() {
        return this.enDireccion;
    }
    setEnDireccion(endireccion: boolean) {
        this.enDireccion = endireccion
    }
    setReff(reff: Dir) {
        this.reff = reff;
    }

    getReff() {
        return this.reff;
    }
    getTam() {
        return this.tam;
    }
    setTam(tam: number) {
        this.tam = tam;
    }

    addEtiquetaV(etiqueta: string) {
        this.etiquetaV.push(etiqueta)
    }
    addEtiquetaF(etiqueta: string) {
        this.etiquetaF.push(etiqueta);
    }
    addEtiquetaVV(etiqueta: string[]) {
        etiqueta.forEach(element => {
            this.etiquetaV.push(element);
        });
    }
    addEtiquetaFV(etiqueta: string[]) {
        etiqueta.forEach(element => {
            this.etiquetaF.push(element);
        });
    }
}