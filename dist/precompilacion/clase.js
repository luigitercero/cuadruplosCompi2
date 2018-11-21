"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var clase_1 = __importDefault(require("../parser/tablaSimbolos/clase"));
var metodo_1 = __importDefault(require("../parser/tablaSimbolos/metodo"));
var Clase = /** @class */ (function () {
    function Clase(recoleccion) {
        this.recoleccion = recoleccion;
    }
    /**
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo
     */
    Clase.prototype.crearClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
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
    };
    Clase.prototype.exixteContructor = function (location) {
        try {
            this.recoleccion.analizador.claseA.buscarMetodo(this.recoleccion.analizador.claseA.nombre, location);
        }
        catch (error) {
            this.escribirContructor(location);
        }
    };
    Clase.prototype.escribirContructor = function (location) {
        var tipo = this.recoleccion.analizador.claseA.nombre;
        var nombreMetodo = this.recoleccion.analizador.claseA.nombre;
        var visi = this.recoleccion.analizador.PUBLICO;
        var metodo = new metodo_1.default(nombreMetodo, visi, tipo);
        metodo.id = this.recoleccion.analizador.getContador() + "";
        this.recoleccion.analizador.claseA.agregarMetodo(metodo);
    };
    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo
     */
    Clase.prototype.clase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CLASE":
                this.recoleccion.analizador.claseA = new clase_1.default(nodo.childNode[1].token, nodo.childNode[1].location.first_line);
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
    };
    /**
     * Herencia
     *:'{'
     *| HEREDADE ID '{'
     *;
     * @param nodo
     */
    Clase.prototype.herencia = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "HEREDADE":
                this.recoleccion.analizador.claseA.herencia = true;
                this.recoleccion.analizador.claseA.hereda_de = nodo.childNode[1].token;
                this.recoleccion.analizador.log("agregando herencia " + nodo.childNode[1].token);
                return true;
        }
        return false;
    };
    /**
     * este es el metod la produccion cuerpoClaes
     * CuerpoClase
     *   : DeclaracionClase
     *   | SobreEscribir
     *   | Estruct
     * ;
     * @param nodo
     */
    Clase.prototype.cuerpoClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "DeclaracionClase"://declaracion de una variable en una clase
                this.recoleccion.variable.declaracion(nodo.childNode[0]);
                return true;
            case "SobreEscribir":
                this.recoleccion.analizador.log("cuerpoClase a sobrescribir: " +
                    this.recoleccion.metodo.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.recoleccion.analizador.claseA.estructura.agregarEstructura(this.recoleccion.analizador.getCodEstruct().Inicio(nodo.childNode[0]));
                return true;
        }
        this.recoleccion.analizador.newError("no existe nodo pra continuar el cuerpo clase", 0, 0);
        return false;
    };
    return Clase;
}());
exports.default = Clase;
//# sourceMappingURL=clase.js.map