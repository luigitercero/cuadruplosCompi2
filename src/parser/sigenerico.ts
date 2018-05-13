import Analizador from "./analizador";
export default class SIGENERICO {

    private etiquetaV: string;
    private etiquetaF: string;
    private etiquetaS: string;
    private analizador: Analizador;
    private column: number;
    private line: number;
    constructor(analizador: Analizador, column: number, line: number) {
        this.analizador = analizador;
        this.etiquetaV = this.analizador.newEtiqueta();
        this.etiquetaF = this.analizador.newEtiqueta();
        this.etiquetaS = this.analizador.newEtiqueta();
        this.column = column;
        this.line = line;
    }

    getEtiquetaV() {
        return this.etiquetaV;
    }
    getEtiquetaF() {
        return this.etiquetaF;
    }

    getEtiquetaS() {
        return this.getEtiquetaS;
    }

    genSi(operador: string, arg0: string, arg1: string) {
        this.analizador.agregarCodigo(
            this.analizador.genOperacion(operador, arg0, arg1, this.etiquetaV), this.column, this.line
        );
    }
    genSaltoFalso() {
        this.analizador.agregarCodigo(
            this.analizador.genSalto(this.etiquetaF), this.column, this.line);
    }

    escribirEtiquetaV() {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaV), this.column, this.line);
    }
    escribirEtiquetaF() {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaF), this.column, this.line);
    }

    escribirEtiquetaS() {
        this.analizador.agregarCodigo(this.analizador.escribirEtiquetaS(this.etiquetaS), this.column, this.line);
    }

    escribirSaltoS() {
        this.analizador.agregarCodigo(this.analizador.genSalto(this.etiquetaS), this.column, this.line);
    }
}