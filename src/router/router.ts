    import {Router,Request,Response} from 'express';
import Nodo from '../parser/nodo'
import Analizador from '../parser/analizador'
import Init from '../init';
import Controller from '../server/controller/controlador'
import Saludo from './saludo'

const path = require('path');
const router = Router();
const controller = new Controller();

router.get ('/',(req: Request,res: Response)=>{
    //let d4 =  new Init()
   // res.send(d4.d4);
   // new Saludo()
   res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/index.html');
});
router.get ('/principal',(req: Request,res: Response)=>{
    //let d4 =  new Init()
   // res.send(d4.d4);
    //new Saludo()
   res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/principal.html');
});
router.get ('/nuevaLeccion',(req: Request,res: Response)=>{
    //let d4 =  new Init()
   // res.send(d4.d4);
    //new Saludo()
   res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/nuevaLeccion.html');
});
router.get ('/practica',(req: Request,res: Response)=>{
    //let d4 =  new Init()
   // res.send(d4.d4);
    //new Saludo()
   res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/practica.html');
});

/*
router.get ('/i',(req: Request,res: Response)=>{
    res.sendFile(path.join(__dirname+'/views/ilin.html'));
 });
 */
router.get ('/i',controller.index);
export default router;


