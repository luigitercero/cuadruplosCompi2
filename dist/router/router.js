"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var nodo_1 = __importDefault(require("../parser/nodo"));
var router = express_1.Router();
router.get('/', function (req, res) {
    var p = require('../compilador/Parser with parser/Codigo3D/codigoFinal');
    var fs = require('fs');
    var archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/expressTypescript/dist/compilador/Parser with parser/Codigo3D/test', 'utf-8');
    var hola = p.parse(/*prueba7 + prueba8*/ archivo);
    var nodo = new nodo_1.default(p.parser.treeparser.raiz);
    nodo.recorrer(nodo, "");
    res.send('hola mundo  ' + nodo.childNode[0].term + "  prueba" + "p: " + "hola: " + hola + "archivo: " + archivo);
});
exports.default = router;
