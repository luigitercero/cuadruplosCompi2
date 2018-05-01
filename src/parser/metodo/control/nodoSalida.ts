import Simbolo from "../../tablaSimbolos/simbolo";
import Location from "../../location";


export default class Salida {

    public location: Location | any
    public etiquetaS: string[];
    public etiquetaR: string[];
    public start: string[];
    public dim: number;
    public isCiclo: boolean;

    constructor(ciclo?: boolean) {
        if (ciclo != null) {
            this.isCiclo = ciclo;
        } else {
            this.isCiclo = false;
        }

        this.etiquetaS = Array();
        this.etiquetaR = Array();
        this.start = Array();
        this.dim = -1;
    }

    /**estiquea de break */
    addEtiquetaS(etiqueta: string, location: Location) {
        this.etiquetaS.push(etiqueta)
        this.location = location;
    }

    /**etiqueta de return */
    addEtiquetaR(etiqueta: string, location: Location) {
        this.etiquetaR.push(etiqueta);
        this.location = location;
    }

    addEtiqueta(etiquetaS: string[], etiquetaR: string[]) {
        this.addEtiquetaSS(etiquetaS);
        this.addEtiquetaSS(etiquetaR);
        this.location = location;
    }

    addEtiquetaSS(etiqueta: string[]) {
        etiqueta.forEach(element => {
            this.etiquetaS.push(element);
        });
    }

    addEtiquetaRR(etiqueta: string[]) {
        etiqueta.forEach(element => {
            this.etiquetaR.push(element);
        });
    }
}