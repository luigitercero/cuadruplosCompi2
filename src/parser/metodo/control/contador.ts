import Analizador from '../../analizador';
import Nodo from '../../nodo';
import nodoOperacion from '../../exp/operacion/nodoOperacion';
import Salida from './nodoSalida';
import Control from './control';
import Comparacion from '../../exp/operacion/comparacion';
import cuerpo from '../cuerpo';
import Location from '../../location';
import Simbolo from '../../tablaSimbolos/simbolo';


export default class CONTADOR {
    private control:Control
    constructor (control:Control) {
        this.control = control;
    }
    /**
     *
     *COUNT Expresion Cuerpo
     *;
     * @param nodo 
     * @param ciclo 
     */
    ejecutar(nodo:Nodo,ciclo:Salida) {
        let location = nodo.childNode[0].location;
        this.control.analizador.claseA.tabla.aumetarAbmito();
        let exp:nodoOperacion = this.control.analizador.exp.analizar(nodo.childNode[1].childNode[1]);
        //let poss = this.control.analizador.claseA.tabla.agregarSimboloApila(new Simbolo("$$","",this.control.analizador.INT));
        let t0 = this.control.analizador.newTemporal();
        //let t11 = this.control.analizador.newTemporal();
        ciclo.start.push(this.control.analizador.newEtiqueta());
        let cuerpo = nodo.childNode[2];
        
        /*declarar variable de conteo en la poss 
        this.control.analizador.agregarCodigo(
            this.control.analizador.saveEnPila(poss+"",0+""),location.last_column,location.first_line
        );
        escribir etiqueta start 
        this.escribirEtiquetaStart(ciclo,nodo.childNode[0].location);
        obtener valor del contador 
        this.control.analizador.agregarCodigo(
            this.control.analizador.getEnPila(poss+"",t0),location.last_column,location.first_line
        );
      sumar un uno al contador
        this.control.analizador.agregarCodigo(
            this.control.analizador.genOperacion("+",t0,1+"",t11),location.last_column,location.first_line
        );
        guardar la suma del contador
        this.control.analizador.agregarCodigo(
            this.control.analizador.saveEnPila(poss+"",t11),location.last_column,location.first_line
        );*/
       
        /**valor del contador 0 */
        this.control.analizador.agregarCodigo(this.control.analizador.asignar(t0,"0"),location.last_column,location.first_line);
        /*escribir etiqueta start */
        this.escribirEtiquetaStart(ciclo,nodo.childNode[0].location);
        /*sumar un uno al contador */
        this.control.analizador.agregarCodigo(
            this.control.analizador.genOperacion("+",t0,1+"",t0),location.last_column,location.first_line
        );
        /*evaluar si finalizo el contador*/
        let op = new nodoOperacion(t0,this.control.analizador.INT,location.last_column,location.first_line);
        let c = new Comparacion(op,exp,this.control.analizador,"==");
        let value = c.evaluar();
        /*agregando etiquetas falsas si son falsas deberia seguir contando */
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
            value.etiquetaF),location.last_column,location.first_line);
        /*agregando el cuerpo  */
        this.control.cuerpo(cuerpo,ciclo);
        /*despues de ejecutar al cuerpo regresa */
        this.escribirSaltoStart(ciclo,nodo.childNode[0].location);
        
        /*escribe etiquetas verdaderas por que aaqui salen */
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(
            value.etiquetaV),location.last_column,location.first_line);
         /*etiquetas de salida */
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