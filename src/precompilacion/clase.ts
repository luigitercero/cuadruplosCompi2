
import Recoleccion from "./recoleccion";
import Nodo from '../parser/nodo'
import ClaseT from '../parser/tablaSimbolos/clase'
import Location from "../parser/location";
import Metodo from "../parser/tablaSimbolos/metodo";
export default class Clase {
    public recoleccion: Recoleccion;

    constructor(recoleccion: Recoleccion) {
        this.recoleccion = recoleccion;
    }
    /**
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo 
     */
    public crearClase(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "CrearClase":
                this.recoleccion.analizador.log("crearClase a crearClase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Clase":
                this.recoleccion.analizador.log("crearClase a Clase: " +
                    this.clase(nodo.childNode[0]));
                this.exixteContructor(nodo.childNode[1].location);
                return true;
        }
        return false;
    }

    private exixteContructor(location: Location) {
        try {
            this.recoleccion.analizador.claseA.buscarMetodo(this.recoleccion.analizador.claseA.nombre)
        } catch (error) {
            this.escribirContructor(location)
        }
    }

    private escribirContructor(location: Location) {
        let tipo = this.recoleccion.analizador.claseA.nombre;
        let nombreMetodo = this.recoleccion.analizador.claseA.nombre;
        let visi = this.recoleccion.analizador.PUBLICO;
        let metodo = new Metodo(nombreMetodo, visi, tipo);
        metodo.id = this.recoleccion.analizador.getContador() + "";
        this.recoleccion.analizador.claseA.agregarMetodo(metodo);
    }
    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo 
     */
    public clase(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "CLASE":
                this.recoleccion.analizador.claseA = new ClaseT(nodo.childNode[1].token, nodo.childNode[1].location.first_line);
                this.recoleccion.analizador.clases.push(this.recoleccion.analizador.claseA);
                this.herencia(nodo.childNode[2]);
                return true;
            case "Clase":
                this.recoleccion.analizador.log("clase a clase: " +
                    this.clase(nodo.childNode[0]));
                this.cuerpoClase(nodo.childNode[1]);
                return true;
        }
        return false;
    }
    /**
     * Herencia
     *:'{'
     *| HEREDADE ID '{'
     *;
     * @param nodo 
     */
    public herencia(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "HEREDADE":
                this.recoleccion.analizador.logPorCompletar("herencia");
                this.recoleccion.analizador.log("agregando herencia " + nodo.childNode[1].token);
                return true;
        }
        return false;
    }

    /**
     * este es el metod la produccion cuerpoClaes
     * CuerpoClase
     *   : DeclaracionClase 
     *   | SobreEscribir
     *   | Estruct
     * ;
     * @param nodo 
     */
    public cuerpoClase(nodo: Nodo): boolean {

        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "DeclaracionClase"://declaracion de una variable en una clase
                this.recoleccion.variable.declaracion(nodo.childNode[0]);
                return true;
            case "SobreEscribir":
                this.recoleccion.analizador.log("cuerpoClase a sobrescribir: " +
                    this.recoleccion.metodo.sobrescribir(nodo.childNode[0]));

                return true;
            case "Estruct":
                this.recoleccion.analizador.logPorCompletar("agreagar struct a tabla de simbolos");
                return true

        }
        this.recoleccion.analizador.newError("no existe nodo pra continuar el cuerpo clase", 0, 0);
        return false;
    }

}