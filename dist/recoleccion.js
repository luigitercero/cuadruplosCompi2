"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var clase_1 = __importDefault(require("./parser/tablaSimbolos/clase"));
var Recoleccion = /** @class */ (function () {
    function Recoleccion(analizador) {
        this.analizador = analizador;
    }
    Recoleccion.prototype.analizar = function (nodo) {
        try {
            this.inicio(nodo);
        }
        catch (error) {
        }
    };
    Recoleccion.prototype.inicio = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.analizador.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0]));
                return true;
            case "Encabezado":
                this.analizador.log("inicio a Encabezado: " +
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
    Recoleccion.prototype.encabezado = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Encabezado":
                this.analizador.log("encabezado a encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.analizador.log("encabezado a crear Clase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.analizador.log("encabezado a Import: " +
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
    Recoleccion.prototype.CE = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.analizador.log("CE a creaClase: " +
                    this.crearClase(nodo));
                return true;
            case "Estruct":
                this.analizador.logPorCompletar("estruct");
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
    Recoleccion.prototype.import = function (nodo) {
        var nombre = nodo.childNode[0].term;
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
    Recoleccion.prototype.importar = function (nodo) {
        this.analizador.log("vamo a importar");
        return true;
    };
    /**
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo
     */
    Recoleccion.prototype.crearClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CrearClase":
                this.analizador.log("crearClase a crearClase: " +
                    this.crearClase(nodo.childNode[0]));
                return true;
            case "Clase":
                this.analizador.log("crearClase a Clase: " +
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
    Recoleccion.prototype.clase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CLASE":
                this.analizador.claseA = new clase_1.default(nodo.childNode[1].token, nodo.childNode[1].location.first_line);
                this.herencia(nodo.childNode[2]);
                return true;
            case "Clase":
                this.analizador.log("clase a clase: " +
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
    Recoleccion.prototype.herencia = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "HEREDADE":
                this.analizador.logPorCompletar("herencia");
                this.analizador.log("agregando herencia " + nodo.childNode[1].token);
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
    Recoleccion.prototype.cuerpoClase = function (nodo) {
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
    Recoleccion.prototype.navegar = function (nodo) {
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
    Recoleccion.prototype.control = function (nodo) {
        return false;
    };
    /**
     * Cuerpo: '{'Cuerpo1 '}'
     *   | '{' '}'
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.cuerpo = function (nodo) {
        return false;
    };
    /**
     * Cuerpo1
     *   :Cuerpo1 CuerpoMetodo
     *   |CuerpoMetodo
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.curpo1 = function (nodo) {
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
    Recoleccion.prototype.branching = function (nodo) {
        return false;
    };
    /**
     * Expresion
     *  : '(' e ')'
     *  ;
     * @param nodo
     */
    Recoleccion.prototype.expresion = function (nodo) {
        return false;
    };
    /**
     * getMetodoZ
     *   : Navegar  getMetodo
     *   | getMetodo
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.getMetodoZ = function (nodo) {
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
    Recoleccion.prototype.getMetodo = function (nodo) {
        return false;
    };
    /**
     * getParametro
     *   : ParametroM ')'
     *   | ')'
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.getParametro = function (nodo) {
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
    Recoleccion.prototype.parametroM = function (nodo) {
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
    Recoleccion.prototype.primitivas = function (nodo) {
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
    Recoleccion.prototype.e = function (nodo) {
        return false;
    };
    /**
     * Lista
     *   : List '}'
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.lista = function (nodo) {
        return false;
    };
    /**
     * List
     *   : '{' DefList
     *   | List ',' DefList
     *   ;
     * @param nodo
     */
    Recoleccion.prototype.list = function (nodo) {
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
    Recoleccion.prototype.datos = function (nodo) {
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
    Recoleccion.prototype.identi = function (nodo) {
        return false;
    };
    return Recoleccion;
}());
exports.default = Recoleccion;
//# sourceMappingURL=recoleccion.js.map