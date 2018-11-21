"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var clase_1 = __importDefault(require("./clase"));
var variable_1 = __importDefault(require("./variable"));
var metodo_1 = __importDefault(require("./metodo"));
var Recoleccion = /** @class */ (function () {
    function Recoleccion(analizador) {
        this.analizador = analizador;
        this.clase = new clase_1.default(this);
        this.variable = new variable_1.default(analizador);
        this.metodo = new metodo_1.default(this);
    }
    Recoleccion.prototype.analizar = function (nodo) {
        this.inicio(nodo);
        this.aplicarHerencia();
    };
    Recoleccion.prototype.aplicarHerencia = function () {
        for (var index = 0; index < this.analizador.clases.length; index++) {
            var element = this.analizador.clases[index];
            if (element.herencia) {
                this.buscarHerencia(element);
                element.herencia = false;
            }
        }
    };
    Recoleccion.prototype.buscarHerencia = function (clase) {
        var clas = this.analizador.buscarClase(clase.hereda_de);
        if (clas.herencia == false) {
            this.heredar(clase, clas);
        }
        else {
            var temp = this.analizador.claseA;
            this.analizador.claseA = clas;
            this.buscarHerencia(clas);
            this.analizador.claseA = temp;
            clas.herencia = false;
            this.heredar(clase, clas);
        }
    };
    Recoleccion.prototype.heredar = function (clase, hereda) {
        if (hereda != undefined) {
            for (var index = 0; index < hereda.tabla.esto.ambito.length; index++) {
                var element = hereda.tabla.esto.ambito[index];
                clase.tabla.esto.agregarSimbolo(element);
            }
            for (var index = 0; index < hereda.metodo.length; index++) {
                var element = hereda.metodo[index];
                clase.agregarMetodo(element);
            }
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
                    this.clase.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.analizador.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.analizador.Estructuras.agregarEstructura(this.analizador.getCodEstruct().Inicio(nodo.childNode[0]));
                //this.analizador.newError("declarando struct", 0, 0);
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
                    this.clase.crearClase(nodo));
                return true;
            case "Estruct":
                this.analizador.Estructuras.agregarEstructura(this.analizador.getCodEstruct().Inicio(nodo.childNode[0]));
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
    return Recoleccion;
}());
exports.default = Recoleccion;
//# sourceMappingURL=recoleccion.js.map