"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = __importDefault(require("./init"));
var Comunicacion = /** @class */ (function () {
    function Comunicacion(archivo) {
        this.compilador = new init_1.default(archivo);
    }
    Comunicacion.init = function (archivo) {
        return new Comunicacion(archivo);
    };
    Comunicacion.prototype.sendPila = function (client) {
        var pila = this.compilador.getPila();
        client.emit('pila', "limpiar");
        client.broadcast.emit('pila', "limpiar");
        for (var index = 0; index < pila.length; index++) {
            var element = pila[index];
            client.emit('pila', element);
            client.broadcast.emit('pila', element);
        }
    };
    Comunicacion.prototype.sendHeap = function (client) {
        var heap = this.compilador.getHeap();
        client.emit('heap', "limpiar");
        client.broadcast.emit('heap', "limpiar");
        for (var index = 0; index < heap.length; index++) {
            var element = heap[index];
            client.emit('heap', element);
            client.broadcast.emit('heap', element);
        }
    };
    Comunicacion.prototype.sendPtr = function (client) {
        client.emit('ptr', this.compilador.getptr());
        client.broadcast.emit('consola', this.compilador.getptr());
    };
    Comunicacion.prototype.sendPth = function (client) {
        client.emit('pth', this.compilador.getpth());
        client.broadcast.emit('pth', this.compilador.getpth());
    };
    Comunicacion.prototype.sendConsola = function (client) {
        var consola = this.compilador.consola();
        client.emit('consola', consola);
        client.broadcast.emit('consola', consola);
    };
    Comunicacion.prototype.operacion = function (client) {
        var data = this.compilador.getOperacion();
        client.emit('op', data);
        client.broadcast.emit('op', data);
    };
    Comunicacion.prototype.sendAmbito = function (client) {
        var clase = this.compilador.getAmbito();
        client.emit('ambito', "limpiar");
        client.broadcast.emit('ambito', "limpiar");
        for (var index = 0; index < clase.length; index++) {
            var element = clase[index];
            client.emit('ambito', element);
            client.broadcast.emit('ambito', element);
        }
    };
    return Comunicacion;
}());
exports.default = Comunicacion;
//# sourceMappingURL=comunicacion.js.map