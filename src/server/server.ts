import express = require('express');

export default class Server{
private port: number;

    public app:express.Application;
    constructor(port:number){
        this.port =port;
        this.app =express();
    }

    start(callback?: Function){

        this.app.listen(this.port,callback);
    }
    static init(port:number):Server{
        return new Server(port);
    }
}