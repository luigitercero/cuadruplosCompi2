import Operacion from "./operacion";

export default class Exp extends Operacion{
    evaluarTipo(valorTipo: string, simboloTipo: string): boolean {
        if(simboloTipo == this.analizador.DOUBLE){
            return this.evaluarDouble(valorTipo);
        }

        else if(simboloTipo == this.analizador.INT){
            return this.evaluarnumber(valorTipo);
        }else if(simboloTipo == this.analizador.CARACTER){
            return this.evaluarCaracter(valorTipo);
        }else{
            return simboloTipo == valorTipo;
        }
    }

    private evaluarDouble(valorTipo:string):boolean{
        if(valorTipo == this.analizador.DOUBLE){
            return true;
        }else if(valorTipo == this.analizador.BOOLEANO){
            return true;
        }else if(valorTipo == this.analizador.INT){
            return true;
        }else if(valorTipo == this.analizador.CARACTER){
            return true;
        }else{
          
            return false;
        }
    }
    private evaluarnumber(valorTipo:string):boolean{
        if(valorTipo == this.analizador.DOUBLE){
            return false;
        }else if(valorTipo == this.analizador.BOOLEANO){
            return true;
        }else if(valorTipo == this.analizador.INT){
            return true;
        }else if(valorTipo == this.analizador.CARACTER){
            return true;
        }else{
            return false;
        }
    }
    private evaluarCaracter(valorTipo:string):boolean{
        if(valorTipo == this.analizador.DOUBLE){
            return false;
        }else if(valorTipo == this.analizador.BOOLEANO){
            return true;
        }else if(valorTipo == this.analizador.INT){
            return true;
        }else if(valorTipo == this.analizador.CARACTER){
            return true;
        }else{
            return false;
        }
    }

    evaluarPP(variable:Dir) {

    }
    evaluarMM(variable:Dir) {

    }
    masIgual(variable:Dir)
    
} 