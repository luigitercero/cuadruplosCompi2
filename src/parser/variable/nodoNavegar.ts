import Dir from '../variable/obtenerDireccion'

export default class NodoNavegar {
    public variable:Dir;
    public tipo:string;
    constructor (variable:Dir,tipo:string) {
        this.variable = variable;
        this.tipo =tipo;
    }
}