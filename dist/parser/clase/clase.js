"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clase = /** @class */ (function () {
    function Clase(analizador) {
        this.analizador = analizador;
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
            case "Clase":
                this.analizador.log("crearClase a Clase: " +
                    this.clase(nodo.childNode[0]));
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return false;
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
                this.analizador.claseA = this.analizador.buscarClase(nodo.childNode[1].token);
                this.herencia(nodo.childNode[2]);
                this.asignarVariablesGlobales();
                return true;
            case "Clase":
                this.analizador.log("clase a clase: " +
                    this.clase(nodo.childNode[0]));
                this.cuerpoClase(nodo.childNode[1]);
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
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
                this.analizador.logPorCompletar("herencia");
                this.analizador.log("agregando herencia " + nodo.childNode[1].token);
                return true;
            case "Herencia":
                this.herencia(nodo.childNode[0]);
                return true;
            case "'{'":
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
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
                return true;
            case "SobreEscribir":
                this.analizador.log("cuerpoClase a sobrescribir: " +
                    this.analizador.metodoA.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.analizador.logPorCompletar("agreagar struct a tabla de simbolos");
                return true;
            case "CuerpoClase":
                this.analizador.log("cuerpoClase a cuerpoClase: " +
                    this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return false;
    };
    Clase.prototype.asignarVariablesGlobales = function () {
        this.analizador.claseA.tabla.esto;
        var nombreClase = this.analizador.claseA.nombre;
        var poss = this.analizador.claseA.poss;
        this.analizador.agregarCodigo(this.analizador.metodoBegin(nombreClase + "preconstructor$$"), 0, poss);
        for (var index = 0; index < this.analizador.claseA.tabla.esto.ambito.length; index++) {
            var element = this.analizador.claseA.tabla.esto.ambito[index];
            if (element.valor.valor != null) {
                var sim = element;
                this.analizador.variable.evaluarAsignacionasignarValor(sim);
            }
        }
        this.analizador.agregarCodigo(this.analizador.metodoEnd(nombreClase + "preconstructor$$"), 0, poss);
    };
    return Clase;
}());
exports.default = Clase;
//# sourceMappingURL=clase.js.map