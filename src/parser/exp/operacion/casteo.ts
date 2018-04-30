
import Operacion from './operacion';
import Analizador from '../../analizador';
import nodoOperacion from './nodoOperacion';
export default class Casteo{
    arg0: nodoOperacion;
    arg1: nodoOperacion;
    analizador: Analizador

    constructor(arg0:nodoOperacion,arg1:nodoOperacion,analizador:Analizador){
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.analizador = analizador;
    }

    setArg0(nodoOperacion:nodoOperacion){
        throw this.analizador.newError("no se ha implementado el metodo set arg0" , this.arg0.column,this.arg0.fila);
    }
    setArg1(nodoOperacion:nodoOperacion){
        throw this.analizador.newError("no se ha implementado el metodo set arg1" , this.arg0.column,this.arg0.fila);
    }
    evaluar():nodoOperacion{
        if (this.arg0.tipo == 35174492+"" || this.arg1.tipo==35174492+"" ){
            return this.evaluarObjeto();
        }else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.INT){
            return this.boleanNumber();
        }else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.DOUBLE){
            return this.booleanDouble();
        }else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.CARACTER) {
            return this.boleanCaracter();
        }else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo ==  this.analizador.INT){
            return this.numberBolean();
        }else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo == this.analizador.DOUBLE){
            return this.doubleBoolean();
        }else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo == this.analizador.CARACTER) {
            return this.caracterBolean();
        }
        
        else if(this.arg0.tipo == "string" || this.arg1.tipo=="string"){
            return this.stringString();
        }
        else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.BOOLEANO) {
            return this.booleaBolean();
        }else if(this.arg0.tipo ==  this.analizador.INT && this.arg1.tipo ==  this.analizador.INT) {
            return this.numberNumber();
        }else if(this.arg0.tipo == this.analizador.DOUBLE && this.arg1.tipo == this.analizador.DOUBLE) {
            return this.doubleDouble();
        }else if(this.arg0.tipo == this.analizador.CARACTER && this.arg1.tipo == this.analizador.CARACTER) {
            return this.caracterCaracter();
        }else if (this.arg0.tipo == this.analizador.DOUBLE || this.arg1.tipo ==this.analizador.DOUBLE) {
            return this.doubleDouble();
        }else if(this.arg0.tipo == this.analizador.CARACTER || this.arg1.tipo == this.analizador.CARACTER){
            return this.caracterCaracter();
        }else {
            return this.numberNumber();
        }
         
    }
    evaluarObjeto() :nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
    }
    stringString():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
    
    }
    caracterCaracter():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    numberNumber():nodoOperacion{      
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    booleaBolean():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    numberBolean():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    boleanNumber():nodoOperacion {
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    boleanCaracter():nodoOperacion {
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
        
    }
    caracterBolean():nodoOperacion  {
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila); 
        
    }

    doubleDouble():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
    }
    booleanDouble():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
    }
    doubleBoolean():nodoOperacion{
        throw this.analizador.newError("errro de caseteo" , this.arg0.column,this.arg0.fila);
    }





   


}