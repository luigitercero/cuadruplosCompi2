"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var operacion_1 = __importDefault(require("./operacion"));
var Interprete = /** @class */ (function () {
    function Interprete(inteprete) {
        this.salida = false;
        this.p = require('./codigoFinal');
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.Op = new operacion_1.default(inteprete);
        this.p.parser.struct.op = this.Op;
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        this.S = inteprete.start;
        this.end = inteprete.end;
        this.index = this.S;
        this.ambito = [];
    }
    Interprete.prototype.getIndex = function () {
        return this.index;
    };
    Interprete.prototype.start = function () {
        console.log("Iniciando lectura de cuadruplo");
        this.leer4D(this.S);
    };
    Interprete.prototype.leer4D = function (iniciaEn) {
        if (this.p.parser.struct.codigo != null) {
            for (var index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
                console.log(this.p.parser.struct.codigo[index].poss, this.p.parser.struct.codigo[index].codigo, this.p.parser.struct.codigo[index].columna, this.p.parser.struct.codigo[index].linea);
                this.p.parser.indice.valor = index;
                this.p.parser.struct.op.linea = index;
                this.p.parse(this.p.parser.struct.codigo[index].codigo);
                this.index = this.p.parser.indice.valor;
                this.ambito = this.p.parser.struct.codigo[index].ambito;
                if (this.index == -1 || this.salida || this.Op.pedir) {
                    break;
                }
                console.log("#" + this.p.parser.struct.codigo[this.index].codigo, this.p.parser.struct.codigo[this.index].linea, this.p.parser.struct.codigo[this.index].columna);
            }
            console.log("felicidades a termindo la lectura de cuadruplo");
        }
    };
    Interprete.prototype.seguir = function (data) {
        var tam = this.p.parser.struct.codigo.length;
        var val = 0;
        while (this.index != -1) {
            val++;
            this.p.parser.indice.valor = this.index;
            this.p.parser.struct.op.linea = this.index;
            this.p.parse(this.p.parser.struct.codigo[this.index].codigo);
            this.ambito = this.p.parser.struct.codigo[this.index].ambito;
            this.index = this.p.parser.indice.valor;
            if (this.index == -1) {
                this.salida = true;
                val = 0;
                break;
            }
            if (val > 18120) {
                val = 0;
                break;
            }
            if (this.Op.pedir) {
                val = 0;
                break;
            }
            console.log("#" + this.p.parser.struct.codigo[this.index].codigo, this.p.parser.struct.codigo[this.index].linea, this.p.parser.struct.codigo[this.index].columna);
            var codigo = this.p.parser.struct.codigo[this.index];
            for (var index2 = 0; index2 < data.length; index2++) {
                var element = data[index2];
                if (codigo.linea == element) {
                    var arreglo_1 = [];
                    arreglo_1.push(codigo.poss);
                    arreglo_1.push(codigo.codigo);
                    arreglo_1.push(codigo.columna);
                    arreglo_1.push(codigo.linea);
                    arreglo_1.push(this.index);
                    this.index++;
                    this.salida = true;
                    return arreglo_1;
                }
            }
            this.ambito = this.p.parser.struct.codigo[this.index].ambito;
            this.index = this.p.parser.indice.valor;
            this.index++;
        }
        var linea = this.p.parser.struct.codigo[this.end];
        var arreglo = [];
        arreglo.push(linea.poss);
        arreglo.push(linea.codigo);
        arreglo.push(linea.columna);
        arreglo.push(linea.linea);
        arreglo.push(this.index);
        this.index++;
        console.log("felicidades a termindo la lectura de cuadruplo");
        return arreglo;
    };
    Interprete.prototype.siguiente = function () {
        if (this.index > 0) {
            this.p.parser.indice.valor = this.index;
            this.p.parser.struct.op.linea = this.index;
            this.p.parse(this.p.parser.struct.codigo[this.index].codigo);
            /*
                        console.log(this.p.parser.struct.codigo[this.index].codigo,
                            this.p.parser.struct.codigo[this.index].linea,
                            this.p.parser.struct.codigo[this.index].columna
                        )*/
            this.ambito = this.p.parser.struct.codigo[this.index].ambito;
        }
        else {
        }
        var linea = this.p.parser.struct.codigo[this.index];
        this.index = this.p.parser.indice.valor;
        this.index++;
        var arreglo = [];
        arreglo.push(linea.poss);
        arreglo.push(linea.codigo);
        arreglo.push(linea.columna);
        arreglo.push(linea.linea);
        arreglo.push(this.index);
        return arreglo;
    };
    return Interprete;
}());
exports.default = Interprete;
//# sourceMappingURL=interprete.js.map