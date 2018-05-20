"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./parser/nodo"));
var analizador_1 = __importDefault(require("./parser/analizador"));
var interprete_1 = __importDefault(require("./compilador/Parser with parser/Interprete4D/interprete"));
var Init = /** @class */ (function () {
    function Init(nombre, archivo) {
        if (archivo == undefined) {
            var fs = require('fs');
            var rut = "/home/luigitercero/Documentos/Compi2/Archivo De entrada/";
            this.archivo = fs.readFileSync(rut + nombre, 'utf-8');
        }
        else {
            this.archivo = nombre;
        }
    }
    Init.prototype.analizar = function (data) {
        this.archivo = data;
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var hola = p.parse(/*prueba7 + prueba8*/ this.archivo);
        var nodo = new nodo_1.default(p.parser.treeparser.raiz);
        this.analizador = new analizador_1.default();
        this.analizador.inicio(nodo);
        var result = this.analizador.get3D();
        this.d4 = result;
        this.inter4D = new interprete_1.default(result);
    };
    Init.prototype.meter = function (data) {
        this.inter4D.Op.meterHeap(data);
    };
    Init.prototype.getSalida = function () {
        if (this.inter4D.getIndex() > 0) {
            return false;
        }
        return true;
    };
    Init.prototype.getAmbito = function () {
        return this.inter4D.ambito;
    };
    Init.prototype.getPila = function () {
        return this.inter4D.Op.stack;
    };
    Init.prototype.consola = function () {
        return this.inter4D.Op.consola;
    };
    Init.prototype.getHeap = function () {
        return this.inter4D.Op.heap;
    };
    Init.prototype.getptr = function () {
        return this.inter4D.Op.ptr;
    };
    Init.prototype.getpth = function () {
        return this.inter4D.Op.pth;
    };
    Init.prototype.getOperacion = function () {
        return this.inter4D.Op.op;
    };
    Init.prototype.enviarCadena = function () {
        if (this.inter4D.Op.pedir) {
            return this.inter4D.Op.message;
        }
    };
    Init.prototype.isPedir = function () {
        return this.inter4D.Op.pedir;
    };
    Init.prototype.reiniciarPedir = function () {
        this.inter4D.Op.pedir = false;
    };
    Init.prototype.debuguear = function (data) {
        if (this.inter4D != undefined) {
            // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
            var a = this.inter4D.seguir(data);
            return a;
        }
    };
    Init.prototype.seSalio = function () {
        return this.inter4D.salida;
    };
    Init.prototype.stop = function () {
        this.inter4D.salida = true;
    };
    Init.prototype.start = function () {
        this.inter4D.salida = false;
    };
    Init.prototype.siguiente = function () {
        return this.inter4D.siguiente();
    };
    Init.prototype.siguienteSimple = function () {
    };
    Init.init = function (nombre, archivo) {
        return new Init(nombre, archivo);
    };
    return Init;
}());
exports.default = Init;
var P = /** @class */ (function () {
    function P() {
    }
    P.prototype.p = function () {
        var persons = {};
        persons["p1"] = { firstName: "F1", lastName: "L1" };
    };
    return P;
}());
//# sourceMappingURL=init.js.map