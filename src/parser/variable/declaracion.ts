import Analizador from "../analizador";
import Nodo from "../nodo";
import nodoOperacion from '../exp/operacion/nodoOperacion';
import Variable from "./variable";
import Asignacion from "./asignacion";
import Simbolo from '../tablaSimbolos/simbolo';
import SIGENERICO from '../sigenerico';
export default class Declaracion extends Asignacion {

    constructor(analizador: Analizador) {
        super(analizador);
    }

    /**
    
    * Declaracion
    * : Tipo var AsignarValor 
    * | ID var AsignarValor 
    *;
    * @param nodo 
    * @param Visibilidad 
    */
    declarar(nodo: Nodo, Visibilidad: string): boolean {
        let nombre: string = nodo.childNode[0].term;
        let tipo = "";
        let variable;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
        }
        return false;
    }

    /**
     
     * Declaracion
     * : Tipo var AsignarValor 
     * | ID var AsignarValor 
     *;
     * @param nodo 
     * @param Visibilidad 
     */
    declaracion(nodo: Nodo, Visibilidad: string): boolean {
        let nombre: string = nodo.childNode[0].term;
        let tipo = "";
        let variable: nodoOperacion;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].childNode[0].location.first_line, 0);
                }
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                try {
                    variable = this.var(nodo.childNode[1], tipo, Visibilidad);
                    this.filtrarVariable(variable);
                    this.asignarValor(nodo.childNode[2], variable.simbolo);
                } catch (error) {
                    this.analizador.newError("error al delcarar variable", nodo.childNode[0].location.first_line, 0);
                }
                return true;
        }
        return false;
    }

    /**SE FILTRA EL HEAP A LAS SIGUIENTE POSICION LIBRE DEPENDIENDO SE SE USO UN ARREGLO 
     * 
     * este es solo para arreglos locales
     * 
     * */
    protected filtrarVariable(variable: nodoOperacion) {
        if (variable.simbolo.tam > 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario("desplazamiento de variable a psoicion de valores"), variable.column, variable.fila);
            let temp = this.analizador.variable.obtenerValorVariable(variable.simbolo.getNombre(), variable.fila, variable.column);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.done, variable.temp), variable.column, variable.fila);
            //this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", variable.temp, "heap"), variable.column, variable.fila);
            //this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", 1 + "", "heap"), variable.column, variable.fila);
            this.InicializarPosicionesArreglo(variable);
        }
    }
    /**
     * este codigo funciona para agregarle un valor por default a cada una de las posiciones de los arreglos
     * 
     */
    public InicializarPosicionesArreglo(variable: nodoOperacion) {
        this.analizador.agregarCodigo(
            this.analizador.genComentario("incializar arreglo local con nombre " + variable.simbolo.getNombre() + " mas tipo " + variable.simbolo.getTipo()), variable.column, variable.fila
        );
        let contador = this.analizador.newTemporal();

        this.analizador.agregarCodigo(this.analizador.asignar("0", contador), variable.column, variable.fila);
        let si: SIGENERICO = new SIGENERICO(this.analizador);
        this.analizador.agregarCodigo(si.escribirEtiquetaS(), variable.column, variable.fila);
        this.analizador.agregarCodigo(si.genSi("<", contador, variable.temp), variable.column, variable.fila)
        this.analizador.agregarCodigo(si.genSaltoFalso(), variable.column, variable.fila);
        this.analizador.agregarCodigo(si.escribirEtiquetaV(), variable.column, variable.fila);
        let valorInicial = this.analizador.variable.valorInicial(variable.simbolo);
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap("heap", valorInicial), variable.column, variable.fila
        );
        this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(), variable.column, variable.fila);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", contador, "1", contador), variable.column, variable.fila);
        this.analizador.agregarCodigo(si.escribirSaltoS(), variable.column, variable.fila);
        this.analizador.agregarCodigo(si.escribirEtiquetaF(), variable.column, variable.fila);
        //this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(), variable.column, variable.fila);
    }



    /**
     * var  
     *: ID
     *| var '[' e ']' 
     * ;
     * @param nodo 
     * @param tipo 
     * @param visibilidad 
     */
    var(nodo: Nodo, tipo: string, visibilidad: string): nodoOperacion {
        let term: string = nodo.childNode[0].term;
        let nombre: string;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                if (
                    this.analizador.claseA.tabla.buscarEnPila(nombre)
                ) this.analizador.newError("la variable existe"
                    , nodo.childNode[0].location.first_line
                    , nodo.childNode[0].location.last_column);
                else {
                    let s = new Simbolo(nombre, visibilidad, tipo);
                    this.analizador.claseA.tabla.agregarSimboloApila(s);
                    let op = new nodoOperacion("", "", nodo.childNode[0].location.last_column
                        , nodo.childNode[0].location.first_line);
                    op.simbolo = s;
                    op.simbolo.setLocacion_declaracion(nodo.childNode[0].location);
                    return op;
                }
                throw this.analizador.newError("esto no puede declararse "
                    , nodo.childNode[0].location.last_column
                    , nodo.childNode[0].location.first_line)
            case "var":
                let variable: nodoOperacion = this.var(nodo.childNode[0], tipo, visibilidad);
                let val: nodoOperacion = this.analizador.exp.analizar(nodo.childNode[2]);
                this.agregarDimAHeap(variable, val, nodo.childNode[1].location);
                return variable;
            default:
                throw this.analizador.newError("esto no puede declararse "
                    , nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line)

        }

    }

    protected agregarDimAHeap(variable: nodoOperacion, val: nodoOperacion, location: any) {
        if (variable.simbolo.tam == 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario(
                "primera posicion")
                , location.last_column, location.first_line);
            let t1 = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.genOperacion(
                "+", variable.simbolo.possAmbito + "", "ptr", t1)
                , location.last_column, location.first_line);

            this.analizador.agregarCodigo(this.analizador.saveEnPila(
                t1 + "", "heap")
                , location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genComentario(
                "saltando la primera poscion")
                , location.last_column, location.first_line)
            this.analizador.agregarCodigo(this.analizador.genOperacion(
                "+", "heap", "1", "heap"), location.last_column, location.first_line);
            //escribe el valor en el heap del primer tama;o
            this.analizador.salidaConsola("escribe una dimension");
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(
                "heap", val.valor), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion(
                "+", "heap", "1", "heap"), location.last_column, location.first_line);
            variable.temp = val.valor;
            variable.simbolo.addTam(1);
            return variable;
        } else {
            if (val.tipo == this.analizador.INT) {
                this.analizador.salidaConsola("agregando otro tama;");
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(
                    "heap", val.valor), location.last_column, location.first_line);
                this.analizador.agregarCodigo(this.analizador.genOperacion(
                    "+", "heap", "1", "heap"), location.last_column, location.first_line);
                let CrearTam = this.analizador.newTemporal();
                //en esta etapa estoy reservando el tama;o real que estara tomando el arreglo en el futrua
                this.analizador.agregarCodigo(this.analizador.genOperacion(
                    "*", variable.temp, val.valor, CrearTam), location.last_column, location.first_line);
                variable.temp = CrearTam;
                variable.simbolo.addTam(1);
                return variable;
            } else {
                this.analizador.newError("no se pudo evaluar el tipo", location.first_line, location.last_column);
            }
        }
    }
}