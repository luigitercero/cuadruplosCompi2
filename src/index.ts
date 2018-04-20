import Server from './server/server';
import router from './router/router';
import Init from './init';
import path = require( 'path');

import express = require('express');
import bodyParser = require('body-parser');
 const server = Server.init(8080);
 server.app.use(router);
 /*
 import s = require('cosoladite');

 
 server.app.use(bodyParser());
 server.app.use(express.static(path.join(__dirname,'server/public')))
 server.app.use('/',router);

*/
/*
server.app.set('views',path.join(__dirname,'server/views'))
server.app.set('view engine','ejs');
*/
//server.app.engine('html', require('ejs').renderFile);
server.start(()=>{
    console.log("server adsfadfstarter 1 jsjss");
    console.log(path.join(__dirname,'server/views'));
     
    new Init();
});