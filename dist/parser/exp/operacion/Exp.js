"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var operacion_1 = __importDefault(require("./operacion"));
var nodoOperacion_1 = __importDefault(require("./nodoOperacion"));
var suma_1 = __importDefault(require("./suma"));
var Exp = /** @class */ (function (_super) {
    __extends(Exp, _super);
    function Exp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Exp.prototype.evaluarTipo = function (valorTipo, simboloTipo) {
        if (simboloTipo == this.analizador.DOUBLE) {
            return this.evaluarDouble(valorTipo);
        }
        else if (simboloTipo == this.analizador.INT) {
            return this.evaluarnumber(valorTipo);
        }
        else if (simboloTipo == this.analizador.CARACTER) {
            return this.evaluarCaracter(valorTipo);
        }
        else {
            return simboloTipo == valorTipo;
        }
    };
    Exp.prototype.evaluarDouble = function (valorTipo) {
        if (valorTipo == this.analizador.DOUBLE) {
            return true;
        }
        else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        }
        else if (valorTipo == this.analizador.INT) {
            return true;
        }
        else if (valorTipo == this.analizador.CARACTER) {
            return true;
        }
        else {
            return false;
        }
    };
    Exp.prototype.evaluarnumber = function (valorTipo) {
        if (valorTipo == this.analizador.DOUBLE) {
            return false;
        }
        else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        }
        else if (valorTipo == this.analizador.INT) {
            return true;
        }
        else if (valorTipo == this.analizador.CARACTER) {
            return true;
        }
        else {
            return false;
        }
    };
    Exp.prototype.evaluarCaracter = function (valorTipo) {
        if (valorTipo == this.analizador.DOUBLE) {
            return false;
        }
        else if (valorTipo == this.analizador.BOOLEANO) {
            return true;
        }
        else if (valorTipo == this.analizador.INT) {
            return true;
        }
        else if (valorTipo == this.analizador.CARACTER) {
            return true;
        }
        else {
            return false;
        }
    };
    Exp.prototype.evaluarPP = function (variable, signo) {
        var arg1 = new nodoOperacion_1.default(1 + "", this.analizador.INT, variable.location.last_column, variable.location.first_line);
        var arg0 = this.analizador.variable.gerVal(variable);
        var op = new suma_1.default(this.analizador, signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    };
    Exp.prototype.masIgual = function (nodo, variable, signo) {
        var arg1 = this.analizar(nodo);
        var arg0 = this.analizador.variable.gerVal(variable);
        var op = new suma_1.default(this.analizador, signo);
        op.setArg0(arg0);
        op.setArg1(arg1);
        return op.evaluar();
    };
    return Exp;
}(operacion_1.default));
exports.default = Exp;
//# sourceMappingURL=Exp.js.map