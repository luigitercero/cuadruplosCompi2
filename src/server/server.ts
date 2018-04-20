import express = require('express');

export default class Server{
private port: number;

    public app:express.Application;
    
    constructor(port:number){
        this.port =port;
        this.app =express();
        //server.app.set('views',path.join(__dirname,'views'))
        //server.app.set('view engine','ejs');

    }

    start(callback?: Function){

        this.app.listen(this.port,callback);
    }
    static init(port:number):Server{
        return new Server(port);
    }
}