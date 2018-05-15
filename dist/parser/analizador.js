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
var Estructuras_1 = __importDefault(require("./tablaSimbolos/estructura/Estructuras"));
var recoleccion_1 = __importDefault(require("../precompilacion/recoleccion"));
var clase_2 = __importDefault(require("./clase/clase"));
var cuerpo_1 = __importDefault(require("./metodo/cuerpo"));
var estructura_1 = __importDefault(require("./estrucura/estructura"));
var Analizador = /** @class */ (function (_super) {
    __extends(Analizador, _super);
    function Analizador() {
        var _this = _super.call(this) || this;
        _this.exp = new Exp_1.default(_this);
        _this.variable = new variable_1.default(_this);
        _this.metodoA = new metodo_1.default(_this);
        _this.cuerpo = new cuerpo_1.default(_this);
        _this.claseA = new clase_1.default("", 0);
        _this.clases = new Array();
        _this.Estructuras = new Estructuras_1.default();
        _this.clas = new clase_2.default(_this);
        _this.estructura = new estructura_1.default(_this);
        return _this;
    }
    Analizador.prototype.getCodEstruct = function () {
        return this.estructura;
    };
    Analizador.prototype.getAmbito = function () {
        var ambito = [];
        for (var index = 0; index < this.claseA.tabla.Lista.length; index++) {
            var element = this.claseA.tabla.Lista[index];
            for (var index_1 = 0; index_1 < element.ambito.length; index_1++) {
                var datos = [];
                var simbolo = element.ambito[index_1];
                datos.push(simbolo.getNombre());
                datos.push(simbolo.getTipo());
                datos.push(simbolo.getVisibilidad());
                datos.push(simbolo.getTamanio());
                datos.push(simbolo.possAmbito);
                datos.push(simbolo.linea);
                datos.push("ptr");
                datos.push(this.claseA.nombre);
                ambito.push(datos);
            }
        }
        for (var index = 0; index < this.claseA.tabla.esto.ambito.length; index++) {
            var simbolo = this.claseA.tabla.esto.ambito[index];
            var datos = [];
            datos.push(simbolo.getNombre());
            datos.push(simbolo.getTipo());
            datos.push(simbolo.getVisibilidad());
            datos.push(simbolo.getTamanio());
            datos.push(simbolo.possAmbito);
            datos.push(simbolo.linea);
            datos.push("heap");
            datos.push(this.claseA.nombre);
            ambito.push(datos);
        }
        return ambito;
    };
    Analizador.prototype.recorrer = function (nodo, espacio) {
        var _this = this;
        console.log(espacio + nodo.term);
        nodo.childNode.forEach(function (element) {
            _this.recorrer(element, espacio + " ");
        });
    };
    Analizador.prototype.recorrerArbol = function (nodo) {
        var _this = this;
        console.log(nodo.term);
        nodo.childNode.forEach(function (element) {
            _this.recorrer(element, " ");
        });
    };
    Analizador.prototype.verTodasLasClases = function () {
        console.log("---------Obeservando clasese-----------");
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            element.verMetodosDeClase();
            element.verVariable();
        }
        console.log("---------Fin Obeservando clasese-----------");
    };
    Analizador.prototype.buscarClase = function (nombre, navegar) {
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            if (element.nombre == nombre.toLowerCase()) {
                element.verVariable();
                return element;
            }
        }
        if (navegar == null) {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        }
        else {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre + "variable", navegar.fila, navegar.column);
        }
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
    return Analizador;
}(itermedio_1.default));
exports.default = Analizador;
//# sourceMappingURL=analizador.js.map