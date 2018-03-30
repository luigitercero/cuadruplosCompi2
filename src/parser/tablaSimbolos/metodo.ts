import Simbolo from "./simbolo";

export default class Metodo extends Simbolo {

    constructor(nombre: string, visibilidad: string, tipo: string, possAmbito: number){
        super(nombre,visibilidad,tipo);
    }
}