"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./parser/nodo"));
var analizador_1 = __importDefault(require("./parser/analizador"));
var interprete_1 = __importDefault(require("./compilador/Parser with parser/Interprete4D/interprete"));
var Init = /** @class */ (function () {
    function Init() {
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        var rut = "/home/luigitercero/Documentos/Compi2/Archivo De entrada/";
        //let archivo = fs.readFileSync(rut+'arreglo', 'utf-8');
        //let archivo = fs.readFileSync(rut+'asignaciones', 'utf-8');
        //let archivo = fs.readFileSync(rut+'operacion', 'utf-8');
        //let archivo = fs.readFileSync(rut+'test', 'utf-8');
        var archivo = fs.readFileSync(rut + 'ejecucion', 'utf-8');
        //let archivo = fs.readFileSync(rut+'control', 'utf-8');
        var hola = p.parse(/*prueba7 + prueba8*/ archivo);
        var nodo = new nodo_1.default(p.parser.treeparser.raiz);
        var analizador = new analizador_1.default();
        analizador.inicio(nodo);
        console.log("esto es 3D");
        var result = analizador.get3D();
        this.d4 = result;
        for (var k in result.C4D) {
            console.log(result.C4D[k].poss, result.C4D[k].codigo, result.C4D[k].columna, result.C4D[k].linea);
        }
        var inter4D = new interprete_1.default(result);
        // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
        inter4D.start();
        for (var k in result.temporal) {
            console.log(result.temporal[k].tempora, result.temporal[k].valor);
        }
        for (var k in result.etiqueta) {
            console.log(result.etiqueta[k].poss, result.etiqueta[k].etiqueta);
        }
        var persons = {};
        persons["p1"] = { firstName: "F1", lastName: "L1" };
        persons["p2"] = { firstName: "Fe", lastName: "Le" };
        console.log(persons["p1"].firstName);
        console.log(persons["p2"].firstName);
    }
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