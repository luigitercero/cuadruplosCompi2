"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var metodo_1 = __importDefault(require("../parser/tablaSimbolos/metodo"));
var simbolo_1 = __importDefault(require("../parser/tablaSimbolos/simbolo"));
var Metodo = /** @class */ (function () {
    function Metodo(recoleccion) {
        this.recoleccion = recoleccion;
    }
    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo
     */
    Metodo.prototype.sobrescribir = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "SOBREESCRIBIR":
                this.recoleccion.analizador.logPorCompletar("tengo que sobreEcribir");
                this.recoleccion.analizador.log("sobrescribir a metodo: " +
                    this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.recoleccion.analizador.log("sobrescrbir a crear metodo: " +
                    this.crearMetodo(nodo.childNode[0]));
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    };
    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo
     */
    Metodo.prototype.crearMetodo = function (nodo) {
        var nombre = nodo.childNode[0].term;
        var visibilidad = this.recoleccion.analizador.PUBLICO;
        switch (nombre) {
            case "Visibilidad":
                visibilidad = nodo.childNode[0].childNode[0].token;
                this.metodo(nodo.childNode[1], visibilidad);
                return true;
            case "Metodo":
                this.recoleccion.analizador.log("crear metodo a metodo: " +
                    this.metodo(nodo.childNode[0], visibilidad));
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    };
    /**
 * Metodo
 *   : Tip ID '(' Parametros '{'
 *   | ID ID '(' Parametros '{'
 *   | ID  TipID ID '(' Parametros '{'
 *   | Metodo  CuerpoMetodo
 *   | constructor
 *   | Principal
 *   ;
 * @param nodo
 */
    /**
     * Constructor
     *: ID '(' Parametros '{'
     *;
     */
    Metodo.prototype.metodo = function (nodo, visi) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.recoleccion.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        switch (nombre) {
            case "Tipo":
                this.tip0ID(nodo, visi);
                return true;
            case "ID":
                this.tip1ID(nodo, visi);
                return true;
            case "Metodo":
                this.metodo(nodo.childNode[0], visi);
                return true;
            case "Constructor":
                tipo = this.recoleccion.analizador.claseA.nombre;
                nombreMetodo = this.recoleccion.analizador.claseA.nombre;
                metodo = new metodo_1.default(nombreMetodo, visi, tipo, nodo.childNode[0].childNode[0].location.first_line);
                metodo.id = this.recoleccion.analizador.getContador() + "";
                this.parametros(nodo.childNode[0].childNode[2], metodo);
                this.recoleccion.analizador.claseA.agregarMetodo(metodo);
                return true;
            case "Principal":
                tipo = "Principal";
                nombreMetodo = "Principal";
                metodo = new metodo_1.default(nombreMetodo, visi, tipo, nodo.childNode[0].childNode[0].location.first_line);
                metodo.id = this.recoleccion.analizador.getContador() + "";
                this.recoleccion.analizador.claseA.agregarMetodo(metodo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    };
    Metodo.prototype.tip0ID = function (nodo, visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.recoleccion.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].childNode[0].token;
            nombreMetodo = nodo.childNode[1].token;
            metodo = new metodo_1.default(nombreMetodo, visibilidad, tipo, nodo.childNode[1].location.first_line);
            metodo.id = this.recoleccion.analizador.getContador() + "";
            this.parametros(nodo.childNode[3], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }
        else {
            tipo = nodo.childNode[0].childNode[0].token;
            var tam = this.tipID(nodo.childNode[1]);
            nombreMetodo = nodo.childNode[1 + 1].token;
            metodo = new metodo_1.default(nombreMetodo, visibilidad, tipo, nodo.childNode[1 + 1].location.first_line);
            metodo.id = this.recoleccion.analizador.getContador() + "";
            metodo.tam = tam;
            this.parametros(nodo.childNode[3 + 1], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }
    };
    Metodo.prototype.tip1ID = function (nodo, visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.recoleccion.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].token;
            nombreMetodo = nodo.childNode[1].token;
            metodo = new metodo_1.default(nombreMetodo, visibilidad, tipo, nodo.childNode[1].location.first_line);
            metodo.id = this.recoleccion.analizador.getContador() + "";
            this.parametros(nodo.childNode[3], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }
        else {
            tipo = nodo.childNode[0].childNode[0].token;
            var tam = this.tipID(nodo.childNode[1]);
            nombreMetodo = nodo.childNode[1 + 1].token;
            metodo = new metodo_1.default(nombreMetodo, visibilidad, tipo, nodo.childNode[1 + 1].location.first_line);
            metodo.id = this.recoleccion.analizador.getContador() + "";
            metodo.tam = tam;
            this.parametros(nodo.childNode[3 + 1], metodo);
            this.recoleccion.analizador.claseA.agregarMetodo(metodo);
        }
    };
    Metodo.prototype.tipID = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "'['":
                return 1;
            case "tipID":
                return this.tipID(nodo.childNode[0]) + 1;
        }
        return 0;
    };
    /**
     * Parametros
     *   : Parametro ')'
     *   |  ')'
     *   ;
     * @param nodo
     */
    Metodo.prototype.parametros = function (nodo, metodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "')'":
                return true;
            case "Parametro":
                this.parametro(nodo.childNode[0], metodo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear metodo", 0, 0);
        return false;
    };
    /**
     * Parametro
     *   : Tipo var
     *   | ID var
     *   | Parametro ',' Tipo var
     *   | Parametro ',' ID var
     *   ;
     * @param nodo
     */
    Metodo.prototype.parametro = function (nodo, metodo) {
        var term = nodo.childNode[0].term;
        var tipo;
        var nombre;
        var simbolo;
        var visibilidad = this.recoleccion.analizador.PUBLICO;
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                simbolo = this.var(nodo.childNode[1], tipo, visibilidad, metodo);
                metodo.addParametro(simbolo);
                return true;
            case "ID":
                tipo = nodo.childNode[0].token.toLocaleLowerCase();
                simbolo = this.var(nodo.childNode[1], tipo, visibilidad, metodo);
                try {
                    this.recoleccion.analizador.getCodEstruct().buscarEstructura(tipo, nodo.childNode[0].location);
                    simbolo.setStruct(true);
                }
                catch (error) {
                }
                metodo.addParametro(simbolo);
                return true;
            case "Parametro":
                this.parametro(nodo.childNode[0], metodo);
                this.addParametron(nodo, metodo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear parametro", 0, 0);
        return false;
    };
    Metodo.prototype.addParametron = function (nodo, metodo) {
        var term = nodo.childNode[2].term;
        var tipo;
        var nombre;
        var simbolo;
        var visibilidad = this.recoleccion.analizador.PUBLICO;
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[2].childNode[0].token;
                simbolo = this.var(nodo.childNode[3], tipo, visibilidad, metodo);
                metodo.addParametro(simbolo);
                return true;
            case "ID":
                tipo = nodo.childNode[2].token;
                simbolo = this.var(nodo.childNode[3], tipo, visibilidad, metodo);
                metodo.addParametro(simbolo);
                return true;
        }
        this.recoleccion.analizador.newError("error al crear parametro", 0, 0);
    };
    /**
  * var
  *: ID
  *| var '[' e ']'
 
  * ;
  * @param nodo
  * @param tipo
  * @param visibilidad
  */
    Metodo.prototype.var = function (nodo, tipo, visibilidad, metodo) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                if (metodo.buscarSimbolo(nombre))
                    this.recoleccion.analizador.newError("la variable existe", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                else {
                    return new simbolo_1.default(nombre, visibilidad, tipo);
                }
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
            case "var":
                var variable = this.var(nodo.childNode[0], tipo, visibilidad, metodo);
                variable.addDimension(nodo.childNode[2]);
                variable.tam++;
                return variable;
            case "PUNTERO":
                nombre = nodo.childNode[1].token;
                if (metodo.buscarSimbolo(nombre))
                    this.recoleccion.analizador.newError("la variable existe", nodo.childNode[1].location.first_line, nodo.childNode[1].location.last_column);
                else {
                    var simbolo = new simbolo_1.default(nombre, visibilidad, tipo);
                    simbolo.setPuntero(true);
                    return simbolo;
                }
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[1].location.last_column, nodo.childNode[1].location.first_line);
            default:
                throw this.recoleccion.analizador.newError("esto no puede declararse ", nodo.childNode[1].location.last_column, nodo.childNode[1].location.first_line);
        }
    };
    return Metodo;
}());
exports.default = Metodo;
//# sourceMappingURL=metodo.js.map