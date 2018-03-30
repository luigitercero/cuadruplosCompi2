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
var Exp_1 = __importDefault(require("./parser/exp/operacion/Exp"));
var variable_1 = __importDefault(require("./parser/variable/variable"));
var tabla_1 = __importDefault(require("./parser/tablaSimbolos/tabla"));
var metodo_1 = __importDefault(require("./parser/metodo/metodo"));
var clase_1 = __importDefault(require("./parser/tablaSimbolos/clase"));
var Analizador = /** @class */ (function (_super) {
    __extends(Analizador, _super);
    function Analizador() {
        var _this = _super.call(this) || this;
        _this.exp = new Exp_1.default(_this);
        _this.variable = new variable_1.default(_this);
        _this.tablaSimbolos = new tabla_1.default();
        _this.metodoA = new metodo_1.default(_this);
        _this.claseA = new clase_1.default("", 0);
        return _this;
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
                this.logPorCompletar("estruct");
                return true;
        }
        return false;
    };
    /**
     * inicio
     *: Encabezado EOF
     *;
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
     *   | Estruct//SE AGRAGO
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
                this.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * Import
     *: Importar
     *| Import Importar
     *;
     * @param nodo
     */
    Analizador.prototype.import = function (nodo) {
        var nombre = nodo.childNode[0].term;
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
                return true;
        }
        return false;
    };
    /**
     * Importar
     *: IMPORTAR '(' STRING_LIT ')' ';'
     *;
     * @param nodo
     */
    Analizador.prototype.importar = function (nodo) {
        this.log("vamo a importar");
        return true;
    };
    /**
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo
     */
    Analizador.prototype.crearClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CrearClase":
                this.log("crearClase a crearClase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Clase":
                this.log("crearClase a Clase: " +
                    this.clase(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo
     */
    Analizador.prototype.clase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CLASE":
                this.claseA = new clase_1.default(nodo.childNode[1].token, nodo.childNode[1].location.first_line);
                this.herencia(nodo.childNode[2]);
                return true;
            case "Clase":
                this.log("clase a clase: " +
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
    Analizador.prototype.herencia = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "HEREDADE":
                this.logPorCompletar("herencia");
                this.log("agregando herencia " + nodo.childNode[1].token);
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
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "DeclaracionClase"://declaracion de una variable en una clase
                this.variable.declaracion(nodo.childNode[0]);
                return true;
            case "SobreEscribir":
                this.log("cuerpoClase a sobrescribir: " +
                    this.metodoA.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.logPorCompletar("agreagar struct a tabla de simbolos");
                return true;
            case "CuerpoClase":
                this.log("cuerpoClase a cuerpoClase: " +
                    this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * Navegar
     *   : var '.'
     *   | var '->'
     *   | getMetodo '.'
     *   | getMetodo '->'
     *   | Navegar var '.'
     *   | Navegar  getMetodo '.'
     *   | Navegar var '->'
     *   | Navegar  getMetodo '->'
     *   ;
     * @param nodo
     */
    Analizador.prototype.navegar = function (nodo) {
        return false;
    };
    /**
     *  Control
     *   : If1
     *   | If2
     *   | Switch
     *   | While
     *   | Do_While
     *   | Repeat_Until
     *   | For
     *   | Loop
     *   | Count
     *   | Doble_Condicion
     *   ;
     * @param nodo
     */
    Analizador.prototype.control = function (nodo) {
        return false;
    };
    /**
     * Cuerpo: '{'Cuerpo1 '}'
     *   | '{' '}'
     *   ;
     * @param nodo
     */
    Analizador.prototype.cuerpo = function (nodo) {
        return false;
    };
    /**
     * Cuerpo1
     *   :Cuerpo1 CuerpoMetodo
     *   |CuerpoMetodo
     *   ;
     * @param nodo
     */
    Analizador.prototype.curpo1 = function (nodo) {
        return false;
    };
    /**
     * Branching
     *   : BREAK
     *   | BREAK ID
     *   | CONTINUE
     *   | RETURN
     *   | RETURN e
     *   ;
     * @param nodo
     */
    Analizador.prototype.branching = function (nodo) {
        return false;
    };
    /**
     * Expresion
     *  : '(' e ')'
     *  ;
     * @param nodo
     */
    Analizador.prototype.expresion = function (nodo) {
        return false;
    };
    /**
     * getMetodoZ
     *   : Navegar  getMetodo
     *   | getMetodo
     *   ;
     * @param nodo
     */
    Analizador.prototype.getMetodoZ = function (nodo) {
        return false;
    };
    /**
     * getMetodo
     *   : ID '(' getParametro
     *   | Primitivas '(' getParametro
     *   | Tipo '(' getParametro
     *   ;
     * @param nodo
     */
    Analizador.prototype.getMetodo = function (nodo) {
        return false;
    };
    /**
     * getParametro
     *   : ParametroM ')'
     *   | ')'
     *   ;
     * @param nodo
     */
    Analizador.prototype.getParametro = function (nodo) {
        return false;
    };
    /**
     * ParametroM
     *   : ParametroM ',' e
     *   | ParametroM ',' Tipo
     *   | e
     *   | Tipo
     *   ;
     * @param nodo
     */
    Analizador.prototype.parametroM = function (nodo) {
        return false;
    };
    /**
     * Primitivas
     *   :IMPRIMIR
     *   |CONCATENAR
     *   |CONVERTIRCADENA
     *   |CONVERTIRENTERO
     *   |CREARPUNTERO
     *   |OBTERNERDIRECCION
     *   |RESERVAMEMORIA
     *   |CONSULTARTAMANIO
     *   |TECLADO
     *   ;
     * @param nodo
     */
    Analizador.prototype.primitivas = function (nodo) {
        return false;
    };
    /**
     * e
     *   : e '+' e
     *   | e '-' e
     *   | e '*' e
     *   | e '/' e
     *   | e '%' e
     *   | e '^' e
     *   | '-' e
     *   | '(' e ')'
     *   | e '<' e
     *   | e '>' e
     *   | e '<=' e
     *   | e '>=' e
     *   | e '==' e
     *   | e '!=' e
     *   | e '&&' e
     *   | e '||' e
     *   | e '??' e
     *   | '!' e
     *   | Datos
     *   | NULL
     *   ;
     * @param nodo
     */
    Analizador.prototype.e = function (nodo) {
        return false;
    };
    /**
     * Lista
     *   : List '}'
     *   ;
     * @param nodo
     */
    Analizador.prototype.lista = function (nodo) {
        return false;
    };
    /**
     * List
     *   : '{' DefList
     *   | List ',' DefList
     *   ;
     * @param nodo
     */
    Analizador.prototype.list = function (nodo) {
        return false;
    };
    /**
     * Datos
     *   : NUMBERLIST
     *   | Identi
     *   | STRINGLIST
     *   | TRUE
     *   | FALSE
     *   ;
     * @param nodo
     * @param Nodo
     */
    Analizador.prototype.datos = function (nodo) {
        return false;
    };
    /**
     * Identi
     *   :var
     *   |getMetodo
     *   |Identi '->' var
     *   |Identi '->' getMetodo
     *   |Identi '.' var
     *   |Identi '.' getMetodo
     *   ;
     */
    Analizador.prototype.identi = function (nodo) {
        return false;
    };
    return Analizador;
}(itermedio_1.default));
exports.default = Analizador;
//# sourceMappingURL=analizador.js.map