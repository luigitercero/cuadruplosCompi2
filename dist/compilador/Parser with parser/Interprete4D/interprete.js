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
        this.p.parser.struct.op = new operacion_1.default();
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        /*
    stack:[],
    heap:[],
    codigo:[],
    etiqueta:[],
    metodo:[],
    temporal:[],
    ptr:0,
    pth:0,
    op:null,
    leer:null
}
        let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/test', 'utf-8');
        let hola = p.parse( archivo);
        let nodo = new Nodo (p.parser.treeparser.raiz);
        let analizador = new Analizador();
        analizador.inicio(nodo);
        console.log(
        "esto es 3D");
        let result = analizador.get3D().C4D;
        for(let k in result) {
            console.log(result[k].poss, result[k].codigo);
        }*/
    }
    Interprete.prototype.leer4D = function (iniciaEn) {
        if (this.p.parser.struct.codigo != null) {
            for (var index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
                this.p.parse(this.p.parser.struct.codigo[index].codigo);
            }
        }
    };
    return Interprete;
}());
exports.default = Interprete;
//# sourceMappingURL=interprete.js.map