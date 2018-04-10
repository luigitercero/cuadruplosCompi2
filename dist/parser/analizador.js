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
var itermedio_1 = __importDefault(require("./itermedio"));
var Exp_1 = __importDefault(require("./exp/operacion/Exp"));
var variable_1 = __importDefault(require("./variable/variable"));
var metodo_1 = __importDefault(require("./metodo/metodo"));
var clase_1 = __importDefault(require("./tablaSimbolos/clase"));
var recoleccion_1 = __importDefault(require("../precompilacion/recoleccion"));
var clase_2 = __importDefault(require("./clase/clase"));
var Analizador = /** @class */ (function (_super) {
    __extends(Analizador, _super);
    function Analizador() {
        var _this = _super.call(this) || this;
        _this.exp = new Exp_1.default(_this);
        _this.variable = new variable_1.default(_this);
        _this.metodoA = new metodo_1.default(_this);
        _this.claseA = new clase_1.default("", 0);
        _this.clases = new Array();
        _this.clas = new clase_2.default(_this);
        return _this;
    }
    Analizador.prototype.verTodasLasClases = function () {
        console.log("---------Obeservando clasese-----------");
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            element.verMetodosDeClase();
            element.verVariable();
        }
        console.log("---------Fin Obeservando clasese-----------");
    };
    Analizador.prototype.buscarClase = function (nombre) {
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            if (element.nombre == nombre) {
                element.verVariable();
                return element;
            }
        }
        this.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return new clase_1.default("", 0);
    };
    Analizador.prototype.verClaseA = function () {
        console.log("---------Obeservando ClaseA-----------");
        this.claseA.verMetodosDeClase();
        this.claseA.verVariable();
        console.log("---------Fin Obeservando ClaseA-----------");
    };
    /**
     * inicio
     *: Encabezado EOF
     *;
     * @param nodo
     */
    Analizador.prototype.inicio = function (nodo) {
        var recoleccion = new recoleccion_1.default(this);
        recoleccion.analizar(nodo);
        //this.verTodasLasClases();
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
                    this.clas.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
        }
        return false;
    };
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
                    this.clas.crearClase(nodo));
                return true;
            case "Estruct":
                this.logPorCompletar("estruct");
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