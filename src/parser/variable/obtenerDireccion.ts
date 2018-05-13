import Simbolo from "../tablaSimbolos/simbolo";
import Location from "../location";


export default class InfVarible {
    /*temporal */
    public temporal: string;
    /*mira si esta en this o pila */
    public done: string;
    /*simbolo */
    public simbolo: Simbolo
    public location: Location | any
    public tam: number;//no se para que sirve pero si se toca se arruina todo
    public dir: string;
    public val: string | any;
    private tamanioDeVariable: number
    private temporalDeGuardado: string

    constructor(temporal: string, done: string, simbolo: Simbolo) {
        this.temporal = temporal;
        this.done = done;
        this.simbolo = simbolo;
        this.tam = 0;
        this.dir = temporal;
        this.tamanioDeVariable = simbolo.tam;
        this.temporalDeGuardado = "";
    }

    gettemporalDeGuardado() {
        return this.temporalDeGuardado;
    }
    settemporalDeGuardado(lugar: string) {
        this.temporalDeGuardado = lugar
    }
    addLocation(locatio: Location) {
        this.location = locatio;
    }

    getTamanio() {
        return this.tamanioDeVariable;
    }

    setTamanio(tam: number) {
        this.tamanioDeVariable = tam;
    }
    getDir() {

        return this.dir;
    }
}