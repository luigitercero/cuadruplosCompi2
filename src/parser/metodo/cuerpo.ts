import Variable from './variable';
import Analizador from '../analizador';
import Asignacion from './asignacion'
import Nodo from '../nodo';
import Declaracion from './declaracion';
import Control from './control/control';
import Metodo from '../tablaSimbolos/metodo';
import Salida from './control/nodoSalida';
import { error } from 'util';
import nodoOperacion from '../exp/operacion/nodoOperacion';
import Primitivas from './primitivas/primitivas'
import Location from '../location';

export default class cuerpo {
    public asignar:Asignacion;
    public declarar:Declaracion;
    public control:Control;
    public variable:Variable;
    private analizador:Analizador;
    private primitivas:Primitivas;
    constructor(analizador:Analizador) {
        this.analizador = analizador;
        this.asignar = new Asignacion(analizador);
        this.variable = new Variable(analizador);
        this.declarar = new Declaracion(analizador);
        this.control = new Control(analizador);
        this.primitivas  = new Primitivas(analizador);
    }
/**
     * CuerpoMetodo
     *   : Declaracion
     *   | Asignacion
     *   | getMetodoZ ';'
     *   | Control
     *   | Branching ';'
     *   ;
     * @param nodo 
     */
    public cuerpoMetodo(nodo:Nodo,ciclo?:Salida):Salida {
        let term = nodo.childNode[0].term
        if (ciclo == null) {
            ciclo = new Salida();
        }
        switch(term){
            case "Declaracion":
            this.declarar.declaracion(nodo.childNode[0],"");
            return ciclo;
            case "Asignacion":
            this.asignar.asignacion(nodo.childNode[0]);
            return ciclo;
            case "getMetodoZ":
            this.getMetodoZ(nodo.childNode[0]);
            return ciclo;
            case "Control":
            this.control.control(nodo.childNode[0],ciclo);
            return ciclo;
            case "Branching":
            this.branching(nodo.childNode[0],ciclo);
            return ciclo;
        }

        throw this.analizador.newError("error em cuerpo metodo",0,0);
        
    }

    private branching(nodo:Nodo,ciclo:Salida) :Salida {
        let term =  nodo.childNode[0].term;
        let location = nodo.childNode[0].location;;
        let salida:Salida;
        switch (term) {
           case "BREAK":
           this.analizarCiclo(ciclo,location);
                let l1 = this.analizador.newEtiqueta();
                this.analizador.agregarCodigo(this.analizador.genSalto(l1),location.last_column,location.first_line);
                ciclo.addEtiquetaS(l1,location);
            return ciclo;
            case "CONTINUE":
            this.analizarCiclo(ciclo,location);
                this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(ciclo.start),location.last_column,location.first_line);
            return ciclo;
            case "RETURN":
                l1 = this.analizador.newEtiqueta();
                this.analizador.agregarCodigo(this.analizador.genSalto(l1),location.last_column,location.first_line);
                ciclo.addEtiquetaR(l1,location);
            return ciclo;        
        }
        throw this.analizador.newError("existe un error al buscar braching",0,0);
    }
    private analizarCiclo(ciclo:Salida,location:any) {
        if (ciclo.isCiclo){
            return true;
        }
        throw this.analizador.newError("no estamos para hacer un ciclo",0,0)
    }
    /**
     * getMetodoZ 
     *  : Navegar  getMetodo  
     *  | getMetodo 
     *  ;
     * @param nodo 
     */
    private getMetodoZ (nodo:Nodo) {
        let term = nodo.childNode[0].term
        switch (term) {
            case "Navegar":
            return true;
            case "getMetodo":
            this.getMetodo(nodo.childNode[0]);
            return true;
        }
    }
    /**
     * getMetodo
     * : ID '(' getParametro
     * | Primitivas '(' getParametro
     * | Tipo '(' getParametro
     * ;
     * @param nodo 
     */
    private getMetodo (nodo:Nodo) {
        let term = nodo.childNode[0].term
        let nombre;
        switch(term) {
            case "ID" :
            nombre = nodo.childNode[0].token;
            this.metodoID(nombre,this.getParametro(nodo.childNode[2]),nodo.childNode[0].location);
            return
            case "Primitivas" :
            nombre = nodo.childNode[0].childNode[0].term;
            this.primitivas.analizar(nombre,this.getParametro(nodo.childNode[2]));
            return
            case "Tipo" :


        }
    }

    /**
     * getParametro 
    : ParametroM ')'
    | ')'
    ; 
    */
    private getParametro(nodo:Nodo) {
        let term = nodo.childNode[0].term;
        let parametro:nodoOperacion [] = new Array()
        switch(term) {
            case "ParametroM":
            this.parametroM(nodo.childNode[0],parametro);
            return parametro;
            default: return parametro;
        }
    }


    /** 
        ParametroM 
            : ParametroM ',' e
            | ParametroM ',' Tipo
            | ParametroM ',' Nuevo
            | e
            | Tipo
            | Nuevo
            ;
     */
    private parametroM(nodo:Nodo,parametro:nodoOperacion[]) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "ParametroM" :
            this.parametroM(nodo.childNode[0],parametro);
            this.parametroM(nodo.childNode[1],parametro);
            case "e":
            parametro.push(this.analizador.exp.analizar(nodo.childNode[0]));
            return true;
        }   
    }
    
    private metodoID(nombre:string, parametoM:nodoOperacion[],location:Location) {
        let tam=this.analizador.claseA.tabla.ptr
        //obtengo la direccion donde esta this o esto  
        let esto = this.analizador.variable.obtenerValorVariable("esto",location.first_line,location.last_column);
        //aqui empiza el ambito simulado
        let temp = this.analizador.claseA.tabla.ptr;//en esta posicion se encuentra el retorno
        temp ++; //en esta posicion se guarda this
        
        let t2 = this.analizador.newTemporal()
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+","ptr",temp+"",t2),location.last_column,location.first_line
        );

        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t2,esto.done),location.last_column,location.first_line
        );
        temp ++;//siguiete posicionlibre

        let param = "";
        for (let index = 0; index < parametoM.length; index++) {
            let t1 = this.analizador.newTemporal();
            
            this.analizador.agregarCodigo(
                this.analizador.genOperacion("+","ptr",temp+"",t1),parametoM[index].column,parametoM[index].fila
            );

            this.analizador.agregarCodigo(
                this.analizador.saveEnPila(t1,parametoM[index].valor),parametoM[index].column,parametoM[index].fila
            );
            param = param + "_" + parametoM[index].tipo;
            temp ++;
        }

        
        let metodoNombre = nombre+param;
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+","ptr",tam+"","ptr"),location.last_column,location.first_line
        );
        let metodo = this.analizador.claseA.buscarMetodo(metodoNombre);
        this.analizador.agregarCodigo(
            this.analizador.llamarMetodo("metodo"+metodo.id),location.last_column,location.first_line
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("-","ptr",tam+"","ptr"),location.last_column,location.first_line
        );
    }

}