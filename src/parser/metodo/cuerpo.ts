
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
        let term = nodo.term
        if (term == "e") {
            let op = this.analizador.exp.analizar(nodo);
            this.agregarRetornogg(op, location)
            return
        } else if (term == "Nuevo") {
            let op = this.analizador.variable.getNuevo(nodo);
            this.agregarRetornogg(op, location)
            return
        }
        throw this.analizador.newError("error en retorno algo anda mal", 0, 0);

    }

    private agregarRetornogg(op: nodoOperacion, location: Location) {
        let retorno = this.analizador.variable.obtenerDirVariable("retorno", location.first_line, location.last_column);
        if (op.tipo != retorno.simbolo.getTipo()) {
            if (op.tipo == this.analizador.NULL) {

            } else {
                throw this.analizador.newError("retorno no coincide con el tipo tipo objeto " + op.tipo
                    + "tipo retorno " + retorno.simbolo.getTipo(), location.first_line, location.last_column);
            }

        }
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
                this.analizador.recorrerArbol(nodo);
                let pc = this.getParametro(nodo.childNode[2])
                return this.metodoID2(nombre, pc, nodo.childNode[0].location, esto);
            case "Primitivas":
                nombre = nodo.childNode[0].childNode[0].term;
                let location = nodo.childNode[0].childNode[0].location
                this.primitivas.analizar(nombre, this.getParametro(nodo.childNode[2]), location);
                return
            case "Tipo":
                throw this.analizador.newError("no puedo hacer esto todavia", 0, 0);

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
        this.analizador.recorrerArbol(nodo);
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
                this.privateParmetroM2(nodo.childNode[2], parametro);
                return true;
            case "e":
                this.privateParmetroM2(nodo.childNode[0], parametro);
                return true;
            case ("Tipo"):

                return true;

        }
        throw this.analizador.newError("error parametros", 0, 0);
    }
    privateParmetroM2(nodo: Nodo, parametro: nodoOperacion[]) {
        let term = nodo.term;
        switch (term) {
            case "Tipo":
                throw this.analizador.newError("aun no puedo hacer esto", 0, 0)
            //break
            case "Nuevo":
                throw this.analizador.newError("aun no puedo hacer esto", 0, 0)
            //break
            case "e":
                let valor = this.analizador.exp.analizar(nodo)
                if (valor.tipo == this.analizador.STRING) {
                    valor = new nodoOperacion(this.analizador.exp.crearArregloString(valor), "caracter", valor.column, valor.fila)
                    valor.simbolo.tam = 1;
                    valor.setTam(1);
                }
                parametro.push(valor);
                return true;
        }
        throw this.analizador.newError("error parametros", 0, 0);

    }

    public nuevoObjeto(nodo: Nodo): nodoOperacion {
        let objeto = nodo.childNode[1].childNode[0].token
        let location = nodo.childNode[0].location;
        let tam = this.analizador.claseA.tabla.ptr;
        let metodo: nodoOperacion;
        this.analizador.claseA.tabla.aumetarAbmito();
        let este = this.analizador.metodoA.nuevoThis(location, objeto, tam);
        metodo = this.analizador.variable.getmetodo(nodo.childNode[1], este);
        this.analizador.claseA.tabla.disminuirAmbito();
        return metodo;

    }
    private ejecutarMetodo(nombre: string, param: string, tam: number, location: Location, temp: number, parametoM: nodoOperacion[], esto?: nodoOperacion): Metodo {
        let coment = this.analizador.genComentario("aumentando de ambito para " + this.analizador.claseA.nombre)
        let metodoNombre = nombre + param;
        let ambitotemporal = this.analizador.claseA;
        if (esto !== undefined) {
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        let metodo: Metodo = this.analizador.claseA.buscarMetodo(metodoNombre, location, nombre);
        if (metodo.parametro.length == parametoM.length) {
            this.escribirParametrosApila(temp, parametoM, metodo);
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
        } else {
            throw this.analizador.newError("error no se puede llamar metodo " + nombre + param, location.last_column, location.first_line);
        }


    }

    /**
     * escribir metodo antes de variables
     * agregar parametros
     * @param nombre 
     * @param parametoM 
     * @param location 
     * @param esto 
     */
    private metodoID2(nombre: string, parametoM: nodoOperacion[], location: Location, esto?: nodoOperacion): Metodo {
        let tam = this.analizador.claseA.tabla.ptr
        let dir;

        if (esto === undefined) {
            dir = this.analizador.variable.obtenerValorVariable("este", location.first_line, location.last_column).done; //aqui deberia de se valor en vez de done
            //throw this.analizador.newError("revisar done ", 0, 0);
        } else {

            dir = esto.valor;
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        let temp = this.escribirEstoAnuevoAmbito(dir, location, tam);

        // let param = this.escribirParametrosApila(temp, parametoM);
        let param = this.tiposDeParametros(parametoM);

        return this.ejecutarMetodo(nombre, param, tam, location, temp, parametoM, esto, );
    }

    /**
     * paremetros metodos variables metodos
     * @param temp 
     * @param parametoM 
     */
    private escribirParametrosApila(temp: number, parametoM: nodoOperacion[], metodo: Metodo): string {
        let param = "";
        for (let index = 0; index < parametoM.length; index++) {
            let t1 = this.analizador.newTemporal();

            metodo.parametro[index];
            this.analizador.agregarCodigo(
                this.analizador.genOperacion("+", "ptr", temp + "", t1), parametoM[index].column, parametoM[index].fila
            );
            let agregarValor = ""
            if (!metodo.parametro[index].getPunter()) {
                if (parametoM[index].tipo == this.analizador.STRING) {

                    if (metodo.parametro[index].getTipo() == this.analizador.CARACTER) {
                        if (metodo.parametro[index].tam == 1) {

                            agregarValor = this.analizador.saveEnPila(t1, parametoM[index].valor);

                        } else {
                            throw this.analizador.newError("errror al querer gregar una cadena ", parametoM[index].column, parametoM[index].fila)
                        }
                    } else {
                        throw this.analizador.newError("errror al querer gregar una cadena ", parametoM[index].column, parametoM[index].fila)
                    }

                } else {
                    agregarValor = this.analizador.saveEnPila(t1, parametoM[index].valor);
                }
            } else {//aqui el parametro de la funcion es puntero
                let pra = parametoM[index].getReff();
                if (pra != undefined) {
                    if (parametoM[index].getReff().simbolo.getPunter()) {
                        let ap: nodoOperacion = this.analizador.variable.crearPunteroDefault(parametoM[index].
                            getReff().location);
                        let t0 = this.analizador.newTemporal();
                        this.analizador.agregarCodigo(this.analizador.genOperacion("+", ap.valor, "1", t0),
                            parametoM[index].column, parametoM[index].fila);
                        this.analizador.agregarCodigo(
                            this.analizador.saveEnHeap(ap.valor, parametoM[index].getReff().dir),
                            parametoM[index].column, parametoM[index].fila);
                        this.analizador.agregarCodigo(
                            this.analizador.saveEnHeap(t0, parametoM[index].getReff().gettemporalDeGuardado()),
                            parametoM[index].column, parametoM[index].fila);

                        agregarValor = this.analizador.saveEnPila(t1, ap.valor);

                    } else {
                        //aqui son apuntadores de variables
                        let ap: nodoOperacion = this.analizador.variable.crearPuntero(parametoM[index]);
                        agregarValor = this.analizador.saveEnPila(t1, ap.valor);
                    }

                } else {
                    throw this.analizador.newError("se requiere un apuntador con el tipo", parametoM[index].column, parametoM[index].fila)
                }
            }

            this.analizador.agregarCodigo(agregarValor, parametoM[index].column, parametoM[index].fila);
            param = param + "_" + parametoM[index].tipo;
            temp++;
        }
        return param;
    }

    private tiposDeParametros(parametoM: nodoOperacion[]) {
        let param = "";

        for (let index = 0; index < parametoM.length; index++) {
            if (parametoM[index].tipo == this.analizador.STRING) {
                param = param + "_" + this.analizador.CARACTER;
            } else {
                param = param + "_" + parametoM[index].tipo;
            }

        }
        return param;
    }
    private escribirEstoAnuevoAmbito(esto: string, location: Location, tam: number): number {
        let temp = tam;//en esta posicion se encuentra el retorno
        //en esta posicion se guarda this
        let t2 = this.analizador.newTemporal()
        let comentario = this.analizador.genComentario("guardar en pila nuevo ambito");

        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line
        );

        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t2, esto) + comentario + " esto en retorno", location.last_column, location.first_line
        );
        temp++;
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line
        );

        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t2, esto) + comentario, location.last_column, location.first_line
        );

        temp++;//siguiete posicionlibre

        this.analizador.agregarCodigo(
            this.analizador.genComentario("agregando parametros"), location.last_column, location.first_line
        );
        return temp;
    }

}