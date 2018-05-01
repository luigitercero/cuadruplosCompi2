
// app.js

import Compilador from './init'
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
import router from './router/router';
import path = require( 'path');
import Comparacion from './parser/exp/operacion/comparacion';
import Tabla from './parser/tablaSimbolos/tabla';
let siguiente = 0;
app.use(router);
app.use(express.static(path.join('/home/luigitercero/Documentos/Compi2/webpack_tutorial/')));

/*
app.get('/', function(req:any, res:any,next:any) {  
    res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/index2.htm');
});
*/


var compilador:Compilador;


io.on('connection', function(client:any) {  
    console.log('Client connected...');

    client.on('join', function(data:any) {
        console.log(data);
    });

    client.on('messages', function(data:any) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);  
    });

    client.on('archivo', function(data:any) {
        try {

            compilador = Compilador.init(data);
            client.emit('archivo', compilador.archivo);
            client.broadcast.emit('archivo',compilador.archivo); 
        } catch (error) {
            client.emit('salidaerror', error.message);
            client.broadcast.emit('salidaerror',error.message);
        }
     });

    client.on('generar', function(data:any) {
      
        try {
            siguiente = 0;
            compilador.analizar(data);
            let codigo =compilador.analizador.gen3D()
            console.log(codigo);
            console.log("fin");
            client.emit('generar',codigo );
            client.broadcast.emit('generar',codigo);
            client.emit('salidaerror',"sin errores" );
        } catch (error) {
            client.emit('salidaerror', error.message);
            client.broadcast.emit('salidaerror',error.message);   
        }
    });
      
    function sendPila(client:any) {
        let pila = compilador.getPila();
        client.emit('pila', "limpiar");
        client.broadcast.emit('pila',"limpiar");
        for (let index = 0; index < pila.length; index++) {
            const element = pila[index];
            client.emit('pila', element);
            client.broadcast.emit('pila',element); 
        }
    }

    function sendHeap (client:any) {
        let heap = compilador.getHeap();
        client.emit('heap', "limpiar");
        client.broadcast.emit('heap',"limpiar");
        
        for (let index = 0; index < heap.length; index++) {
            const element = heap[index];
            client.emit('heap', element);
            client.broadcast.emit('heap',element); 
        }
    }

    function sendPtr (client:any) {
        client.emit('ptr',compilador.getptr());
        client.broadcast.emit('consola',compilador.getptr());
    }

    function sendPth (client:any) {
        client.emit('pth',compilador.getpth());
        client.broadcast.emit('pth',compilador.getpth());
    }
    function sendConsola (client:any) {
        let consola = compilador.consola()
        client.emit('consola',consola);
        client.broadcast.emit('consola',consola);
    }
    function operacion(client:any) {
        let data = compilador.getOperacion()
        client.emit('op', data);
        client.broadcast.emit('op',data);
    }
    function sendAmbito(client:any) {
        let clase = compilador.getAmbito()
        client.emit('ambito', "limpiar");
        client.broadcast.emit('ambito',"limpiar");
        for (let index = 0; index < clase.length; index++) {
            const element = clase[index];
            client.emit('ambito', element);
            client.broadcast.emit('ambito',element);
        }
    }
    client.on('debuguear', function(data:any) {
        try {
          let arreglo = compilador.debuguear(data); 
          client.emit('nuevaPoss',arreglo );
          client.broadcast.emit('nuevaPoss',arreglo);
          sendPila(client);
          sendHeap(client);
          sendPtr(client);    
          sendPth(client);
          sendConsola(client);
          operacion(client);
          sendAmbito(client);
        } catch (error) {
          client.emit('salidaerror', error);
          client.broadcast.emit('salidaerror',error.message);
        }
     
    });
    client.on('siguiente', function(data:any) {
        sigue(client);
    });

    function sigue(client:any){
        try {
            let arreglo = compilador.siguiente();
            client.emit('nuevaPoss',arreglo );
            client.broadcast.emit('nuevaPoss',arreglo);
            sendPila(client);
            sendHeap(client);
            sendPtr(client);    
            sendPth(client);
            sendConsola(client);
            operacion(client);
            sendAmbito(client);
          } catch (error) {
            client.emit('salidaerror', error.message);
            client.broadcast.emit('salidaerror',error.message);
          }    
    }

    let salida =true;
    client.on('alto',function(data:any){
        salida = true;
    })

    client.on('auto',function(data:any){
            if (salida) {
            salida = false;
            try {
                var count = 0; 
                var intervalObject = setInterval(function () { 
                    count++; 
                    console.log(count, 'seconds passed');
                    sigue(client); 
                    if (salida) { 
                        console.log('exiting'); 
                        clearInterval(intervalObject); 
                    } 
                }, 500); 
            } catch (error) {

            }
        }
    })
});
server.listen(8080);   



/*import Server from './server/server';

import Init from './init';
import path = require( 'path');

import express = require('express');
import bodyParser = require('body-parser');

const server = Server.init(8080);

var cons = require('consolidate');
server.app.engine('html', cons.swig)
server.app.set('view engine','ejs');
server.app.use(bodyParser());

server.app.set('views',path.join(__dirname,'server/views'))
server.app.use(bodyParser());

server.app.use(express.static(path.join(__dirname,'/server/public')))
server.app.use(router);

server.start(()=>{
    console.log("server adsfadfstarter 1 jsjss");
    //new Init();
});
//app.use(express.static(__dirname + '/node_modules'));  


server.app.get('/', function(req, res,next) {  
    res.sendFile('/home/luigitercero/Documentos/Compi2/sockets'+ '/index.html');
});


var io = require('socket.io')(server);

io.on('connection', function(client:any) {  
    console.log('Client connected...');

    client.on('join', function(data:any) {
        console.log(data);
    });

    client.on('messages', function(data:any) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    });


});*/