import Nodo from './parser/nodo'
import Analizador from './analizador'
export default class Init{

    constructor(){
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/expressTypescript/dist/compilador/Parser with parser/Codigo3D/test', 'utf-8');
        let hola = p.parse(/*prueba7 + prueba8*/ archivo);
        let nodo = new Nodo (p.parser.treeparser.raiz);
        let analizador = new Analizador();
        analizador.inicio(nodo);

        
    }
}