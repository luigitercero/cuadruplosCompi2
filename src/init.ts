import Nodo from './parser/nodo'
import Analizador from './parser/analizador'
import Interprete from './compilador/Parser with parser/Interprete4D/interprete'
export default class Init{

    constructor(){
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        var fs = require('fs');
        let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/arreglo', 'utf-8');
        let hola = p.parse(/*prueba7 + prueba8*/ archivo);
        let nodo = new Nodo (p.parser.treeparser.raiz);
        let analizador = new Analizador();
        analizador.inicio(nodo);
        console.log(
        "esto es 3D");
        let result = analizador.get3D();

       

         let inter4D = new Interprete(result);
        
        // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
        // inter4D.leer4D(1);
         
         for(let k in result.temporal) {
            console.log(result.temporal[k].tempora,result.temporal[k].valor);
         }

         for(let k in result.etiqueta) {
            console.log(result.etiqueta[k].poss,result.etiqueta[k].etiqueta);
         }
         for(let k in result.C4D) {
            console.log(result.C4D[k].poss,result.C4D[k].codigo,result.C4D[k].columna,result.C4D[k].linea);
         }


    }
}