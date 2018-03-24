import nodoOperacion from './nodoOperacion';
import Operacion from './operacion';
import Analizador from '../../../analizador';
export default class Casteo{
    arg0: nodoOperacion;
    arg1: nodoOperacion;
    analizador: Analizador

    constructor(arg0:nodoOperacion,arg1:nodoOperacion,analizador:Analizador){
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.analizador = analizador;
    }

    evaluar():nodoOperacion{
        if (this.arg0.tipo == 35174492 || this.arg1.tipo==35174492 ){
            throw new Error("errro de nulo no es posible operar" )
        }else if (this.arg0.tipo == 0 && this.arg1.tipo == 1){
            return this.boleanNumber();
        }else if (this.arg0.tipo == 0 && this.arg1.tipo == 2){
            return this.boleanNumber();
        }else if (this.arg0.tipo == 0 && this.arg1.tipo == 3) {
            return this.boleanCaracter();
        }else if (this.arg1.tipo == 0 && this.arg0.tipo == 1){
            return this.numberBolean();
        }else if (this.arg1.tipo == 0 && this.arg0.tipo == 2){
            return this.numberBolean();
        }else if (this.arg1.tipo == 0 && this.arg0.tipo == 3) {
            return this.caracterBolean();
        }
        
        else if(this.arg0.tipo == 4 || this.arg1.tipo==4){
            return this.stringString();
        }
        else if (this.arg0.tipo == 0 && this.arg1.tipo == 0) {
            return this.booleaBolean();
        }else if(this.arg0.tipo == 1 && this.arg1.tipo == 1) {
            return this.numberNumber();
        }else if(this.arg0.tipo == 2 && this.arg1.tipo == 2) {
            return this.numberNumber();
        }else if(this.arg0.tipo == 3 && this.arg1.tipo == 3) {
            return this.caracterCaracter();
        }else if (this.arg0.tipo == 2 || this.arg1.tipo == 2) {
            return this.numberNumber();
        }else if(this.arg0.tipo == 3 || this.arg1.tipo == 3){
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



   


}