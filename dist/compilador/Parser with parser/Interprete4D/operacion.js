"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operacion = /** @class */ (function () {
    function Operacion(lTeporales) {
        this.es = {
            'C4D': [{ 'poss': -1, 'codigo': "", 'columna': -1, 'linea': -1, }],
            'state': true,
            'etiqueta': [{ 'etiqueta': "", 'poss': -1 }],
            'metodo': [{ 'metodo': "", 'poss': -1 }],
            'temporal': [{ "tempora": "retorno", "valor": 4 }]
        };
        this.ptr = 0;
        this.pth = 0;
        this.linea = 0;
        this.lineaConsola = 0;
        this.op = "";
        this.pedir = false;
        this.message = "";
        this.consola = new Array();
        this.consola.push(" ");
        this.es = lTeporales;
        this.stack = new Array();
        this.heap = new Array();
        this.metodoAnterior = new Array();
        this.metodoAnterior.push(-1);
        this.temporal = [];
        this.pila = new Array();
        this.pila.push(this.temporal);
    }
    Operacion.prototype.igual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 == arg1) {
            this.op = arg0 + " == " + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + " == " + arg1;
            return linea;
        }
    };
    Operacion.prototype.noigual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 != arg1) {
            this.op = arg0 + "!=" + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + "!=" + arg1;
            return linea;
        }
    };
    Operacion.prototype.meterHeap = function (data) {
        var aux = this.stack[this.ptr + 3];
        switch (aux) {
            case 3:
                if (aux == 3) {
                    var index = 0;
                    for (index = 0; index < data.length; index++) {
                        var element = data.charCodeAt(index);
                        this.heap[this.pth] = element;
                        this.pth++;
                    }
                    this.heap[this.pth] = 35174492;
                    this.pth++;
                }
                break;
            case 2:
                this.heap[this.pth] = parseInt(data);
                this.pth++;
            case 1:
                this.heap[this.pth] = parseFloat(data);
                this.pth++;
            case 0:
                this.heap[this.pth] = parseInt(data);
                this.pth++;
            case 5:
                this.heap[this.pth] = parseInt(data);
                this.pth++;
        }
    };
    Operacion.prototype.leer = function (arg1) {
        var valor = this.stack[this.ptr + 2];
        var poss = valor + 2;
        var salida = "";
        for (var index = poss; index < this.heap.length; index++) {
            if (this.heap[index] != 35174492 && this.heap[index] != undefined && this.heap[index] != null) {
                salida = salida + String.fromCharCode(this.heap[index]);
            }
            else {
                break;
            }
        }
        this.pedir = true;
        this.message = salida;
    };
    Operacion.prototype.getSTACK = function (arg0, temp) {
        this.op = temp + " = stack[" + arg0 + "] | ";
        this.op = this.op + temp + " = " + this.stack[arg0];
        this.setValTemp(temp, this.stack[arg0]);
    };
    Operacion.prototype.getHEAP = function (arg0, temp) {
        this.op = temp + " = heap[" + arg0 + "] | ";
        this.op = this.op + temp + " = " + this.heap[arg0];
        this.setValTemp(temp, this.heap[arg0]);
    };
    Operacion.prototype.setHEAP = function (arg0, arg1) {
        this.op = "heap[ " + arg0 + "]" + " = " + arg1;
        this.heap[arg0] = arg1;
    };
    Operacion.prototype.setSTACK = function (arg0, arg1) {
        this.op = "stack[ " + arg0 + "]" + " = " + arg1;
        this.stack[arg0] = arg1;
    };
    Operacion.prototype.aumetarptr = function (arg0, arg1) {
        this.op = "ptr" + " = " + arg0 + " + " + arg1;
        this.ptr = arg0 + arg1;
    };
    Operacion.prototype.disminuirptr = function (arg0, arg1) {
        this.op = "ptr" + " = " + arg0 + " - " + arg1;
        this.ptr = arg0 - arg1;
    };
    Operacion.prototype.aumentarpth = function (arg0, arg1) {
        this.op = "pth" + " = " + arg0 + " + " + arg1;
        this.pth = arg0 + arg1;
    };
    Operacion.prototype.mayorque = function (arg0, etiqueta, arg1, linea) {
        if (arg0 > arg1) {
            this.op = arg0 + " > " + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + " > " + arg1;
            return linea;
        }
    };
    Operacion.prototype.menorque = function (arg0, etiqueta, arg1, linea) {
        if (arg0 < arg1) {
            this.op = arg0 + " < " + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + " < " + arg1;
            return linea;
        }
    };
    Operacion.prototype.mayorIgual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 >= arg1) {
            this.op = arg0 + " >= " + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + " >= " + arg1;
            return linea;
        }
    };
    Operacion.prototype.menorIgual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 <= arg1) {
            this.op = arg0 + " <= " + arg1;
            return this.eitqueta(etiqueta);
        }
        else {
            this.op = arg0 + " <= " + arg1;
            return linea;
        }
    };
    Operacion.prototype.sumar = function (arg0, arg1, temp) {
        this.op = temp + " = " + arg0 + " + " + arg1;
        this.setValTemp(temp, arg0 + arg1);
    };
    Operacion.prototype.sumarV = function (arg0, arg1, temp) {
        this.op = temp + " = " + arg0 + " + " + arg1;
        this.setValTemp(temp, arg0 + arg1);
    };
    Operacion.prototype.restar = function (arg0, arg1, temp) {
        this.op = temp + " = " + arg0 + " - " + arg1;
        this.setValTemp(temp, arg0 - arg1);
    };
    Operacion.prototype.multiplicar = function (arg0, arg1, temp) {
        this.op = temp + " = " + arg0 + " * " + arg1;
        this.setValTemp(temp, arg0 * arg1);
    };
    Operacion.prototype.dividir = function (arg0, arg1, temp) {
        this.op = temp + " = " + arg0 + " / " + arg1;
        this.setValTemp(temp, arg0 / arg1);
    };
    Operacion.prototype.getValtemp = function (temp) {
        var key = this.getPosstemp(temp);
        //return this.es.temporal[key].valor;
        return this.temporal[key];
    };
    Operacion.prototype.getPosstemp = function (temp) {
        var a = temp.replace("T", "");
        return +a;
    };
    Operacion.prototype.setValTemp = function (temp, val) {
        var key = +this.getPosstemp(temp);
        //let temps = this.es.temporal[key].tempora;
        //this.es.temporal[key] = { "tempora": temps, "valor": val };
        this.temporal[key] = val;
    };
    Operacion.prototype.convertiNumero = function (num) {
        return +num;
    };
    Operacion.prototype.eitqueta = function (etiqueta) {
        var a = etiqueta.replace("L", "");
        return this.es.etiqueta[+a].poss - 1;
    };
    Operacion.prototype.printC = function (num) {
        console.log(String.fromCharCode(num));
        if (num == 35174492) {
            this.lineaConsola++;
            this.consola.push(" ");
        }
        else {
            this.consola[this.lineaConsola] = this.consola[this.lineaConsola] + String.fromCharCode(num);
        }
    };
    Operacion.prototype.printD = function (num) {
        console.log(num);
        if (num == 35174492) {
            this.lineaConsola++;
            this.consola.push(" ");
        }
        else {
            this.consola[this.lineaConsola] = this.consola[this.lineaConsola] + num + "";
            this.lineaConsola++;
            this.consola.push(" ");
        }
    };
    Operacion.prototype.callMetodo = function (nombre) {
        var poss = nombre.replace("metodo", "");
        this.metodoAnterior.push(this.linea);
        return this.es.metodo[+poss].poss - 1;
    };
    Operacion.prototype.begin = function (nombre) {
        this.pila.push(this.temporal);
        this.temporal = [];
        //this.es.temporal = [{ "tempora": "retorno", "valor": 4 }]
    };
    Operacion.prototype.endMetodo = function (nombre) {
        var anterior = this.metodoAnterior.pop();
        this.temporal = this.pila.pop();
        return anterior;
    };
    return Operacion;
}());
exports.default = Operacion;
//# sourceMappingURL=operacion.js.map