"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var operacion_1 = __importDefault(require("./operacion"));
var Interprete = /** @class */ (function () {
    function Interprete(inteprete) {
        this.p = require('./codigoFinal');
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new operacion_1.default(inteprete);
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        this.S = inteprete.start;
        this.end = inteprete.end;
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
                this.p.parser.struct.op.linea = index;
                this.p.parse(this.p.parser.struct.codigo[index].codigo);
                index = this.p.parser.indice.valor;
                if (index < 0) {
                    break;
                }
            }
            console.log("felicidades a termindo la lectura de cuadruplo");
        }
    };
    return Interprete;
}());
exports.default = Interprete;
//# sourceMappingURL=interprete.js.map