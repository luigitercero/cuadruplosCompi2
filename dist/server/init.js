"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./parser/nodo"));
var analizador_1 = __importDefault(require("./parser/analizador"));
var interprete_1 = __importDefault(require("./compilador/Parser with parser/Interprete4D/interprete"));
var Init = /** @class */ (function () {
    function Init(nombre) {
        var fs = require('fs');
        var rut = "/home/luigitercero/Documentos/Compi2/Archivo De entrada/";
        //let archivo = fs.readFileSync(rut+'arreglo', 'utf-8');
        //let archivo = fs.readFileSync(rut+'asignaciones', 'utf-8');
        //let archivo = fs.readFileSync(rut+'operacion', 'utf-8');
        //let archivo = fs.readFileSync(rut+'test', 'utf-8');
        this.archivo = fs.readFileSync(rut + nombre, 'utf-8');
        //let archivo = fs.readFileSync(rut+'control', 'utf-8');
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
    Init.prototype.getAmbito = function () {
        return this.inter4D.ambito;
    };
    Init.prototype.getPila = function () {
        return this.inter4D.p.parser.struct.op.stack;
    };
    Init.prototype.consola = function () {
        return this.inter4D.p.parser.struct.op.consola;
    };
    Init.prototype.getHeap = function () {
        return this.inter4D.p.parser.struct.op.heap;
    };
    Init.prototype.getptr = function () {
        return this.inter4D.p.parser.struct.op.ptr;
    };
    Init.prototype.getpth = function () {
        return this.inter4D.p.parser.struct.op.pth;
    };
    Init.prototype.getOperacion = function () {
        return this.inter4D.p.parser.struct.op.op;
    };
    Init.prototype.debuguear = function (data) {
        if (this.inter4D != undefined) {
            // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
            var a = this.inter4D.seguir(data);
            /**
            for(let k in this.d4.temporal) {
               console.log(this.d4.temporal[k].tempora,this.d4.temporal[k].valor);
            }
   
            for(let k in this.d4.etiqueta) {
               console.log(this.d4.etiqueta[k].poss,this.d4.etiqueta[k].etiqueta);
            }
           
            var persons: { [id: string] : IPerson; } = {};
            persons["p1"] = { firstName: "F1", lastName: "L1" };
            persons["p2"] = { firstName: "Fe", lastName: "Le" };
            console.log(persons["p1"].firstName);
            console.log(persons["p2"].firstName); */
            return a;
        }
    };
    Init.prototype.siguiente = function () {
        return this.inter4D.siguiente();
    };
    Init.init = function (nombre) {
        return new Init(nombre);
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