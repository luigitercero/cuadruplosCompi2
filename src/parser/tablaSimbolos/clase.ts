import Tabla from "./tabla";
import Metodo from "./metodo";
import Ambito from "./ambito";
import Simbolo from "./simbolo";
import { text } from "body-parser";

export default class Clase{
    public nombre :string;
    public poss : number;
    public tabla : Tabla;
    public metodo:Metodo[];
    public importar:Clase[];

    constructor (nombre:string, poss:number) {
        this.nombre = nombre;
        this.poss = poss;
        this.tabla = new Tabla();
        this.crearEsto();
        this.crearPila();
        this.metodo = new Array();
        this.importar = new Array<Clase>();
    }    

    private crearEsto () {
        this.tabla.esto = new Ambito();
    }

   private crearPila () {
        let global = new Ambito();
        global.prefijo = this.nombre;
        global.agregarSimbolo(new Simbolo("retorno","publico","todo"));
        global.agregarSimbolo(new Simbolo("esto","publico",this.nombre));
        this.tabla.Lista.push(global);
    }
    public agregarMetodo(metodo:Metodo){
        this.metodo.push(metodo);
    }
    public verMetodosDeClase(){
        console.log("/*****esto son los metodos de la clase "  +this.nombre + "*****/");
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
                console.log(element.id + ", " + element.getTipo() );
        }
        console.log("/*****termina los metodos de la clase "  +this.nombre + "*****/");
    }

    public verVariable(){
        console.log("/*****estas son los variablles de la clase "  +this.nombre + "*****/");
        this.tabla.verVariables();
        console.log("/*****terminal las variables de la clase "  +this.nombre + "*****/");
    }
    
    public buscarMetodo(nombre:string):Metodo{
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
            if (element.id == nombre){
                return element;
            }
        }   
        throw new Error("error al querer obterner el metodo");
    }

    public existeMetodo(nombre:string):boolean {
        for (let index = 0; index < this.metodo.length; index++) {
            const element = this.metodo[index];
            if (element.id == nombre){
                return true;
            }
        }   
        return false;

    }

    buscarSimbolo(nombre:string):Simbolo {
        let simbolo:Simbolo|null = this.tabla.buscarEnPila(nombre);
        if (  simbolo != null){
            return simbolo

        }else {
            simbolo =  this.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                
              return simbolo
                
            }
        }
       
       return new Simbolo("","","3517442");
    }

    buscarSimboloenEsto(nombre:string):Simbolo {
        let simbolo;
            simbolo =  this.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                
              return simbolo
                
            }
        
       
       return new Simbolo("","","3517442");
    }

}