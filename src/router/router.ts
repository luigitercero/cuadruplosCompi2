    import {Router,Request,Response} from 'express';
import Nodo from '../parser/nodo'
import Analizador from '../parser/analizador'
import Init from '../init';
import Controller from '../server/controller/controlador'
const path = require('path');
const router = Router();
const controller = new Controller();

router.get ('/',(req: Request,res: Response)=>{
   let d4 =  new Init()
    res.send(d4.d4);
});

router.get ('/i',(req: Request,res: Response)=>{
    res.sendFile(path.join(__dirname+'/views/ilin.html'));
 });
 
//router.get ('/i',controller.index);
export default router;