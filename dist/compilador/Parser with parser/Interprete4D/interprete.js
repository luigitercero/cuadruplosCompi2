"use strict";
var Interprete = /** @class */ (function () {
    function Interprete(inteprete) {
        this.p = require('./codigoFinal');
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new Operacion(inteprete);
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        this.S = inteprete.start;
    }
    Interprete.prototype.start = function () {
        console.log("Iniciando lectura de cuadruplo");
        this.leer4D(this.S);
    };
    Interprete.prototype.leer4D = function (iniciaEn) {
        if (this.p.parser.struct.codigo != null) {
            for (var index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
                console.log(this.p.parser.struct.codigo[index].poss, this.p.parser.struct.codigo[index].codigo, this.p.parser.struct.codigo[index].columna, this.p.parser.struct.codigo[index].linea);
                this.p.parser.indice.valor = index;
                this.p.parse(this.p.parser.struct.codigo[index].codigo);
                index = this.p.parser.indice.valor;
            }
        }
    };
    return Interprete;
}());
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
        this.es = lTeporales;
        this.stack = new Array();
        this.heap = new Array();
    }
    Operacion.prototype.igual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 == arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.noigual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 != arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.getSTACK = function (arg0, temp) {
        this.setValTemp(temp, this.stack[arg0]);
    };
    Operacion.prototype.getHEAP = function (arg0, temp) {
        this.setValTemp(temp, this.heap[arg0]);
    };
    Operacion.prototype.setHEAP = function (arg0, arg1) {
        this.heap[arg0] = arg1;
    };
    Operacion.prototype.setSTACK = function (arg0, arg1) {
        this.stack[arg0] = arg1;
    };
    Operacion.prototype.mayorque = function (arg0, etiqueta, arg1, linea) {
        if (arg0 > arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.menorque = function (arg0, etiqueta, arg1, linea) {
        if (arg0 < arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.mayorIgual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 >= arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.menorIgual = function (arg0, etiqueta, arg1, linea) {
        if (arg0 <= arg1) {
            return this.eitqueta(etiqueta);
        }
        else {
            return linea;
        }
    };
    Operacion.prototype.sumar = function (arg0, arg1, temp) {
        this.setValTemp(temp, arg0 + arg1);
    };
    Operacion.prototype.sumarV = function (arg0, arg1, temp) {
        this.setValTemp(temp, arg0 + arg1);
    };
    Operacion.prototype.restar = function (arg0, arg1, temp) {
        this.setValTemp(temp, arg0 - arg1);
    };
    Operacion.prototype.multiplicar = function (arg0, arg1, temp) {
        this.setValTemp(temp, arg0 * arg1);
    };
    Operacion.prototype.dividir = function (arg0, arg1, temp) {
        this.setValTemp(temp, arg0 / arg1);
    };
    Operacion.prototype.getValtemp = function (temp) {
        var key = this.getPosstemp(temp);
        return this.es.temporal[key].valor;
    };
    Operacion.prototype.getPosstemp = function (temp) {
        var a = temp.replace("T", "");
        return +a;
    };
    Operacion.prototype.setValTemp = function (temp, val) {
        var key = +this.getPosstemp(temp);
        var temps = this.es.temporal[key].tempora;
        this.es.temporal[key] = { "tempora": temps, "valor": val };
    };
    Operacion.prototype.convertiNumero = function (num) {
        return +num;
    };
    Operacion.prototype.eitqueta = function (etiqueta) {
        var a = etiqueta.replace("L", "");
        return this.es.etiqueta[+a].poss;
    };
    Operacion.prototype.printC = function (num) {
        console.log(String.fromCharCode(num));
    };
    Operacion.prototype.printD = function (num) {
        console.log(num);
    };
    return Operacion;
}());
//# sourceMappingURL=interprete.js.map