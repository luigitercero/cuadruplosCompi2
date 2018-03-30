import Operacion from "./operacion";

export default class Exp extends Operacion{
    evaluarTipo(valorTipo: string, simboloTipo: string): boolean {
        if(simboloTipo == "double"){
            return this.evaluarDouble(valorTipo);
        }

        else if(simboloTipo == "int"){
            return this.evaluarnumber(valorTipo);
        }else if(simboloTipo == "caracter"){
            return this.evaluarCaracter(valorTipo);
        }else{
            return simboloTipo == valorTipo;
        }
    }

    private evaluarDouble(valorTipo:string):boolean{
        if(valorTipo == "double"){
            return true;
        }else if(valorTipo == "boolean"){
            return true;
        }else if(valorTipo == "int"){
            return true;
        }else if(valorTipo == "caracter"){
            return true;
        }else{
            return false;
        }
    }
    private evaluarnumber(valorTipo:string):boolean{
        if(valorTipo == "double"){
            return false;
        }else if(valorTipo == "boolean"){
            return true;
        }else if(valorTipo == "int"){
            return true;
        }else if(valorTipo == "caracter"){
            return true;
        }else{
            return false;
        }
    }
    private evaluarCaracter(valorTipo:string):boolean{
        if(valorTipo == "double"){
            return false;
        }else if(valorTipo == "boolean"){
            return true;
        }else if(valorTipo == "int"){
            return true;
        }else if(valorTipo == "caracter"){
            return true;
        }else{
            return false;
        }
    }
    
} 