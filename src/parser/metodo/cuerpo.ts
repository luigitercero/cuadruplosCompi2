
import Analizador from '../analizador';
import Asignacion from '../variable/asignacion'
import Nodo from '../nodo';
import Declaracion from '../variable/declaracion';
import Control from './control/control';
import Metodo from '../tablaSimbolos/metodo';
import Salida from './control/nodoSalida';
import { error } from 'util';
import nodoOperacion from '../exp/operacion/nodoOperacion';
import Primitivas from './primitivas/primitivas'
import Location from '../location';

export default class cuerpo {
    public asignar: Asignacion;
    public declarar: Declaracion;
    public control: Control;

    private analizador: Analizador;
    private primitivas: Primitivas;
    constructor(analizador: Analizador) {
        this.analizador = analizador;
        this.asignar = new Asignacion(analizador);

        this.declarar = new Declaracion(analizador);
        this.control = new Control(analizador);
        this.primitivas = new Primitivas(analizador);
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
    public cuerpoMetodo(nodo: Nodo, ciclo?: Salida): Salida {
        let term = nodo.childNode[0].term
        if (ciclo == null) {
            ciclo = new Salida();
        }
        switch (term) {
            case "Declaracion":
                this.declarar.declaracion(nodo.childNode[0], "");
                return ciclo;
            case "Asignacion":
                this.asignar.asignacion(nodo.childNode[0]);
                return ciclo;
            case "getMetodoZ":
                this.getMetodoZ(nodo.childNode[0]);
                return ciclo;
            case "Control":
                this.control.control(nodo.childNode[0], ciclo);
                return ciclo;
            case "Branching":
                this.branching(nodo.childNode[0], ciclo);
                return ciclo;
        }
        throw this.analizador.newError("error em cuerpo metodo", 0, 0);
    }
    private branching(nodo: Nodo, ciclo: Salida): Salida {
        let term = nodo.childNode[0].term;
        let location = nodo.childNode[0].location;;
        let salida: Salida;
        switch (term) {
            case "BREAK":
                this.analizarCiclo(ciclo, location);
                let l1 = this.analizador.newEtiqueta();
                this.analizador.agregarCodigo(this.analizador.genSalto(l1), location.last_column, location.first_line);
                ciclo.addEtiquetaS(l1, location);
                return ciclo;
            case "CONTINUE":
                this.analizarCiclo(ciclo, location);
                this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
                return ciclo;
            case "RETURN":
                l1 = this.analizador.newEtiqueta();
                if (nodo.childNode.length > 1) {
                    this.agregarRetorno(nodo.childNode[1], nodo.childNode[0].location);
                }
                this.analizador.agregarCodigo(this.analizador.genSalto(l1), location.last_column, location.first_line);
                ciclo.addEtiquetaR(l1, location);
                return ciclo;
        }
        throw this.analizador.newError("existe un error al buscar braching", 0, 0);
    }
    private analizarCiclo(ciclo: Salida, location: any) {
        if (ciclo.isCiclo) {
            return true;
        }
        throw this.analizador.newError("no estamos para hacer un ciclo", 0, 0)
    }
    private agregarRetorno(nodo: Nodo, location: Location) {
        let op = this.analizador.exp.analizar(nodo);
        let retorno = this.analizador.variable.obtenerDirVariable("retorno", location.first_line, location.last_column);
        if (op.tipo != retorno.simbolo.getTipo()) { throw this.analizador.newError("retorno no coincide con el tipo", location.first_line, location.last_column) }
        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(retorno.dir, op.valor), location.last_column, location.first_line
        );
    }
    /**
     * getMetodoZ 
     *  : Navegar  getMetodo  
     *  | getMetodo 
     *  ;
     * @param nodo 
     */
    private getMetodoZ(nodo: Nodo) {
        let term = nodo.childNode[0].term
        switch (term) {
            case "Navegar":

                let temp = this.analizador.claseA;
                let navegar = this.analizador.variable.navegar(nodo.childNode[0]);
                this.analizador.claseA = temp;
                this.getMetodo(nodo.childNode[1], navegar);
                this.analizador.claseA = temp;
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
    public getMetodo(nodo: Nodo, esto?: nodoOperacion): any {
        let term = nodo.childNode[0].term
        let nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                return this.metodoID2(nombre, this.getParametro(nodo.childNode[2]), nodo.childNode[0].location, esto);
            case "Primitivas":
                nombre = nodo.childNode[0].childNode[0].term;
                this.primitivas.analizar(nombre, this.getParametro(nodo.childNode[2]));
                return
            case "Tipo":


        }
    }

    /**
     * getParametro 
    : ParametroM ')'
    | ')'
    ; 
    */
    private getParametro(nodo: Nodo) {
        let term = nodo.childNode[0].term;
        let parametro: nodoOperacion[] = new Array()
        switch (term) {
            case "ParametroM":
                this.parametroM(nodo.childNode[0], parametro);
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
    private parametroM(nodo: Nodo, parametro: nodoOperacion[]) {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "ParametroM":
                this.parametroM(nodo.childNode[0], parametro);
                this.parametroM(nodo.childNode[1], parametro);
                return true;
            case "e":
                parametro.push(this.analizador.exp.analizar(nodo.childNode[0]));
                return true;
        }
        throw this.analizador.newError("error parametros", 0, 0);
    }

    public nuevoObjeto(nodo: Nodo): nodoOperacion {
        let objeto = nodo.childNode[1].childNode[0].token
        let location = nodo.childNode[0].location;
        let tam = this.analizador.claseA.tabla.ptr;
        let metodo;
        this.analizador.claseA.tabla.aumetarAbmito();
        let este = this.analizador.metodoA.nuevoThis(location, objeto, tam);
        metodo = this.analizador.variable.getmetodo(nodo.childNode[1], este);
        this.analizador.claseA.tabla.disminuirAmbito();
        return metodo;

    }
    private ejecutarMetodo(nombre: string, param: string, tam: number, location: Location, esto?: nodoOperacion): Metodo {
        let coment = this.analizador.genComentario("aumentando de ambito para " + this.analizador.claseA.nombre)
        let metodoNombre = nombre + param;
        let ambitotemporal = this.analizador.claseA;
        if (esto !== undefined) {
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        let metodo: Metodo = this.analizador.claseA.buscarMetodo(metodoNombre, location);
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line
        );
        coment = this.analizador.genComentario("llamando metodo " + metodoNombre);
        this.analizador.agregarCodigo(
            this.analizador.llamarMetodo("metodo" + metodo.id) + coment, location.last_column, location.first_line
        );
        this.analizador.claseA = ambitotemporal;
        coment = this.analizador.genComentario("disminyendo de ambito para " + this.analizador.claseA.nombre)
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("-", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line
        );
        return metodo;
    }

    private metodoID2(nombre: string, parametoM: nodoOperacion[], location: Location, esto?: nodoOperacion): Metodo {
        let tam = this.analizador.claseA.tabla.ptr
        let dir;

        if (esto === undefined) {
            dir = this.analizador.variable.obtenerValorVariable("este", location.first_line, location.last_column).done;
        } else {

            dir = esto.valor;
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        let temp = this.escribirEstoAnuevoAmbito(dir, location, tam);

        let param = this.escribirParametrosApila(temp, parametoM);

        temp = temp + parametoM.length;
        return this.ejecutarMetodo(nombre, param, tam, location, esto);
    }

    private escribirParametrosApila(temp: number, parametoM: nodoOperacion[]) {
        let param = "";
        for (let index = 0; index < parametoM.length; index++) {
            let t1 = this.analizador.newTemporal();

            this.analizador.agregarCodigo(
                this.analizador.genOperacion("+", "ptr", temp + "", t1), parametoM[index].column, parametoM[index].fila
            );

            this.analizador.agregarCodigo(
                this.analizador.saveEnPila(t1, parametoM[index].valor), parametoM[index].column, parametoM[index].fila
            );
            param = param + "_" + parametoM[index].tipo;
            temp++;
        }
        return param;
    }
    private escribirEstoAnuevoAmbito(esto: string, location: Location, tam: number): number {
        let temp = tam;//en esta posicion se encuentra el retorno
        temp++; //en esta posicion se guarda this
        let t2 = this.analizador.newTemporal()
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line
        );

        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t2, esto), location.last_column, location.first_line
        );
        temp++;//siguiete posicionlibre

        this.analizador.agregarCodigo(
            this.analizador.genComentario("agregando parametros"), location.last_column, location.first_line
        );
        return temp;
    }

}