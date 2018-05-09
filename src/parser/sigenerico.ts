import Analizador from "./analizador";
export default class SIGENERICO {

    private etiquetaV: string;
    private etiquetaF: string;
    private etiquetaS: string;
    private analizador: Analizador;
    constructor(analizador: Analizador) {
        this.analizador = analizador;
        this.etiquetaV = this.analizador.newEtiqueta();
        this.etiquetaF = this.analizador.newEtiqueta();
        this.etiquetaS = this.analizador.newEtiqueta();
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
        return this.analizador.genOperacion(operador, arg0, arg1, this.etiquetaV);
    }
    genSaltoFalso() {
        return this.analizador.genSalto(this.etiquetaF);
    }

    escribirEtiquetaV() {
        return this.analizador.escribirEtiquetaS(this.etiquetaV);
    }
    escribirEtiquetaF() {
        return this.analizador.escribirEtiquetaS(this.etiquetaF);
    }

    escribirEtiquetaS() {
        return this.analizador.escribirEtiquetaS(this.etiquetaS);
    }

    escribirSaltoS() {
        return this.analizador.genSalto(this.etiquetaS);
    }
}