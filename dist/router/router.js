"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    /**
    var p = require('../compilador/Parser with parser/Codigo3D/codigoFinal');
    var fs = require('fs');
    let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/expressTypescript/dist/compilador/Parser with parser/Codigo3D/test', 'utf-8');
    let hola = p.parse(/*prueba7 + prueba8*archivo);
    let nodo = new Nodo (p.parser.treeparser.raiz);
    let analizador = new Analizador();
    analizador.inicio(nodo);
    res.send('hola mundo  ' + nodo.childNode[0].term  +"  prueba" + "p: " +"hola: "+ hola + "archivo: "+ archivo );
    */
    res.send('hola mundo');
});
exports.default = router;
//# sourceMappingURL=router.js.map