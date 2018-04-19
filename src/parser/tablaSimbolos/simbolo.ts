import Nodo from "../nodo";
import location from '../location'
import { error } from "util";
export default class Simbolo {
    private nombre :string;
    private visibilidad: string;
    private tipo : string;
    private dim:number[]
    public linea:number;
    public possAmbito:number;
    public tam:number;
    public valor:Valor;
    
    
    getDim(number:number){
        return this.dim[number];
    }
    constructor (nombre:string, visibilidad:string, tipo:string) {
        this.nombre = nombre;
        this.visibilidad = visibilidad;
        this.tipo = this.filtro(tipo);
        this.linea = -1;
        this.possAmbito = -1;
        /**
         * es el tama;o del arreglo
         */
        this.dim = new Array();
        this.tam = 0;
        this.valor = new Valor();
       
    }
    private filtro(tipo:string) {
        switch(tipo){
            case "entero":return "entero";
            case "decimal":return "decimal";
            case "caracter":return "caracter";
            case "booleano":return "booleano";
        }
        return tipo;
    }
    getNombre () {
        return this.nombre;
    }

    getVisibilidad () {
        return this.visibilidad;
    }
    
    getTipo ():string {
        return this.tipo;
    }
    addDimension(tam:number) {  
        this.dim.push(tam);
        this.tam = this.tam *tam;
    }
    getTamanio ():number {
        return this.tam;
    }

    addValor(nodo:Nodo,location:location){
        this.valor = new Valor(nodo,location);
    }
    addTam(tam:number) {
        this.tam = this.tam + tam;
    }
    
}
class Valor {
    public valor:Nodo|null;
    public location:location|any;
    constructor(valor?:Nodo,location?:location){
       if (valor!=null && location != null){
        this.valor = valor;
        this.location = location;
       }else{
           this.valor = null;
           
       }
    }

    getNodo():Nodo {
        if (this.valor!=null){
            return this.valor;
        }else{
            throw  error("error no debi pasar por aqui");
        }
       
    }
}