import express = require('express');

export default class Server{
private port: number;

    public app:express.Application;
    public server:express.Application;
    constructor(port:number){
        this.port =port;
        this.app =express();
        this.server = require('http').createServer(this.app); 
    }

    start(callback?: Function){

        this.server.listen(this.port,callback);
    }
    static init(port:number):Server{
        return new Server(port);
    }
}