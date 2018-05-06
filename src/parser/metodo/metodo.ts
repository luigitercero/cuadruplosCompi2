import Analizador from '../analizador';
import Asignacion from '../variable/asignacion'
import Nodo from '../nodo';
import Declaracion from '../variable/declaracion';
import Metodo from '../tablaSimbolos/metodo';

import Cuerpo from './cuerpo'
import Location from '../location';
import Tabla from '../tablaSimbolos/tabla';
import Salida from './control/nodoSalida';
import nodoOperacion from '../exp/operacion/nodoOperacion';
export default class metodo {
    public analizador: Analizador;


    constructor(analizador: Analizador) {
        this.analizador = analizador;


    }

    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo 
     */
    public sobrescribir(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "SOBREESCRIBIR":
                this.analizador.logPorCompletar("tengo que sobreEcribir")
                this.analizador.log("sobrescribir a metodo: " +
                    this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.crearMetodo(nodo.childNode[0])

                return true;
        }
        return false;
    }

    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo 
     */
    public crearMetodo(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term
        let metodos
        let simtemp = this.analizador.claseA.tabla;
        this.analizador.claseA.tabla = new Tabla();
        this.analizador.claseA.tabla.esto = simtemp.esto;
        let s = new Salida();
        switch (nombre) {
            case "Visibilidad":
                metodos = this.metodo(nodo.childNode[1], nodo.childNode[0].childNode[0].token, s);
                this.endMetodo(metodos, nodo.childNode[2].location, s);
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla = simtemp;
                return true;
            case "Metodo":
                metodos = this.metodo(nodo.childNode[0], this.analizador.PUBLICO, s);
                this.endMetodo(metodos, nodo.childNode[1].location, s);
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla = simtemp;
                return true;
        }
        return false;
    }

    endMetodo(metodos: Metodo, location: Location, s: Salida) {
        let coment = this.analizador.genComentario(metodos.nomMetodo + "");
        /*
        this.analizador.agregarCodigo(this.analizador.genOperacion("-","ptr",this.analizador.claseA.tabla.ptr+"","ptr"),
         location.last_column,location.first_line);
        */
        if (s.etiquetaR.length > 0) {
            this.analizador.agregarCodigo(
                this.analizador.escribirEtiqueta(s.etiquetaR), location.last_column, location.first_line
            )
        }
        if (metodos.getNombre() == "Principal") {
            this.analizador.setFinal();
        }
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + metodos.id) + coment,
            location.last_column, location.first_line);
    }

    /**
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   | constructor 
     *   ;
     * @param nodo 
     */
    /**
     * Constructor
     *: ID '(' Parametros '{'
     *;
    */
    public metodo(nodo: Nodo, visi: string, s: Salida): Metodo {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: Metodo;
        let name: string;
        switch (nombre) {
            case "Tipo":
                return this.tip0ID(nodo, visi);
            case "ID":
                return this.tip1ID(nodo, visi);
            case "Metodo":
                metodo = this.metodo(nodo.childNode[0], visi, s);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], s);
                metodo.escrito = true;
                return metodo;
            case "Constructor":
                let cons = nodo.childNode[0].childNode[0].token.toLowerCase()
                if (cons == this.analizador.claseA.nombre) {
                    name = this.analizador.claseA.nombre + this.parametros(nodo.childNode[0].childNode[2]);
                    nombreMetodo = this.analizador.claseA.nombre + "_" + name;
                    metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                    //this.nuevoThis(nodo.childNode[0].childNode[0].location);
                    this.callPreconstructor(nodo.childNode[0].childNode[0].location);
                    metodo.escrito = true;
                    return metodo;
                } else {
                    this.analizador.newError("error esto no es un contructor",
                        nodo.childNode[0].childNode[0].location.first_line,
                        nodo.childNode[0].childNode[0].location.last_column
                    );
                }
                break;

            case "Principal":
                name = "Principal";

                this.analizador.setStart();
                metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                this.nuevoThis(nodo.childNode[0].childNode[0].location, this.analizador.claseA.nombre, 0);
                this.callPreconstructor(nodo.childNode[0].childNode[0].location);
                metodo.escrito = true;
                return metodo;
        }
        throw this.analizador.newError("error al crear metodo", 0, 0);
    }


    private tip0ID(nodo: Nodo, visibilidad: string) {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: Metodo;
        let name: string;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].childNode[0].token;
            name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
            metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
            return metodo
        } else {
            tipo = nodo.childNode[0].childNode[0].token;
            name = nodo.childNode[1 + 1].token + this.parametros(nodo.childNode[3 + 1]);
            metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
            return metodo
        }

    }

    private tip1ID(nodo: Nodo, visibilidad: string) {
        let nombre = nodo.childNode[0].term;
        let tipo: string = this.analizador.VACIO;
        let nombreMetodo: string;
        let metodo: Metodo;
        let name: string;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].token;
            name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
            metodo = this.metodoImp(name, nodo.childNode[0].location);
            return metodo;
        } else {
            tipo = nodo.childNode[0].token;
            name = nodo.childNode[1 + 1].token + this.parametros(nodo.childNode[3 + 1]);
            metodo = this.metodoImp(name, nodo.childNode[0].location);
            return metodo;
        }

    }

    private tipID(nodo: Nodo): number {
        let term = nodo.childNode[0].term
        switch (term) {
            case "'['":
                return 1;
            case "tipID":
                return this.tipID(nodo.childNode[0]) + 1;
        }
        return 0;
    }

    public constructorDefault(location: Location) {
        let metodos = this.metodoImp(this.analizador.claseA.nombre, location);
        this.nuevoThis(location, this.analizador.claseA.nombre, 0);
        this.callPreconstructor(location);
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + metodos.id),
            location.last_column, location.first_line);
        this.analizador.claseA.tabla.disminuirAmbito();
    }
    private callPreconstructor(location: Location) {
        let _Preconstructor = this.analizador.claseA.buscarMetodo("preconstructor");
        this.analizador.agregarCodigo(this.analizador.llamarMetodo("metodo" + _Preconstructor.id), location.last_column, location.first_line);
    }
    //solo se agrega una posicion ppara poder apuntar al this
    public nuevoThis(location: Location, objeto: string, ptr: number) {
        let t1 = this.analizador.newTemporal();
        let t2 = this.analizador.newTemporal();
        let coment = this.analizador.genComentario("guardar this en retorno de metodo " + this.analizador.claseA.nombre)
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", ptr + "", t1), location.last_column, location.first_line
        );
        ptr++;
        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t1, "heap") + coment, location.last_column, location.first_line
        );
        coment = this.analizador.genComentario("guardar this en this de metodo " + this.analizador.claseA.nombre)
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", "ptr", ptr + "", t2), location.last_column, location.first_line
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnPila(t2, "heap") + coment, location.last_column, location.first_line
        );
        return new nodoOperacion("heap", objeto, location.last_column, location.first_line)
    }
    private metodoImp(name: string, location: Location) {
        let metodo: Metodo = this.analizador.claseA.buscarMetodo(name);
        this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre, metodo.getTipo());
        this.analizador.claseA.tabla.aumetarAbmito();
        metodo.preFijo = this.analizador.claseA.nombre;
        let comentario = this.analizador.genComentario(this.analizador.claseA.nombre + "_" + name);
        this.analizador.agregarCodigo(this.analizador.metodoBegin(metodo.id) + comentario, location.last_column, location.first_line);
        for (let index = 0; index < metodo.parametro.length; index++) {
            const element = metodo.parametro[index];
            this.analizador.claseA.tabla.agregarSimboloApila(element);
        }
        return metodo;
    }
    /**
     * Parametros nodo.childNode[0].childNode[0].location
     *   : Parametro ')' 
     *   |  ')'
     *   ;
     * @param nodo 
     */
    public parametros(nodo: Nodo): string {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "')'": return "";
            case "Parametro": return "_" + this.parametro(nodo.childNode[0]);
        }
        this.analizador.newError("error al crear metodo", 0, 0);
        return "";
    }

    /**
     * Parametro
     *   : Tipo var
     *   | ID var
     *   | Parametro ',' Tipo var
     *   | Parametro ',' ID var
     *   ;
     * @param nodo 
     */
    public parametro(nodo: Nodo): string {
        let term: string = nodo.childNode[0].term;
        let tipo: string;
        let nombre: string;
        let simbolo
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token

                return tipo;
            case "ID":
                tipo = nodo.childNode[0].token

                return tipo
            case "Parametro":
                return this.parametro(nodo.childNode[0]) + "_" + this.addParametron(nodo);
        }
        this.analizador.newError("error al crear parametro", 0, 0);
        return "";
    }

    public addParametron(nodo: Nodo): string {
        let term = nodo.childNode[2].term;
        let tipo: string;
        let nombre: string;
        let simbolo
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[2].childNode[0].token
                return tipo;
            case "ID":
                tipo = nodo.childNode[2].token
                return tipo;
        }
        this.analizador.newError("error al crear parametro", 0, 0);
        return "";
    }
}