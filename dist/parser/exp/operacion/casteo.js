"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casteo = /** @class */ (function () {
    function Casteo(arg0, arg1, analizador) {
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.analizador = analizador;
    }
    Casteo.prototype.setArg0 = function (nodoOperacion) {
        throw this.analizador.newError("no se ha implementado el metodo set arg0", this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.setArg1 = function (nodoOperacion) {
        throw this.analizador.newError("no se ha implementado el metodo set arg1", this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.evaluar = function () {
        if (this.arg0.tipo == 35174492 + "" || this.arg1.tipo == 35174492 + "") {
            return this.evaluarObjeto();
        }
        else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.INT) {
            return this.boleanNumber();
        }
        else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.DOUBLE) {
            return this.booleanDouble();
        }
        else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.CARACTER) {
            return this.boleanCaracter();
        }
        else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo == this.analizador.INT) {
            return this.numberBolean();
        }
        else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo == this.analizador.DOUBLE) {
            return this.doubleBoolean();
        }
        else if (this.arg1.tipo == this.analizador.BOOLEANO && this.arg0.tipo == this.analizador.CARACTER) {
            return this.caracterBolean();
        }
        else if (this.arg0.tipo == "string" || this.arg1.tipo == "string") {
            return this.stringString();
        }
        else if (this.arg0.tipo == this.analizador.BOOLEANO && this.arg1.tipo == this.analizador.BOOLEANO) {
            return this.booleaBolean();
        }
        else if (this.arg0.tipo == this.analizador.INT && this.arg1.tipo == this.analizador.INT) {
            return this.numberNumber();
        }
        else if (this.arg0.tipo == this.analizador.DOUBLE && this.arg1.tipo == this.analizador.DOUBLE) {
            return this.doubleDouble();
        }
        else if (this.arg0.tipo == this.analizador.CARACTER && this.arg1.tipo == this.analizador.CARACTER) {
            return this.caracterCaracter();
        }
        else if (this.arg0.tipo == this.analizador.DOUBLE || this.arg1.tipo == this.analizador.DOUBLE) {
            return this.doubleDouble();
        }
        else if (this.arg0.tipo == this.analizador.CARACTER || this.arg1.tipo == this.analizador.CARACTER) {
            return this.caracterCaracter();
        }
        else {
            return this.numberNumber();
        }
    };
    Casteo.prototype.evaluarObjeto = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.stringString = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.caracterCaracter = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.numberNumber = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.booleaBolean = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.numberBolean = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.boleanNumber = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.boleanCaracter = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.caracterBolean = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.doubleDouble = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
        ;
    };
    Casteo.prototype.booleanDouble = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    Casteo.prototype.doubleBoolean = function () {
        throw this.analizador.newError("erro de casteo " + this.arg0.tipo + " no compatible con " + this.arg1.tipo, this.arg0.column, this.arg0.fila);
    };
    return Casteo;
}());
exports.default = Casteo;
//# sourceMappingURL=casteo.js.map