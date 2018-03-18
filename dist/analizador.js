"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var itermedio_1 = __importDefault(require("./parser/itermedio"));
var Analizador = /** @class */ (function (_super) {
    __extends(Analizador, _super);
    function Analizador() {
        return _super.call(this) || this;
    }
    /**
     * este va elegir si creaa una estrucrura o crea una clase proviene del encabezado
     *    | Encabezado CrearClase
     *    | Encabezado Estruct
     * @param nodo
     */
    Analizador.prototype.CE = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.log("CE a creaClase: " +
                    this.crearClase(nodo));
                return true;
            case "Estruct":
                return true;
        }
        return false;
    };
    /**
     * inicio
     : Encabezado EOF
     ;
     * @param nodo
     */
    Analizador.prototype.inicio = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0]));
                return true;
            case "Encabezado":
                this.log("inicio a Encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
    * Encabezado
    *   : Import
    *   | CrearClase
    *   | Encabezado CrearClase
    *   | Encabezado Estruct
    *   ;
    *
    * @param nodo
    */
    Analizador.prototype.encabezado = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Encabezado":
                this.log("encabezado a encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.log("encabezado a crear Clase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
        }
        return false;
    };
    /**
     * CrearClase
    : Clase '}'
    ;
     * @param nodo
     */
    Analizador.prototype.crearClase = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.log("crearClase a crearClase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Clase":
                this.log("crearClase a Clase: " +
                    this.clase(nodo));
                return true;
        }
        return false;
    };
    /**
     * Clase
    : CLASE ID Herencia
    | Clase CuerpoClase
    ;
     * @param nodo
     */
    Analizador.prototype.clase = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "Clase":
                this.log("clase a clase: " +
                    this.clase(nodo.childNode[0]));
                return true;
            case "Herencia":
                this.log("clase a Herencia: " +
                    this.herencia(nodo));
                return true;
            case "CuerpoClase":
                this.log("clase a Cuerpo Clase: " +
                    this.cuerpoClase(nodo));
                return true;
        }
        return false;
    };
    /**
     * Herencia
    :'{'
    | HEREDADE ID '{'
    ;
     * @param nodo
     */
    Analizador.prototype.herencia = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "HEREDADE":
                this.log("agregando herencia");
                return true;
            case "Herencia":
                this.herencia(nodo.childNode[0]);
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
    Analizador.prototype.cuerpoClase = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "DeclaracionClase":
                this.log("declaracion de variable en clase");
                return true;
            case "SobreEscribir":
                this.log("cuerpoClase a sobrescribir: " +
                    this.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.log("declaracion de struct");
                return true;
            case "CuerpoClase":
                this.log("cuerpoClase a cuerpoClase: " +
                    this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * SobreEscribir
        : SOBREESCRIBIR CrearMetodo
        |CrearMetodo
        ;
    * @param nodo
    */
    Analizador.prototype.sobrescribir = function (nodo) {
        return false;
    };
    /**
     * Metodo
        : Tipo ID '(' Parametros '{'
        | ID ID '(' Parametros '{'
        | Metodo  CuerpoMetodo
        ;
     * @param nodo
     */
    Analizador.prototype.metodo = function (nodo) {
        return false;
    };
    /**
     * CrearMetodo
        : Visibilidad Metodo '}'
        | Metodo '}'
        ;
     * @param nodo
     */
    Analizador.prototype.crearMetodo = function (nodo) {
        return false;
    };
    /**
     * Parametros
        : Parametro ')'
        |  ')'
        ;
     * @param nodo
     */
    Analizador.prototype.parametros = function (nodo) {
        return false;
    };
    /**
     * Parametro
        : Tipo ID
        | ID ID
        | Parametro ',' Tipo ID
        | Parametro ',' ID ID
        ;
     * @param nodo
     */
    Analizador.prototype.parametro = function (nodo) {
        return false;
    };
    /**
     * CuerpoMetodo
        : Declaracion
        | Asignacion
        | getMetodoZ ';'
        | Control
        | Branching ';'
        ;
     * @param nodo
     */
    Analizador.prototype.cuerpoMetodo = function (nodo) {
        return false;
    };
    /**
     * Asignacion
        : var '=' e ';'
        | Navegar var '=' e ';'
        |'+=' e ';'
        |'*=' e ';'
        |'/=' e ';'
        | '++' ';'
        | '--' ';'
        | var '=' Nuevo ';'
       ;
     * @param nodo
     */
    Analizador.prototype.asignacion = function (nodo) {
        return false;
    };
    /**
     * Navegar
        : var '.'
        | var '->'
        | getMetodo '.'
        | getMetodo '->'
        | Navegar var '.'
        | Navegar  getMetodo '.'
        | Navegar var '->'
        | Navegar  getMetodo '->'
        ;
     * @param nodo
     */
    Analizador.prototype.navegar = function (nodo) {
        return false;
    };
    /**
     *  Control
        : If1
        | If2
        | Switch
        | While
        | Do_While
        | Repeat_Until
        | For
        | Loop
        | Count
        | Doble_Condicion
        ;
     * @param nodo
     */
    Analizador.prototype.control = function (nodo) {
        return false;
    };
    /**
     * Cuerpo: '{'Cuerpo1 '}'
        | '{' '}'
        ;
     * @param nodo
     */
    Analizador.prototype.cuerpo = function (nodo) {
        return false;
    };
    /**
     * Cuerpo1
        :Cuerpo1 CuerpoMetodo
        |CuerpoMetodo
        ;
     * @param nodo
     */
    Analizador.prototype.curpo1 = function (nodo) {
        return false;
    };
    /**
     * Branching
        : BREAK
        | BREAK ID
        | CONTINUE
        | RETURN
        | RETURN e
        ;
     * @param nodo
     */
    Analizador.prototype.branching = function (nodo) {
        return false;
    };
    /**
     * Expresion
        : '(' e ')'
        ;
     * @param nodo
     */
    Analizador.prototype.expresion = function (nodo) {
        return false;
    };
    /**
     * getMetodoZ
        : Navegar  getMetodo
        | getMetodo
        ;
     * @param nodo
     */
    Analizador.prototype.getMetodoZ = function (nodo) {
        return false;
    };
    /**
     * getMetodo
        : ID '(' getParametro
        | Primitivas '(' getParametro
        | Tipo '(' getParametro
        ;
     * @param nodo
     */
    Analizador.prototype.getMetodo = function (nodo) {
        return false;
    };
    /**
     * getParametro
        : ParametroM ')'
        | ')'
        ;
     * @param nodo
     */
    Analizador.prototype.getParametro = function (nodo) {
        return false;
    };
    /**
     * ParametroM
        : ParametroM ',' e
        | ParametroM ',' Tipo
        | e
        | Tipo
        ;
     * @param nodo
     */
    Analizador.prototype.parametroM = function (nodo) {
        return false;
    };
    /**
     * Primitivas
        :IMPRIMIR
        |CONCATENAR
        |CONVERTIRCADENA
        |CONVERTIRENTERO
        |CREARPUNTERO
        |OBTERNERDIRECCION
        |RESERVAMEMORIA
        |CONSULTARTAMANIO
        |TECLADO
        ;
     * @param nodo
     */
    Analizador.prototype.primitivas = function (nodo) {
        return false;
    };
    /**
     * e
        : e '+' e
        | e '-' e
        | e '*' e
        | e '/' e
        | e '%' e
        | e '^' e
        | '-' e
        | '(' e ')'
        | e '<' e
        | e '>' e
        | e '<=' e
        | e '>=' e
        | e '==' e
        | e '!=' e
        | e '&&' e
        | e '||' e
        | e '??' e
        | '!' e
        | Datos
        | NULL
        ;
     * @param nodo
     */
    Analizador.prototype.e = function (nodo) {
        return false;
    };
    /**
     * Lista
        : List '}'
        ;
     * @param nodo
     */
    Analizador.prototype.lista = function (nodo) {
        return false;
    };
    /**
     * List
        : '{' DefList
        | List ',' DefList
        ;
     * @param nodo
     */
    Analizador.prototype.list = function (nodo) {
        return false;
    };
    /**
     * Datos
        : NUMBERLIST
        | Identi
        | STRINGLIST
        | TRUE
        | FALSE
        ;
     * @param nodo
     * @param Nodo
     */
    Analizador.prototype.datos = function (nodo) {
        return false;
    };
    /**
     * Identi
        :var
        |getMetodo
        |Identi '->' var
        |Identi '->' getMetodo
        |Identi '.' var
        |Identi '.' getMetodo
        ;
     */
    Analizador.prototype.identi = function (nodo) {
        return false;
    };
    return Analizador;
}(itermedio_1.default));
exports.default = Analizador;
