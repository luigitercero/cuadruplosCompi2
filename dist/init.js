"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./parser/nodo"));
var analizador_1 = __importDefault(require("./analizador"));
var Init = /** @class */ (function () {
    function Init() {
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        var archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/test', 'utf-8');
        var hola = p.parse(/*prueba7 + prueba8*/ archivo);
        var nodo = new nodo_1.default(p.parser.treeparser.raiz);
        var analizador = new analizador_1.default();
        analizador.inicio(nodo);
        console.log(analizador.get3D() + "esto es 3D");
    }
    return Init;
}());
exports.default = Init;
//# sourceMappingURL=init.js.map