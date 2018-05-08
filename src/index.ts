
// app.js

import Compilador from './init'
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
import router from './router/router';
import path = require('path');
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





io.on('connection', function (client: any) {
    let salida = true;
    var compilador: Compilador;
    console.log('Client connected...');
    client.on('join', function (data: any) {
        console.log(data);
        salida = true;
    });
    client.on('messages', function (data: any) {
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
        salida = true;
    });
    client.on('archivo', function (data: any) {
        try {

            compilador = Compilador.init(data);
            client.emit('archivo', compilador.archivo);
            client.broadcast.emit('archivo', compilador.archivo);
            salida = true;
        } catch (error) {
            client.emit('salidaerror', "archivo " + error.message);
            client.broadcast.emit('salidaerror', "archivo" + error.message);
        }
    });
    client.on('generar', function (data: any) {
        siguiente = 0;
        compilador = Compilador.init(data, true);
        compilador.analizar(data);
        let codigo = compilador.analizador.gen3D()
        console.log(codigo);
        console.log("fin");
        client.emit('generar', codigo);
        salida = true;
        try {

        } catch (error) {
            client.emit('salidaerror', "generando " + error.message);
            client.broadcast.emit('salidaerror', "generando " + error.message);
        }
    });
    function sendPila(client: any) {
        let pila = compilador.getPila();
        let salida = "";
        if (pila.length >= 35174492) {
            client.emit('salidaerror', "nulo");
            client.broadcast.emit('salidaerror', "nulo");
        } else {
            let puntero = compilador.getptr()
            for (let index = 0; index < pila.length; index++) {
                const element = pila[index];
                if (element == undefined) {

                    if (puntero == index) {
                        salida = salida + "<tr class = \"purple lighten-5\">"
                    } else {
                        salida = salida + "<tr>"
                    }
                    salida = salida
                        + "<th>" + index + "</th>"
                        + "<th>" + "null" + "</th>"
                        + "</tr>"
                } else {

                    if (puntero == index) {
                        salida = salida + "<tr class = \"purple lighten-5\">"
                    } else {
                        salida = salida + "<tr>"
                    }
                    salida = salida
                        + "<th>" + index + "</th>"
                        + "<th>" + element + "</th>"
                        + "</tr>"
                }

            }
            client.emit('pila', "limpiar");
            client.broadcast.emit('pila', "limpiar");
            client.emit('pila', salida);
            client.broadcast.emit('pila', salida);
        }
    }
    function sendHeap(client: any) {
        let heap = compilador.getHeap();
        let salida = "";
        for (let index = 0; index < heap.length; index++) {
            if (heap.length >= 35174492) {
                client.emit('salidaerror', "nulo");
                client.broadcast.emit('salidaerror', "nulo");
                break
            }
            const element = heap[index];
            if (element == undefined) {
                salida = salida + "<tr>"
                    + "<th>" + index + "</th>"
                    + "<th>" + "null" + "</th>"
                    + "</tr>"
            } else {
                salida = salida + "<tr>"
                    + "<th>" + index + "</th>"
                    + "<th>" + element + "</th>"
                    + "</tr>"
            }

        }
        client.emit('heap', "limpiar");
        client.broadcast.emit('heap', "limpiar");
        client.emit('heap', salida);
        client.broadcast.emit('heap', salida);
    }
    function sendPtr(client: any) {
        client.emit('ptr', compilador.getptr());
        client.broadcast.emit('consola', compilador.getptr());
    }
    function sendPth(client: any) {
        client.emit('pth', compilador.getpth());
        client.broadcast.emit('pth', compilador.getpth());
    }
    function sendConsola(client: any) {
        let consola = compilador.consola()
        client.emit('consola', consola);
        client.broadcast.emit('consola', consola);
    }
    function operacion(client: any) {
        let data = compilador.getOperacion()
        client.emit('op', data);
        client.broadcast.emit('op', data);
    }
    function sendAmbito(client: any) {
        let clase = compilador.getAmbito()
        let salida = "";
        let ptr = compilador.getptr()
        for (let index = 0; index < clase.length; index++) {
            const element = clase[index];
            salida = salida + "<tr>"
                + "<th>" + index + "</th>"
                + "<th>" + (index + ptr) + "</th>"
                + "<th class = \"purple lighten-5\">" + element[0] + "</th>"
                + "<th>" + element[1] + "</th>"
                + "<th>" + element[2] + "</th>"
                + "<th>" + element[3] + "</th>"
                + "<th>" + element[4] + "</th>"
                + "<th>" + element[5] + "</th>"
                + "<th>" + element[6] + "</th>"
                + "<th>" + element[7] + "</th>"
                + "</tr>";
        }
        client.emit('ambito', "limpiar");
        client.broadcast.emit('ambito', "limpiar");
        client.emit('ambito', salida);
        client.broadcast.emit('ambito', salida);
    }
    client.on('debuguear', function (data: any) {
        try {
            let arreglo = compilador.debuguear(data);
            client.emit('nuevaPoss', arreglo);
            client.broadcast.emit('nuevaPoss', arreglo);
            sendPila(client);
            sendHeap(client);
            sendPtr(client);
            sendPth(client);
            sendConsola(client);
            operacion(client);
            sendAmbito(client);
        } catch (error) {
            client.emit('salidaerror', "debuguear " + error.message);
            client.broadcast.emit('salidaerror', "debuguear " + error.message);
        }
        salida = true;
    });
    client.on('siguiente', function (data: any) {
        salida = true;
        sigue(client);

    });
    function sigue(client: any) {

        try {
            let arreglo = compilador.siguiente();
            client.emit('nuevaPoss', arreglo);
            client.broadcast.emit('nuevaPoss', arreglo);
            sendPila(client);
            sendHeap(client);
            sendPtr(client);
            sendPth(client);
            sendConsola(client);
            operacion(client);
            sendAmbito(client);
        } catch (error) {
            client.emit('salidaerror', "sigue " + error.message);
            client.broadcast.emit('salidaerror', "sigue  " + error.message);
        }
    }
    client.on('alto', function (data: any) {
        salida = true;
    })
    client.on('auto', function (data: any) {
        if (salida) {
            var count = 0;
            try {
                salida = false;
                var intervalObject = setInterval(function () {
                    count++;
                    console.log(count, 'seconds passed');
                    sigue(client);
                    if (salida) {
                        console.log('exiting');
                        clearInterval(intervalObject);
                    } if (!salida) {
                        salida = compilador.getSalida();
                        if (salida) {
                            console.log('exiting');
                            clearInterval(intervalObject);
                        }
                    }
                }, 500);
            } catch (error) {
                salida = true;
                client.emit('salidaerror', "automatico " + error.message);
                client.broadcast.emit('salidaerror', "automatico " + error.message);
            }
        }
    });
    client.on('probar', function (data: any) {
        try {
            compilador = Compilador.init(data, true);
            siguiente = 0;
            compilador.analizar(data);
            let codigo = compilador.analizador.gen3D()
            console.log(codigo);
            console.log("fin");
            salida = true;
            let arreglo = compilador.debuguear("");
            let consola = compilador.consola()
            client.emit('consolaP', consola);
            client.broadcast.emit('consolaP', consola);

        } catch (error) {
            client.emit('salidaerror', "generando " + error.message);
            client.broadcast.emit('salidaerror', "generando " + error.message);
        }
    });
    client.on('calificar', function (data: any) {
        try {
            compilador = Compilador.init(data, true);
            siguiente = 0;
            compilador.analizar(data);
            let codigo = compilador.analizador.gen3D();
            console.log(codigo);
            console.log("fin");
            salida = true;
            compilador.debuguear("");
            let consola = compilador.consola();
            client.emit('consolaP', consola);
            client.broadcast.emit('consolaP', consola);

        } catch (error) {
            client.emit('salidaerror', "generando " + error.message);
            client.broadcast.emit('salidaerror', "generando " + error.message);
        }
    });
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