"use strict";
// app.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __importDefault(require("./init"));
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var router_1 = __importDefault(require("./router/router"));
var path = require("path");
var siguiente = 0;
app.use(router_1.default);
app.use(express.static(path.join('/home/luigitercero/Documentos/Compi2/webpack_tutorial/')));
/*
app.get('/', function(req:any, res:any,next:any) {
    res.sendFile('/home/luigitercero/Documentos/Compi2/webpack_tutorial/index2.htm');
});
*/
io.on('connection', function (client) {
    var salida = true;
    var compilador;
    console.log('Client connected...');
    client.on('join', function (data) {
        console.log(data);
        salida = true;
    });
    client.on('messages', function (data) {
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
        salida = true;
    });
    client.on('archivo', function (data) {
        try {
            compilador = init_1.default.init(data);
            client.emit('archivo', compilador.archivo);
            client.broadcast.emit('archivo', compilador.archivo);
            salida = true;
        }
        catch (error) {
            client.emit('salidaerror', "archivo " + error.message);
            client.broadcast.emit('salidaerror', "archivo" + error.message);
        }
    });
    client.on('generar', function (data) {
        siguiente = 0;
        compilador = init_1.default.init(data, true);
        compilador.analizar(data);
        var codigo = compilador.analizador.gen3D();
        console.log(codigo);
        console.log("fin");
        client.emit('generar', codigo);
        salida = true;
        try {
        }
        catch (error) {
            client.emit('salidaerror', "generando " + error.message);
            client.broadcast.emit('salidaerror', "generando " + error.message);
        }
    });
    function sendPila(client) {
        var pila = compilador.getPila();
        var salida = "";
        if (pila.length >= 35174492) {
            client.emit('salidaerror', "nulo");
            client.broadcast.emit('salidaerror', "nulo");
        }
        else {
            var puntero = compilador.getptr();
            for (var index = 0; index < pila.length; index++) {
                var element = pila[index];
                if (element == undefined) {
                    if (puntero == index) {
                        salida = salida + "<tr class = \"purple lighten-5\">";
                    }
                    else {
                        salida = salida + "<tr>";
                    }
                    salida = salida
                        + "<th>" + index + "</th>"
                        + "<th>" + "null" + "</th>"
                        + "</tr>";
                }
                else {
                    if (puntero == index) {
                        salida = salida + "<tr class = \"purple lighten-5\">";
                    }
                    else {
                        salida = salida + "<tr>";
                    }
                    salida = salida
                        + "<th>" + index + "</th>"
                        + "<th>" + element + "</th>"
                        + "</tr>";
                }
            }
            client.emit('pila', "limpiar");
            client.broadcast.emit('pila', "limpiar");
            client.emit('pila', salida);
            client.broadcast.emit('pila', salida);
        }
    }
    function sendHeap(client) {
        var heap = compilador.getHeap();
        var salida = "";
        for (var index = 0; index < heap.length; index++) {
            if (heap.length >= 35174492) {
                client.emit('salidaerror', "nulo");
                client.broadcast.emit('salidaerror', "nulo");
                break;
            }
            var element = heap[index];
            if (element == undefined) {
                salida = salida + "<tr>"
                    + "<th>" + index + "</th>"
                    + "<th>" + "null" + "</th>"
                    + "</tr>";
            }
            else {
                salida = salida + "<tr>"
                    + "<th>" + index + "</th>"
                    + "<th>" + element + "</th>"
                    + "</tr>";
            }
        }
        client.emit('heap', "limpiar");
        client.broadcast.emit('heap', "limpiar");
        client.emit('heap', salida);
        client.broadcast.emit('heap', salida);
    }
    function sendPtr(client) {
        client.emit('ptr', compilador.getptr());
        client.broadcast.emit('consola', compilador.getptr());
    }
    function sendPth(client) {
        client.emit('pth', compilador.getpth());
        client.broadcast.emit('pth', compilador.getpth());
    }
    function sendConsola(client) {
        var consola = compilador.consola();
        client.emit('consola', consola);
        client.broadcast.emit('consola', consola);
    }
    function operacion(client) {
        var data = compilador.getOperacion();
        client.emit('op', data);
        client.broadcast.emit('op', data);
    }
    function sendAmbito(client) {
        var clase = compilador.getAmbito();
        var salida = "";
        var ptr = compilador.getptr();
        for (var index = 0; index < clase.length; index++) {
            var element = clase[index];
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
    client.on('debuguear', function (data) {
        try {
            var arreglo = compilador.debuguear(data);
            client.emit('nuevaPoss', arreglo);
            client.broadcast.emit('nuevaPoss', arreglo);
            sendPila(client);
            sendHeap(client);
            sendPtr(client);
            sendPth(client);
            sendConsola(client);
            operacion(client);
            sendAmbito(client);
        }
        catch (error) {
            client.emit('salidaerror', "debuguear " + error.message);
            client.broadcast.emit('salidaerror', "debuguear " + error.message);
        }
        salida = true;
    });
    client.on('siguiente', function (data) {
        salida = true;
        sigue(client);
    });
    function sigue(client) {
        try {
            var arreglo = compilador.siguiente();
            client.emit('nuevaPoss', arreglo);
            client.broadcast.emit('nuevaPoss', arreglo);
            sendPila(client);
            sendHeap(client);
            sendPtr(client);
            sendPth(client);
            sendConsola(client);
            operacion(client);
            sendAmbito(client);
        }
        catch (error) {
            client.emit('salidaerror', "sigue " + error.message);
            client.broadcast.emit('salidaerror', "sigue  " + error.message);
        }
    }
    client.on('alto', function (data) {
        salida = true;
    });
    client.on('auto', function (data) {
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
                    }
                    if (!salida) {
                        salida = compilador.getSalida();
                        if (salida) {
                            console.log('exiting');
                            clearInterval(intervalObject);
                        }
                    }
                }, 500);
            }
            catch (error) {
                salida = true;
                client.emit('salidaerror', "automatico " + error.message);
                client.broadcast.emit('salidaerror', "automatico " + error.message);
            }
        }
    });
    client.on('probar', function (data) {
        try {
            compilador = init_1.default.init(data, true);
            siguiente = 0;
            compilador.analizar(data);
            var codigo = compilador.analizador.gen3D();
            console.log(codigo);
            console.log("fin");
            salida = true;
            var arreglo = compilador.debuguear("");
            var consola = compilador.consola();
            client.emit('consolaP', consola);
            client.broadcast.emit('consolaP', consola);
        }
        catch (error) {
            client.emit('salidaerror', "generando " + error.message);
            client.broadcast.emit('salidaerror', "generando " + error.message);
        }
    });
    client.on('calificar', function (data) {
        try {
            compilador = init_1.default.init(data, true);
            siguiente = 0;
            compilador.analizar(data);
            var codigo = compilador.analizador.gen3D();
            console.log(codigo);
            console.log("fin");
            salida = true;
            compilador.debuguear("");
            var consola = compilador.consola();
            client.emit('consolaP', consola);
            client.broadcast.emit('consolaP', consola);
        }
        catch (error) {
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
//# sourceMappingURL=index.js.map