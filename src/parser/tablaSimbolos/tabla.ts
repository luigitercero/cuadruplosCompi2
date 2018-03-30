import Simbolo from './simbolo'
import Ambito from './ambito'
export default class Tabla{

    public Lista:Ambito[];
    public esto:Ambito;
    
    constructor() {
        this.esto = new Ambito();
        this.Lista = new Array();
    }
    aumetarAbmito() {}
    disminuirAmbito() {}
    buscarVariable(nombre:string) {}
    /*
    agregarVariable(nombre:string,visibilidad:string,tipo:string) {
      
    }*/
    getActual() {}
    existVarAmbitoActual(nombre:string) { 

    }


}