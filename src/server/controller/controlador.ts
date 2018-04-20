import {Router,Request,Response} from 'express';

export default class Controlador {

    index(req:Request,res:Response,next:any) {
        return res.render('ilin.html');

    }
} 