"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./parser/nodo"));
var analizador_1 = __importDefault(require("./analizador"));
var interprete_1 = __importDefault(require("./compilador/Parser with parser/Interprete4D/interprete"));
var Init = /** @class */ (function () {
    function Init() {
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        var archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/test', 'utf-8');
        var hola = p.parse(/*prueba7 + prueba8*/ archivo);
        var nodo = new nodo_1.default(p.parser.treeparser.raiz);
        var analizador = new analizador_1.default();
        analizador.inicio(nodo);
        console.log("esto es 3D");
        var result = analizador.get3D();
        var inter4D = new interprete_1.default(result);
        // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
        // inter4D.leer4D(1);
        for (var k in result.temporal) {
            console.log(result.temporal[k].tempora, result.temporal[k].valor);
        }
        for (var k in result.etiqueta) {
            console.log(result.etiqueta[k].poss, result.etiqueta[k].etiqueta);
        }
        for (var k in result.C4D) {
            console.log(result.C4D[k].poss, result.C4D[k].codigo);
        }
    }
    return Init;
}());
exports.default = Init;
//# sourceMappingURL=init.js.map