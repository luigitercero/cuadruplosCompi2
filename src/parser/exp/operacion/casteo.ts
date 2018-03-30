
import Operacion from './operacion';
import Analizador from '../../../analizador';
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
            throw new Error("errro de nulo no es posible operar" )
        }else if (this.arg0.tipo == "boolean" && this.arg1.tipo == "int"){
            return this.boleanNumber();
        }else if (this.arg0.tipo == "boolean" && this.arg1.tipo == "double"){
            return this.booleanDouble();
        }else if (this.arg0.tipo == "boolean" && this.arg1.tipo == "caracter") {
            return this.boleanCaracter();
        }else if (this.arg1.tipo == "boolean" && this.arg0.tipo ==  "int"){
            return this.numberBolean();
        }else if (this.arg1.tipo == "boolean" && this.arg0.tipo == "double"){
            return this.doubleBoolean();
        }else if (this.arg1.tipo == "boolean" && this.arg0.tipo == "caracter") {
            return this.caracterBolean();
        }
        
        else if(this.arg0.tipo == "string" || this.arg1.tipo=="string"){
            return this.stringString();
        }
        else if (this.arg0.tipo == "boolean" && this.arg1.tipo == "boolean") {
            return this.booleaBolean();
        }else if(this.arg0.tipo ==  "int" && this.arg1.tipo ==  "int") {
            return this.numberNumber();
        }else if(this.arg0.tipo == "double" && this.arg1.tipo == "double") {
            return this.doubleDouble();
        }else if(this.arg0.tipo == "caracter" && this.arg1.tipo == "caracter") {
            return this.caracterCaracter();
        }else if (this.arg0.tipo == "double" || this.arg1.tipo =="double") {
            return this.doubleDouble();
        }else if(this.arg0.tipo == "caracter" || this.arg1.tipo == "caracter"){
            return this.caracterCaracter();
        }else {
            return this.numberNumber();
        }
       
        
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