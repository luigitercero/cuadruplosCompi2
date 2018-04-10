

import { error } from 'util';


import nodoOperacion from '../exp/operacion/nodoOperacion';
import Simbolo from '../tablaSimbolos/simbolo';
import Analizador from '../analizador';
import Nodo from '../nodo'
import Location from '../location';
export default class Variable {
      
   public analizador:Analizador;
    
    constructor (analizador:Analizador) {
        this.analizador = analizador

    }


    protected  filtrarVariable(variable:nodoOperacion) {
        if (variable.simbolo.tam > 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario("desplazamiento de variable a psoicion de valores"),variable.column,variable.fila);
            let temp =  this.analizador.variable.obtenerDirVariable(variable.simbolo.getNombre(),variable.column,variable.fila);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.temporal,variable.temp),variable.column,variable.fila);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",variable.temp,"heap"),variable.column,variable.fila);
        }
    }


    /**
     * var  
     *: ID
     *| var '[' e ']' 
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
     var(nodo:Nodo,tipo:string,visibilidad:string):nodoOperacion{
        let term : string = nodo.childNode[0].term;
        let nombre : string ;
        switch (term) {
            case "ID" :
                nombre = nodo.childNode[0].token;
                if (
                 this.analizador.claseA.tabla.buscarEnPila(nombre))
                 this.analizador.newError("la variable existe",nodo.childNode[0].location.first_line,nodo.childNode[0].location.last_column);
                 else {
                    let s = new Simbolo( nombre,visibilidad,tipo);
                    this.analizador.claseA.tabla.agregarSimboloApila(s);
                    let op = new nodoOperacion("","",nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line);
                    op.simbolo = s;
                    return  op;
                }
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)
            case "var":
                let variable:nodoOperacion = this.var(nodo.childNode[0],tipo,visibilidad);
                let val:nodoOperacion = this.analizador.exp.analizar(nodo.childNode[2]);
                this.agregarDimAHeap(variable,val,nodo.childNode[1].location);
                return variable; 
            default:
            throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column,nodo.childNode[0].location.first_line)

        }
       
    }

    protected agregarDimAHeap(variable:nodoOperacion,val:nodoOperacion,location:any){
        if (variable.simbolo.tam == 0) {
                this.analizador.salidaConsola("iniciado variable con tama;o 0");
                this.analizador.agregarCodigo(this.analizador.saveEnPila(variable.simbolo.possAmbito + "","heap"),location.last_column,location.first_line);
                this.analizador.agregarCodigo(this.analizador.genComentario("saltando la primera poscion"),location.last_column,location.first_line)
                this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap","1","heap"),location.last_column,location.first_line);
                //escribe el valor en el heap del primer tama;o
                this.analizador.salidaConsola("escribe una dimension");
                this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap",val.valor),location.last_column,location.first_line);
                this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap","1","heap"),location.last_column,location.first_line); 
                variable.temp = val.valor;
                variable.simbolo.addTam(1);
                return variable;
            }else{

            if (val.tipo == this.analizador.INT){
                this.analizador.salidaConsola("agregando otro tama;");
                this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap",val.valor),location.last_column,location.first_line); 
                this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap","1","heap"),location.last_column,location.first_line);
                let CrearTam = this.analizador.newTemporal();
                //en esta etapa estoy reservando el tama;o real que estara tomando el arreglo en el futrua
                this.analizador.agregarCodigo(this.analizador.genOperacion("*",variable.temp,val.valor,CrearTam),location.last_column,location.first_line);
                variable.temp = CrearTam;
                variable.simbolo.addTam(1);
                return variable;
            }else{
                this.analizador.newError("no se pudo evaluar el tipo",location.first_line,location.last_column);   
            }
        }      
        
       
    }


   


}