import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';
import Comparacion from '../../exp/operacion/comparacion';
import cuerpo from '../cuerpo';
import Location from '../../location';


export default class DCONDICION {
    private control:Control
    constructor (control:Control) {
        this.control = control;
    }
    /**
     * DOBLECONDICION '(' e ',' e ')'Cuerpo
     *
     * @param nodo 
     * @param ciclo 
     */
    ejecutar(nodo:Nodo,ciclo:Salida) {
        //escribimos un or
        this.control.analizador.claseA.tabla.aumetarAbmito();
        let start = this.control.analizador.newEtiqueta();
        ciclo.start.push(start);
        let arg0 = nodo.childNode[2];
        let arg1 = nodo.childNode[4];
        let et = this.control.analizador.exp.operarOr(arg0,arg1);
        ciclo.addEtiquetaSS(et.etiquetaF);
        this.escribirEtiquetaStart(ciclo,nodo.childNode[0].location);
        let et2 = this.control.analizador.exp.operarAnd(arg0,arg1);
        ciclo.addEtiquetaSS(et2.etiquetaF);        
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(et.etiquetaV),
            et.column,et.fila);
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(et2.etiquetaV),
            et2.column,et2.fila);
        let cuerpo = nodo.childNode[6];
        this.control.cuerpo(cuerpo,ciclo);
        this.escribirSaltoStart(ciclo,nodo.childNode[0].location);
        this.escribirEtiquetaSalida(ciclo,nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito(); 
    }

    private escribirEtiquetaSalida(ciclo:Salida,location:Location) {
        if (ciclo.etiquetaS.length>0){
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
                ciclo.etiquetaS),location.last_column,location.first_line
            );
        }
    }
    private escribirEtiquetaStart(ciclo:Salida,location:Location) {
        if (ciclo.start.length>0){
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
                ciclo.start),location.last_column,location.first_line
            );
        }
    }

    private escribirSaltoStart(ciclo:Salida,location:Location) {
        if (ciclo.etiquetaS.length>0){
            this.control.analizador.agregarCodigo(this.control.analizador.genSalto(
                ciclo.start[0]),location.last_column,location.first_line
            );
        }
    }

    private errorIf( exp:nodoOperacion) {
        if ( exp.tipo == this.control.analizador.BOOLEANO){

        }else {
            this.control.analizador.newError("existe error al intentar operar el IF",exp.fila,exp.column);
        }
    }




    private ifSimple(exp:nodoOperacion,cuerpo:Nodo,ciclo:Salida) {
        this.errorIf(exp);
        //sentecias verdaderas
        this.control.analizador.agregarCodigo(this.control.analizador
            .escribirEtiqueta(exp.etiquetaV),
            exp.column,exp.fila);
        this.control.cuerpo(cuerpo,ciclo);  
    }

    


    
}