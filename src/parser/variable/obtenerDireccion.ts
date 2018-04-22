import Simbolo from "../tablaSimbolos/simbolo";
import Location from "../location";


export default class InfVarible {
    /*temporal */
    public temporal:string;
    /*mira si esta en this o pila */
    public done:string;
    /*simbolo */
    public simbolo:Simbolo
    public location:Location|any
    public tam:number;
    public dir:string;
    constructor(temporal:string, done:string,simbolo:Simbolo) {
        this.temporal = temporal;
        this.done = done;
        this.simbolo = simbolo;
        this.tam = 0;
        this.dir = temporal;

    }
    addLocation(locatio:Location){
        this.location = locatio;
    }

}