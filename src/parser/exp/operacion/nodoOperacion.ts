import Simbolo from "../../tablaSimbolos/simbolo";


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
    public tam: number;

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