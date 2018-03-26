import Nodo from './parser/nodo'
import Analizador from './analizador'
import Interprete from './compilador/Parser with parser/Interprete4D/interprete'
export default class Init{

    constructor(){
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/test', 'utf-8');
        let hola = p.parse(/*prueba7 + prueba8*/ archivo);
        let nodo = new Nodo (p.parser.treeparser.raiz);
        let analizador = new Analizador();
        analizador.inicio(nodo);
        console.log(
        "esto es 3D");
        let result = analizador.get3D();

        for(let k in result.temporal) {
            console.log(result.temporal[k].tempora);
         }

         let inter4D = new Interprete(result);
         let t10 = "t10";
         let key:number =  +t10.replace("t","");
         console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
         //inter4D.leer4D(1);
    }
}