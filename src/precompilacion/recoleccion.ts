import Analizador from "../parser/analizador";
import Nodo from "../parser/nodo";
import Clase from "../parser/tablaSimbolos/clase"
import Class from "./clase";
import Variable from "./variable";
import Metodo from './metodo';
export default class Recoleccion {
    public analizador: Analizador
    public clase: Class;
    public variable: Variable
    public metodo: Metodo
    constructor(analizador: Analizador) {
        this.analizador = analizador;
        this.clase = new Class(this);
        this.variable = new Variable(analizador);
        this.metodo = new Metodo(this);
    }
    analizar(nodo: Nodo) {
        this.inicio(nodo);
    }


    public inicio(nodo: Nodo): boolean {

        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.analizador.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0])
                );
                return true;
            case "Encabezado":
                this.analizador.log("inicio a Encabezado: " +
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
                this.analizador.log("encabezado a encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.analizador.log("encabezado a crear Clase: " +
                    this.clase.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.analizador.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.analizador.Estructuras.agregarEstructura(
                    this.analizador.getCodEstruct().Inicio(nodo.childNode[0]));
                //this.analizador.newError("declarando struct", 0, 0);
                return true
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
                this.analizador.log("CE a creaClase: " +
                    this.clase.crearClase(nodo));
                return true;
            case "Estruct":
                this.analizador.Estructuras.agregarEstructura(
                    this.analizador.getCodEstruct().Inicio(nodo.childNode[0]));
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
                this.analizador.log("import a importar: " +
                    this.importar(nodo.childNode[0]));
                return true;
            case "Import":
                this.analizador.log("import a import: " +
                    this.import(nodo.childNode[0]));
                this.analizador.log("import a importar: " +
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
        this.analizador.log("vamo a importar");
        return true;
    }


}