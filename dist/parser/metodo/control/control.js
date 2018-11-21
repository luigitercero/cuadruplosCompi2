"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoSalida_1 = __importDefault(require("./nodoSalida"));
var if1_1 = __importDefault(require("./if1"));
var if2_1 = __importDefault(require("./if2"));
var if3_1 = __importDefault(require("./if3"));
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
        this.if3 = new if3_1.default(this);
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
        var nuevoCiclo;
        switch (term) {
            case "If1":
                this.if1.if1(nodo.childNode[0], ciclo);
                return ciclo;
            case "If2":
                this.if2.if2(nodo.childNode[0], ciclo);
                return ciclo;
            case "If3":
                this.if3.if3(nodo.childNode[0], ciclo);
                return ciclo;
            case "Switch":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.suitch.swich(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "While":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.rm.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Do_While":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.hacer.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Repeat_Until":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.repetir.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "For":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.For.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Loop":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.loop.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Count":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.contador.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Doble_Condicion":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.doble.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
            case "Repetir":
                nuevoCiclo = new nodoSalida_1.default(true);
                this.rm.ejecutar(nodo.childNode[0], nuevoCiclo);
                this.concatenarEtiqueta(nuevoCiclo, ciclo);
                return ciclo;
        }
        throw this.analizador.newError("hay que agregar algo:", 0, 0);
    };
    control.prototype.concatenarEtiqueta = function (et, ciclo) {
        ciclo.addEtiquetaRR(et.etiquetaR);
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
        return ciclo;
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