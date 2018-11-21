"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var recorrerArbol_1 = __importDefault(require("./recorrerArbol"));
var Estructura_1 = __importDefault(require("../tablaSimbolos/estructura/Estructura"));
var variable_1 = __importDefault(require("../../precompilacion/variable"));
var Estructura = /** @class */ (function () {
    function Estructura(analizador) {
        this.analizador = analizador;
        this.recorrer = new recorrerArbol_1.default();
        this._RVariable = new variable_1.default(analizador);
    }
    Estructura.prototype.delcararEstructurasGlobales = function (nodo) {
        this.Inicio(nodo);
    };
    Estructura.prototype.Inicio = function (nodo) {
        var term = nodo.childNode[0].term;
        this.analizador.recorrerArbol(nodo);
        switch (term) {
            case "Cuerpo_Estruct":
                return this.Cuerpo_Estruct(nodo.childNode[0]);
        }
        throw this.analizador.newError("error a declarar struct", 0, 0);
    };
    Estructura.prototype.Cuerpo_Estruct = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "Cuerpo_Estruct":
                var estructura = this.Cuerpo_Estruct(nodo.childNode[0]);
                this.Declarar_Variable(nodo.childNode[1], estructura);
                return estructura;
            case "ESTRUCTURA":
                return this.crearEstrucura(nodo.childNode[1]);
        }
        throw this.analizador.newError("error a declarar struct", 0, 0);
    };
    Estructura.prototype.Declarar_Variable = function (nodo, estructura) {
        var tipo = nodo.childNode[0].term;
        var struct = false;
        var punter = false;
        if (tipo == "Tipo") {
            tipo = nodo.childNode[0].childNode[0].token;
        }
        else {
            tipo = nodo.childNode[0].token;
            struct = true;
            punter = true;
        }
        var variable = this._RVariable.var(nodo.childNode[1], tipo, "");
        variable.setStruct(struct);
        variable.setPuntero(punter);
        this._RVariable.asignarValor(nodo.childNode[2], variable);
        estructura.agregarSim(variable);
    };
    Estructura.prototype.crearEstrucura = function (nodo) {
        var nombre = nodo.token;
        var estructura = new Estructura_1.default(nombre, nodo.location.first_line);
        this.analizador.Estructuras.agregarEstructura(estructura);
        return estructura;
    };
    Estructura.prototype.InicializarEstructura = function (nombre, location) {
        var s = this.analizador.Estructuras.buscarEstructura(nombre, location);
        var struct;
        if (s == undefined) {
            var s2 = this.analizador.claseA.estructura.buscarEstructura(nombre, location);
            if (s2 != undefined) {
                struct = s2;
            }
            else {
                throw this.analizador.newError("error no se encontro la estructura", location.first_line, location.last_column);
            }
        }
        else {
            struct = s;
        }
        struct.variables.ambito.length;
    };
    Estructura.prototype.buscarEstructura = function (nombre, location) {
        var s = this.analizador.Estructuras.buscarEstructura(nombre, location);
        var struct;
        if (s == undefined) {
            var s2 = this.analizador.claseA.estructura.buscarEstructura(nombre, location);
            if (s2 != undefined) {
                return struct = s2;
            }
            else {
                throw this.analizador.newError("error no se encontro la estructura", location.first_line, location.last_column);
            }
        }
        else {
            return struct = s;
        }
    };
    return Estructura;
}());
exports.default = Estructura;
//# sourceMappingURL=estructura.js.map