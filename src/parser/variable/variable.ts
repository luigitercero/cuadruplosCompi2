import Analizador from '../../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
import Simbolo from '../tablaSimbolos/simbolo'

import nodoOperacion from '../exp/operacion/nodoOperacion';
import { error } from 'util';
export default class Variable extends Operador {
      

    constructor(analizdor:Analizador){
        super(analizdor);
    }
    /**
     * DeclaracionClase
     *: Visibilidad Declaracion
     *| Declaracion
     *;
     * @param nodo 
     */
    declaracion(nodo: Nodo): boolean {
        let nombre = nodo.childNode[0].term
        let visibilidad = "private"
        switch(nombre){
            case "Visibilidad":
             visibilidad = nodo.childNode[0].childNode[0].token;
             this.declarar(nodo.childNode[1],visibilidad);
             return true;
            case "Declaracion":
             this.declarar(nodo.childNode[0],"Privado");
             return true;
        }
        return false;
    }

    /**
     
     * Declaracion
     * : Tipo var AsignarValor 
     * | ID var AsignarValor 
     *;
     * @param nodo 
     * @param Visibilidad 
     */
    declarar(nodo:Nodo, Visibilidad:string):boolean{
        let nombre:string = nodo.childNode[0].term;
        let tipo = "";
        let variable : Simbolo ;
        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2],variable);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
                }
               
            return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1],tipo,Visibilidad);
                    this.analizador.claseA.tabla.esto.agregarSimbolo(variable);
                    this.asignarValor(nodo.childNode[2],variable);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable",nodo.childNode[0].childNode[0].location.first_line,0);
            }
            return true;
        }
        return false;
    }
    /**
     * var  
     *: ID
     *| var '[' e ']' 
     *| ESTE '.'  ID
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo:Nodo,tipo:string,visibilidad:string):Simbolo{
        let term : string = nodo.childNode[0].term;
        let nombre : string ;
        switch (term) {
            case "ID" :
                nombre = nodo.childNode[0].token;
                if (
                 this.analizador.claseA.tabla.esto.buscarVariable(nombre))
                 this.analizador.newError("la variable existe",nodo.childNode[0].location.first_line,nodo.childNode[0].location.last_column);
                 else{
                    return new Simbolo( nombre,visibilidad,tipo);
                }
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)
            case "var":
                let variable:Simbolo = this.var(nodo.childNode[0],tipo,visibilidad);
                let val:nodoOperacion = this.analizador.exp.analizar(nodo.childNode[2]);
                if (val.tipo == "int"){
                    variable.addDimension( + val.valor);
                    return variable;
                }else{
                    this.analizador.newError("no se pudo evaluar el tipo",nodo.childNode[1].location.first_line,nodo.childNode[1].location.last_column);   
                }
            default:
            throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)

        }
       
    }


    /**
     * * AsignarValor
     *:';'
     *|'=' e ';'
     *|'=' Nuevo ';'
     *|'=' Lista ';' esta lista quiere decir los arreglos 0
     *;
     * 
     */
    asignarValor(nodo:Nodo,simbolo:Simbolo){
       
        let nombre:string = nodo.childNode[0].term;
        this.analizador.log("agregando valor"); 
        if(nombre == "';'"){

        }else{
            this.evaluarAsignacion(nodo.childNode[1],simbolo,nodo.childNode[0]);

        }
    }

    evaluarAsignacion(nodo:Nodo,simbolo:Simbolo,nodo2:Nodo){
        let nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        let temp: string;
        let pos: string
        switch(nombre){
            case "e":
            
            let resultado:nodoOperacion = this.analizador.exp.analizar(nodo);
            if(this.analizador.exp.evaluarTipo(resultado.tipo , simbolo.getTipo())) {
                let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                this.analizador.agregarCodigo(this.analizador.genComentario
                    ("agregando valor a las variables "+ simbolo.getNombre())
                    ,nodo2.location.first_line,nodo2.location.last_column);// es un comentario
                
                pos = this.analizador.newTemporal();
                this.analizador.agregarCodigo(
                    this.analizador.genOperacion('+',"ptr","1",pos),
                    nodo2.location.first_line,nodo2.location.last_column);//buscar en pila el this
               
                temp = this.analizador.newTemporal();//temp contiene el dato en heap
                this.analizador.agregarCodigo(this.analizador.getEnPila(pos,temp),
                nodo2.location.first_line,nodo2.location.last_column);// valor en la pila en this
                let temp1 = this.analizador.newTemporal();
                
                this.analizador.agregarCodigo(
                    this.analizador.genOperacion('+',temp,simbolo.possAmbito+"",temp1),
                    nodo2.location.first_line,nodo2.location.last_column);//moverse en heap

                this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp1,val),nodo2.location.first_line,nodo2.location.last_column);
                this.analizador.agregarCodigo(this.analizador.genComentario("aquit termina la asignacion "+ simbolo.getNombre()),nodo2.location.first_line,nodo2.location.last_column);
                simbolo.valor = true;
            }else{
             throw this.analizador.newError("error por compatibilidad de tipos ",nodo2.location.first_line,nodo2.location.last_column)
            }
            
            case "Nuevo":
            
            return true;
            case "Lista":
            return false;
        }
        return false;

    }
}