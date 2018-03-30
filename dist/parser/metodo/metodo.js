"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metodo = /** @class */ (function () {
    function metodo(analizador) {
        this.analizador = analizador;
    }
    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo
     */
    metodo.prototype.sobrescribir = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "SOBREESCRIBIR":
                this.analizador.logPorCompletar("tengo que sobreEcribir");
                this.analizador.log("sobrescribir a metodo: " +
                    this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.analizador.log("sobrescrbir a crear metodo: " +
                    this.crearMetodo(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   ;
     * @param nodo
     */
    metodo.prototype.metodo = function (nodo, visi) {
        var nombre = nodo.childNode[0].term;
        var tipo;
        var nombreMetodo;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.analizador.logPorCompletar("agregar metodo a tabla de simbolos");
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.analizador.logPorCompletar("agregar metodo a tabla de simbolos");
                return true;
            case "Metodo":
                this.metodo(nodo.childNode[0], "");
                this.cuerpoMetodo(nodo.childNode[1]);
                return true;
        }
        return false;
    };
    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo
     */
    metodo.prototype.crearMetodo = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Visibilidad":
                this.analizador.log("agregar visibilidad");
                this.analizador.log("crear metodo a metodo: " +
                    this.metodo(nodo.childNode[1], nodo.childNode[0].childNode[0].token));
                return true;
            case "Metodo":
                this.analizador.log("crear metodo a metodo: " +
                    this.metodo(nodo.childNode[0], "pivate"));
                return true;
        }
        return false;
    };
    /**
     * Parametros
     *   : Parametro ')'
     *   |  ')'
     *   ;
     * @param nodo
     */
    metodo.prototype.parametros = function (nodo) {
        return false;
    };
    /**
     * Parametro
     *   : Tipo ID
     *   | ID ID
     *   | Parametro ',' Tipo ID
     *   | Parametro ',' ID ID
     *   ;
     * @param nodo
     */
    metodo.prototype.parametro = function (nodo) {
        return false;
    };
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
    metodo.prototype.cuerpoMetodo = function (nodo) {
        return false;
    };
    /**
     * Asignacion
     *   : var '=' e ';'
     *   | Navegar var '=' e ';'
     *   |'+=' e ';'
     *   |'*=' e ';'
     *   |'/=' e ';'
     *   | '++' ';'
     *   | '--' ';'
     *   | var '=' Nuevo ';'
     *  ;
     * @param nodo
     */
    metodo.prototype.asignacion = function (nodo) {
        return false;
    };
    return metodo;
}());
exports.default = metodo;
//# sourceMappingURL=metodo.js.map