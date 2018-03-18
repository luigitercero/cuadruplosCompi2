import {Router,Request,Response} from 'express';
import Nodo from '../parser/nodo'
const router = Router();

router.get ('/',(req: Request,res: Response)=>{
    var p = require('../compilador/Parser with parser/Codigo3D/codigoFinal');
    var fs = require('fs');
    let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/expressTypescript/dist/compilador/Parser with parser/Codigo3D/test', 'utf-8');
    let hola = p.parse(/*prueba7 + prueba8*/ archivo);
    let nodo = new Nodo (p.parser.treeparser.raiz);

    nodo.recorrer(nodo,"");
    res.send('hola mundo  ' + nodo.childNode[0].term  +"  prueba" + "p: " +"hola: "+ hola + "archivo: "+ archivo );

});

export default router;