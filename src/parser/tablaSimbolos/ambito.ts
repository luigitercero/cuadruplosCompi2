import Simbolo from './simbolo'
export default class Ambito{

    public ambito:Simbolo[]
    public prefijo:string;
    public postFijo:string[];
    public ptr:number;
    constructor() {
        this.ptr = 0; 
        this.postFijo = new Array(); 
        this.ambito = new Array();
        this.prefijo = "";
    }

    buscarVariable(nombre:string) {}
    agregarVariable(nombre:string,visibilidad:string,tipo:string) {
        let simbolo = new Simbolo(nombre,visibilidad,tipo);
        this.ambito.push(simbolo);
        simbolo.possAmbito = this.ptr
        this.ptr ++;
        return simbolo;
    }
    agregarSimbolo(simbolo : Simbolo) {
       this.ambito.push(simbolo);
       simbolo.possAmbito = this.ptr
       this.siguietePosicionLibre(simbolo);
    }

    siguietePosicionLibre(simbolo:Simbolo){
        this.ptr = this.ptr + simbolo.getTamanio();
    }
    existeVariable(nombre:string) :boolean {
        for (let index = 0; index < this.ambito.length; index++) {
            if (this.ambito[index].getNombre() == (nombre)){
                return true;
            }
            
        }
        return false;
    }

    getSize():number {return this.ambito.length;}




}