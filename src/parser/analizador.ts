
import Nodo from './nodo'
import Inter from './itermedio'
import Exp from './exp/operacion/Exp'
import Variable from './variable/variable'

import Metodo from './metodo/metodo'
import Clase from './tablaSimbolos/clase'
import Recoleccion from '../precompilacion/recoleccion'
import Class from './clase/clase'
import Cuerpo from './metodo/cuerpo'
import nodoOperacion from './exp/operacion/nodoOperacion';
export default class Analizador extends Inter {
    public exp: Exp;
    public variable: Variable;
    public metodoA: Metodo;
    public clas: Class;
    public claseA: Clase;
    public clases: Clase[];
    public cuerpo: Cuerpo;
    constructor() {
        super();
        this.exp = new Exp(this);
        this.variable = new Variable(this);
        this.metodoA = new Metodo(this);
        this.cuerpo = new Cuerpo(this);
        this.claseA = new Clase("", 0);
        this.clases = new Array<Clase>();
        this.clas = new Class(this);
    }
    getAmbito() {

        let ambito: any = [];

        for (let index = 0; index < this.claseA.tabla.Lista.length; index++) {
            const element = this.claseA.tabla.Lista[index];
            for (let index = 0; index < element.ambito.length; index++) {
                let datos = []
                const simbolo = element.ambito[index];
                datos.push(simbolo.getNombre());
                datos.push(simbolo.getTipo());
                datos.push(simbolo.getVisibilidad());
                datos.push(simbolo.getTamanio());
                datos.push(simbolo.possAmbito);
                datos.push(simbolo.linea);
                datos.push("ptr");
                datos.push(this.claseA.nombre);
                ambito.push(datos)
            }
        }

        for (let index = 0; index < this.claseA.tabla.esto.ambito.length; index++) {
            const simbolo = this.claseA.tabla.esto.ambito[index];
            let datos = []
            datos.push(simbolo.getNombre());
            datos.push(simbolo.getTipo());
            datos.push(simbolo.getVisibilidad());
            datos.push(simbolo.getTamanio());
            datos.push(simbolo.possAmbito);
            datos.push(simbolo.linea);
            datos.push("heap");
            datos.push(this.claseA.nombre);
            ambito.push(datos)

        }

        return ambito;
    }
    verTodasLasClases() {

        console.log("---------Obeservando clasese-----------")
        for (let index = 0; index < this.clases.length; index++) {
            let element = this.clases[index];
            element.verMetodosDeClase();
            element.verVariable();

        }

        console.log("---------Fin Obeservando clasese-----------")

    }
    buscarClase(nombre: string, navegar?: nodoOperacion): Clase {
        for (let index = 0; index < this.clases.length; index++) {
            let element = this.clases[index];
            if (element.nombre == nombre) {
                element.verVariable();
                return element;
            }
        }
        if (navegar == null) {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0)
        } else {

            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre + "variable", navegar.fila, navegar.column);
        }
    }
    verClaseA() {
        console.log("---------Obeservando ClaseA-----------")
        this.claseA.verMetodosDeClase();
        this.claseA.verVariable();
        console.log("---------Fin Obeservando ClaseA-----------")

    }
    /**
     * inicio
     *: Encabezado EOF
     *;
     * @param nodo 
     */
    public inicio(nodo: Nodo): boolean {
        let recoleccion: Recoleccion = new Recoleccion(this);
        recoleccion.analizar(nodo);
        //this.verTodasLasClases();
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0])
                );
                return true;
            case "Encabezado":
                this.log("inicio a Encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                return true;
        }
        return false;
    }

    /**
     * Encabezado
     *   : Import
     *   | CrearClase
     *   | Estruct//SE AGRAGO 
     *   | Encabezado CrearClase
     *   | Encabezado Estruct
     *   ;
     * 
     * @param nodo 
     */
    public encabezado(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "Encabezado":
                this.log("encabezado a encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.log("encabezado a crear Clase: " +
                    this.clas.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
        }
        return false;
    }

    /**
     * este va elegir si creaa una estrucrura o crea una clase proviene del encabezado
     *    | Encabezado CrearClase
     *    | Encabezado Estruct
     * @param nodo 
     */
    public CE(nodo: Nodo): boolean {
        let nombre: string = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.log("CE a creaClase: " +
                    this.clas.crearClase(nodo));
                return true;
            case "Estruct":
                this.logPorCompletar("estruct")
                return true;
        }
        return false;
    }


    /**
     * Import
     *: Importar 
     *| Import Importar
     *;
     * @param nodo 
     */
    public import(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;

        switch (nombre) {
            case "Importar":
                this.log("import a importar: " +
                    this.importar(nodo.childNode[0]));
                return true;
            case "Import":
                this.log("import a import: " +
                    this.import(nodo.childNode[0]));
                this.log("import a importar: " +
                    this.importar(nodo.childNode[1]));
                return true
        }
        return false;
    }

    /**
     * Importar
     *: IMPORTAR '(' STRING_LIT ')' ';'
     *;
     * @param nodo 
     */
    public importar(nodo: Nodo): boolean {
        this.log("vamo a importar");
        return true;
    }




}