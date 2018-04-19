import Operacion from "./operacion";
import Nodo from "../../nodo";
import Dir from '../../variable/obtenerDireccion'
import nodoOperacion from "./nodoOperacion";
import Suma from "./suma";

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


    evaluarPP( variable:Dir,signo:string) {
        let arg1:nodoOperacion = new nodoOperacion(1+"",this.analizador.INT,variable.location.last_column,variable.location.first_line);
        let arg0:nodoOperacion = this.gerVal(variable);
        let op:Suma = new Suma(this.analizador,signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    }
    masIgual(nodo:Nodo, variable:Dir,signo:string) {
        let arg1:nodoOperacion = this.analizar(nodo);
        let arg0:nodoOperacion = this.gerVal(variable);
        let op:Suma = new Suma(this.analizador,signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    }
   
}