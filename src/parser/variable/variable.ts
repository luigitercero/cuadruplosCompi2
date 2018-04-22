import Analizador from '../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
import Simbolo from '../tablaSimbolos/simbolo'

import nodoOperacion from '../exp/operacion/nodoOperacion';
import { error } from 'util';
import Clase from '../tablaSimbolos/clase';
import Dir from './obtenerDireccion'
import Location from '../location';
import Metodo from '../tablaSimbolos/metodo';
export default class Variable{
      
    public analizador:Analizador;
    constructor(analizdor:Analizador){
        this.analizador = analizdor;
    }

 /**
     * 
     * @param nodo Identi
     *:var
     *|getMetodo
     *|Identi '->' var
     *|Identi '->' getMetodo
     *|Identi '.' var
     *|Identi '.' getMetodo
     *| THIS '.' VAR
     *;   
     */
    identi(nodo:Nodo):nodoOperacion {
        let term = nodo.childNode[0].term
        let variable:Dir;
        let valor;
        switch(term) {
            case "var" :
            variable = this.analizador.variable.var(nodo.childNode[0]);
            return this.gerVal( variable);
             case "getMetodo" :
             return this.getmetodo(nodo.childNode[0])
            case "Identi" :
            return this.identi(nodo.childNode[0]);
        } 
        throw this.analizador.newError("error en identi",0,0);
    }


    gerVal(variable:Dir) : nodoOperacion{
        let val = this.analizador.variable.getValorVariable(variable);
        return new nodoOperacion(val,variable.simbolo.getTipo(),variable.location.last_column,variable.location.first_line);
    }


    getmetodo(nodo:Nodo):nodoOperacion {
        let l = nodo.childNode[0].location;
        let metodo:Metodo = this.analizador.cuerpo.getMetodo(nodo);
        let tam  = this.analizador.claseA.tabla.ptr;
        let t1 = this.analizador.newTemporal();
        let t2 = this.analizador.newTemporal();
        let mov = this.analizador.genOperacion("+","ptr",tam+"",t1);
        let getR = this.analizador.getEnPila(t1,t2);

        this.analizador.agregarCodigo(mov,l.last_column,l.first_line);
        this.analizador.agregarCodigo(getR,l.last_column,l.first_line);
       
        return  new nodoOperacion(t2,metodo.getTipo(),l.last_column,l.first_line);



    }
    /**
     * obtengo la direccion de la variable
     * var  
     *: ID
     *| var '[' e ']' 
     * ;
     * @param nodo // nodo var
     * @param tipo //tipo
     * @param visibilidad  "visibilidad"
     */
    var(nodo:Nodo) :Dir {
        let term = nodo.childNode[0].term;
        let nombre:string;
        let location;
        let simbolo
        let valor:nodoOperacion;
        let variable:Dir;
        switch(term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                location = nodo.childNode[0].location;
                simbolo  = this.analizador.claseA.buscarSimbolo(nombre);
                //Obtener direccion de la variable
                variable = this.analizador.variable.obtenerDirVariable(nombre,location.first_line,location.last_column);
                variable.addLocation(location);
            return variable;
            case "var":
                variable = this.var(nodo.childNode[0]);
                variable.tam = variable.tam +1;
                valor = this.analizador.exp.analizar(nodo.childNode[2]);
                this.validarArreglo(variable,valor);
            return variable;
        }
        throw this.analizador.newError("error al intetar recorrer var en operaciones",0,0);
    }

 /**
     * esto se usa cuando se esta declarando un arreglo
     * @param variable es un nodo temporal para evaluar la variable
     * @param possArreglo contienen la posicion para poder escribir el arreglo
     */
    validarArreglo(variable:Dir,possArreglo:nodoOperacion){
        let fila = variable.location.first_line;
        let column = variable.location.last_column;
        if (possArreglo.tipo == this.analizador.INT ){
            if(variable.tam == 1){
                
                variable.dir = this.getVAlorD(variable);
                variable.done = "heap";
                variable.temporal=possArreglo.valor;
                
            }else{
               
                let temp3 = this.getTamDim(variable,variable.tam);
                let temp4 = this.analizador.newTemporal();
                let temp5 = this.analizador.newTemporal();

                /**variamble.temp tiene el valor anterior de la posicion de arreglo donde se quiere acceder
                 * temp3 tiene el tam;o que la dimension tiene anterios
                */
                //aqui ando mapeando el arreglo
                this.analizador.agregarCodigo(this.analizador.genOperacion("*",variable.temporal,temp3,temp4),
                column,fila
                );
                //aqui mapeo la segunda posicion 
                this.analizador.agregarCodigo(this.analizador.genOperacion("+",temp4,possArreglo.valor,temp5),
                column,fila
                );
               variable.temporal = temp5;
            }
        }else{
            this.analizador.newError("error al querer acceder posicion de memoria " ,fila,column);

        }
        
    }
    /**
     * obtiene desde el heap el tama;o de una dimesion del arreglo
     * @param variable 
     * @param dim 
     */
    getTamDim(variable:Dir,dim:number) {
        let possHeap = variable.dir;
        
        let temp1 = this.analizador.newTemporal();
        let temp2 = this.analizador.newTemporal();

         //me muevo en la heap a posicion en donde esta el tama;o del arreglo
         this.analizador.log("estoy en la dimension " + dim  + " de la variable " + variable.simbolo.getNombre());
         
        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
         this.analizador.agregarCodigo(this.analizador.genOperacion("+",variable.dir,dim-1+"",temp1),
         variable.location.last_column,variable.location.first_line
         );
        
         //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1,temp2),
       variable.location.last_column, variable.location.first_line,);
        this.analizador.log("se obtuvo el tama;o de la dimension " + (dim -1)  + " de la variable " + variable.simbolo.getNombre() + " en " + temp2);

        return temp2;
         
    }

    getValorVariable(varibale:Dir){
        let cuadruplo:string = "";
        if (varibale.tam >0) {
            let temp = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+',varibale.dir,varibale.temporal,temp);
            varibale.temporal = temp;
            this.analizador.agregarCodigo(cuadruplo,varibale.location.last_column, varibale.location.first_line);
            let temp1 = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+',temp,varibale.tam+1+"",temp1);
            varibale.temporal = temp1;
            this.analizador.agregarCodigo(cuadruplo,varibale.location.last_column, varibale.location.first_line);

        }
       
        return this.getVAlorD(varibale);
    }
    /**
     * obtiene el valor de la posicion a partir de una direccion
     * @param varibale 
     */
    getVAlorD(varibale:Dir){
        
        let cuadruplo:string = "";
        
        let temp = this.analizador.newTemporal();
        if (varibale.done == "heap"){
            cuadruplo =    this.analizador.getEnHeap(
                    varibale.temporal,temp
                );
        }else if (varibale.done == "pila"){
            cuadruplo =  this.analizador.getEnPila(
                    varibale.temporal,temp
                );
        }
        this.analizador.agregarCodigo(cuadruplo,varibale.location.last_column, varibale.location.first_line);
        return temp;
    }
    private moverseEnArreglo(variable:Dir,possArreglo:nodoOperacion){
        let temp1 = this.analizador.newTemporal();
        let temp2 = this.analizador.newTemporal();

        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
         this.analizador.agregarCodigo(this.analizador.genOperacion("+",variable.dir,possArreglo.valor,temp1),
         variable.location.last_column,variable.location.first_line
         );
        
         //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1,temp2),
        variable.location.last_column,variable.location.first_line);
         
        return temp2;
    }
    /**
     * AGREGANDO VALOR A VARIABLES DESPUES DE DECLARARSE
     */
    public evaluarAsignacionasignarValor(simbolo:Simbolo){
        let nodo :Nodo = simbolo.valor.getNodo();
        let nombre = nodo.term;
        let location= simbolo.valor.location;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        let temp: string;
        let pos: string
        switch(nombre){
            
            case "e":
            let resultado:nodoOperacion = this.analizador.exp.analizar(nodo);
            if(this.analizador.exp.evaluarTipo(resultado.tipo , simbolo.getTipo())) {
                let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                let temp = this.obtenerDirVariable(simbolo.getNombre(),
                location.first_line,location.last_column);
                
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.temporal,val),
                location.last_column,location.first_line);
                
                this.analizador.agregarCodigo(this.analizador.genComentario
                    ("fin de agregacion de valor a la variable "+ simbolo.getNombre())
                    ,location.last_column,location.first_line);// es un comentario
                    return true;
                
            }else{
             throw this.analizador.newError("error por compatibilidad de tipos ",location.first_line,location.last_column)
            }
            
            case "Nuevo":
            throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)

            case "Lista":
            throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)

        }
        this.analizador.newError("asinganr valor",location.first_line,location.last_column);
        return false;

    }

    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama 
     * @param columna columna donde se llama
     */
    obtenerDirVariable(nombre:string,linea:number,columna:number):Dir{
        let simbolo:Simbolo|null = this.analizador.claseA.tabla.buscarEnPila(nombre);
        if (  simbolo != null){
            let temp =  this.getDirEnPila(nombre,linea,columna,simbolo);
            return new Dir(temp,"pila",simbolo);
        }else {
            simbolo =  this.analizador.claseA.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                let temp = this.getDirEnHeap(nombre,linea,columna,simbolo);
                return new Dir(temp,"heap",simbolo);
            }
        }
       throw this.analizador.newError("no es posible encontrar la variable " +nombre +" ",linea,columna);
    }

    /**
     * se cambia el valor de cualquier onda
     * @param simbolo es el simbolo que se va a cambirle el valor
     * @param resultado  es el valor que se quiere ene el simbolo
     * @param location  en donde se declaro 
     */
    setValVariable(simbolo:Dir,resultado:nodoOperacion,location:Location){
        let val = this.analizador.exp.getValor(resultado);
        if (  simbolo.done == "pila"){
            this.analizador.agregarCodigo(this.analizador.saveEnPila(simbolo.dir,val),location.last_column,location.first_line);
            return true;
        }else {
       
            if (simbolo.done == "heap") {
                let t = this.validarPossdeArreglo(simbolo,location);
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(t,val),location.last_column,location.first_line);
                return true;
            }
        }
       throw this.analizador.newError("error al cambiar variables " +simbolo.simbolo.getNombre() +" ",location.first_line,location.last_column);
    }

    /**
     * esto se usa cuando se quiere agregar un nuevo valor a un arreglo sabiendo la poss exacta
     * @param simbolo simbolo
     * @param location 
     */
    private validarPossdeArreglo(simbolo:Dir,location:Location) {
        if (simbolo.simbolo.tam > 0) {
            let t1 = this.analizador.newTemporal();
            let codigoPP = this.analizador.genOperacion ("+",simbolo.dir,simbolo.temporal,t1);
            let t2 = this.analizador.newTemporal();
            let codigoPP2 = this.analizador.genOperacion ("+",t1,(simbolo.tam+1)+"",t2);
            this.analizador.agregarCodigo(codigoPP,location.last_column,location.first_line);
            this.analizador.agregarCodigo(codigoPP2,location.last_column,location.first_line);
            return t2;
        }else {
            return simbolo.dir
        }
    }

    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama 
     * @param columna columna donde se llamanombre
     */
    obtenerValorVariable(nombre:string,linea:number,columna:number):Dir{
        let simbolo:Simbolo|null = this.analizador.claseA.tabla.buscarEnPila(nombre);
        let dir
        if (  simbolo != null){
                dir= this.getDirEnPila(nombre,linea,columna,simbolo);
                let temp=this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.getEnPila(dir,temp),columna,linea);
                let v = new Dir(dir,"pila",simbolo);
                v.done = temp;
                return v;
        }else {
            simbolo =  this.analizador.claseA.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
               dir=  this.getDirEnHeap(nombre,linea,columna,simbolo);
               let temp=this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.getEnHeap(dir,temp),columna,linea);
                new Dir(dir,"heap",simbolo);
                let v = new Dir(dir,"heap",simbolo);
                v.done = temp;
                return v;
            }
        }
       throw this.analizador.newError("no es posible encontrar la variable",linea,columna);
       

    }


    private getDirEnPila(nombre:string,linea:number,columna:number,simbolo:Simbolo){
        let temp: string;
        let pos: string
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+',"ptr", simbolo.possAmbito+"", pos),
             columna,linea);//buscar en pila el this
            return pos
    }

    private getDirEnHeap(nombre:string,linea:number,columna:number,simbolo:Simbolo){
        this.analizador.agregarCodigo(this.analizador.genComentario
            ("obteniendo direccion de memoria de variable "+ simbolo.getNombre())
            ,columna,linea);// es un comentario
        
        let temp: string;
        let pos: string
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+',"ptr","1",pos),
             columna,linea);//buscar en pila el this
       
        temp = this.analizador.newTemporal();//temp contiene el dato en heap
        this.analizador.agregarCodigo(this.analizador.getEnPila(pos,temp),
        columna,linea);// valor en la pila en this
        let temp1 = this.analizador.newTemporal();
        
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+',temp,simbolo.possAmbito+"",temp1),
             columna,linea);//moverse en heap
            return temp1;
    }
    

    /**
     * Lista
     *: List '}'
     *;
    */
    lista(nodo:Nodo,simbolo:Simbolo){
        //this.list(simbolo)
    }
    /**
     *List
     *: '{' DefList
     *| List ',' DefList
     *;
    */
    list(nodo:Nodo,simbolo:Simbolo){
        let nombre = "";
        switch(nombre){
            case "'{'":
               // this.defList(simbolo);
            case "List":
               // this.list(simbolo)
             //   this.defList(simbolo);
        } 
    }

    /**
     *DefList
     *: e
     *| Lista
     *| Nuevo
     *;
    */  
    private defList(nodo:Nodo,simbolo:Simbolo){

    }

    public agregarDimAHeap(variable:nodoOperacion,val:nodoOperacion,location:any){
        if (variable.simbolo.tam == 0) {
                this.analizador.salidaConsola("iniciado variable con tama;o 0");
                this.analizador.agregarCodigo(this.analizador.saveEnPila(variable.simbolo.possAmbito + "","heap"),location.last_column,location.first_line);
                this.analizador.agregarCodigo(this.analizador.genComentario("saltando la primera poscion"),location.last_column,location.first_line)
                this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap","1","heap"),location.last_column,location.first_line);
                //escribe el valor en el heap del primer tama;o
                return this.dimension1(variable,val,location);
            }else{

                return this.dimensionAny(variable,val,location)
        }      
    }
    private dimension1(variable:nodoOperacion,val:nodoOperacion,location:any) {
        this.analizador.salidaConsola("escribe una dimension");
        this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap",val.valor),location.last_column,location.first_line);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap","1","heap"),location.last_column,location.first_line); 
        variable.temp = val.valor;
        variable.simbolo.addTam(1);
    }
    private dimensionAny(variable:nodoOperacion,val:nodoOperacion,location:any) {

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
    

    public agregarDimAHeapGLOBAL(variable:nodoOperacion,val:nodoOperacion,location:any){
        if (variable.simbolo.tam == 0) {

              //OBTENGO LA POSICION
                let temp = this.analizador.variable.obtenerDirVariable(variable.simbolo.getNombre(),
                0,variable.simbolo.linea);
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.dir,"heap"),
                0,variable.simbolo.linea);
                this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(),location.last_column,location.first_line);
                //escribe el valor en el heap del primer tama;o
                return this.dimension1(variable,val,location);
            }else{
                return this.dimensionAny(variable,val,location)
        }      
    }


}