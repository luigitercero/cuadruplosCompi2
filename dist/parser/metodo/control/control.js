"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoSalida_1 = __importDefault(require("./nodoSalida"));
var if1_1 = __importDefault(require("./if1"));
var if2_1 = __importDefault(require("./if2"));
var swich_1 = __importDefault(require("./swich"));
var repetirMientras_1 = __importDefault(require("./repetirMientras"));
var hacer_1 = __importDefault(require("./hacer"));
var hacer_2 = __importDefault(require("./hacer"));
var loop_1 = __importDefault(require("./loop"));
var contador_1 = __importDefault(require("./contador"));
var doble_1 = __importDefault(require("./doble"));
var for_1 = __importDefault(require("./for"));
var control = /** @class */ (function () {
    function control(analizador) {
        this.analizador = analizador;
        this.if1 = new if1_1.default(this);
        this.if2 = new if2_1.default(this);
        this.if2 = new if2_1.default(this);
        this.rm = new repetirMientras_1.default(this);
        this.suitch = new swich_1.default(this);
        this.hacer = new hacer_1.default(this);
        this.repetir = new hacer_2.default(this);
        this.loop = new loop_1.default(this);
        this.contador = new contador_1.default(this);
        this.For = new for_1.default(this);
        this.doble = new doble_1.default(this);
    }
    control.prototype.control = function (nodo, ciclo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "If1":
                this.if1.if1(nodo.childNode[0], ciclo);
                return ciclo;
            case "If2":
                this.if2.if2(nodo.childNode[0], ciclo);
                return ciclo;
            case "Switch":
                this.suitch.swich(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "While":
                this.rm.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Do_While":
                this.hacer.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Repeat_Until":
                this.repetir.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "For":
                this.For.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Loop":
                this.loop.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Count":
                this.contador.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Doble_Condicion":
                this.doble.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
            case "Repetir":
                this.rm.ejecutar(nodo.childNode[0], new nodoSalida_1.default(true));
                return ciclo;
        }
    };
    /**
     *  If1
     *:IF Expresion ESVERDADERO  Cuerpo  ESFALSO Cuerpo FINSI
     *;
     * @param nodo
     */
    /**
     *  Cuerpo: '{'Cuerpo1 '}'
     *  | '{' '}'
     *  ;
     */
    control.prototype.cuerpo = function (nodo, ciclo) {
        var term = nodo.childNode[1].term;
        switch (term) {
            case "Cuerpo1":
                this.cuerpo1(nodo.childNode[1], ciclo);
                break;
            default:
                return ciclo;
        }
    };
    /**  Cuerpo1
    *  :Cuerpo1 CuerpoMetodo
    *  |CuerpoMetodo
    *
    */
    control.prototype.cuerpo1 = function (nodo, ciclo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "cuerpo1":
                this.cuerpo1(nodo.childNode[0], ciclo);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], ciclo);
                return false;
            case "Cuerpo1":
                this.cuerpo1(nodo.childNode[0], ciclo);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], ciclo);
                return false;
            case "CuerpoMetodo":
                return this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[0], ciclo);
        }
        throw this.analizador.newError("error en el cuerpo", 0, 0);
    };
    return control;
}());
exports.default = control;
//# sourceMappingURL=control.js.map