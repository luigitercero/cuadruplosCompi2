"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casteo = /** @class */ (function () {
    function Casteo(arg0, arg1, analizador) {
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.analizador = analizador;
    }
    Casteo.prototype.evaluar = function () {
        if (this.arg0.tipo == 35174492 || this.arg1.tipo == 35174492) {
            throw new Error("errro de nulo no es posible operar");
        }
        else if (this.arg0.tipo == 0 && this.arg1.tipo == 1) {
            return this.boleanNumber();
        }
        else if (this.arg0.tipo == 0 && this.arg1.tipo == 2) {
            return this.boleanNumber();
        }
        else if (this.arg0.tipo == 0 && this.arg1.tipo == 3) {
            return this.boleanCaracter();
        }
        else if (this.arg1.tipo == 0 && this.arg0.tipo == 1) {
            return this.numberBolean();
        }
        else if (this.arg1.tipo == 0 && this.arg0.tipo == 2) {
            return this.numberBolean();
        }
        else if (this.arg1.tipo == 0 && this.arg0.tipo == 3) {
            return this.caracterBolean();
        }
        else if (this.arg0.tipo == 4 || this.arg1.tipo == 4) {
            return this.stringString();
        }
        else if (this.arg0.tipo == 0 && this.arg1.tipo == 0) {
            return this.booleaBolean();
        }
        else if (this.arg0.tipo == 1 && this.arg1.tipo == 1) {
            return this.numberNumber();
        }
        else if (this.arg0.tipo == 2 && this.arg1.tipo == 2) {
            return this.numberNumber();
        }
        else if (this.arg0.tipo == 3 && this.arg1.tipo == 3) {
            return this.caracterCaracter();
        }
        else if (this.arg0.tipo == 2 || this.arg1.tipo == 2) {
            return this.numberNumber();
        }
        else if (this.arg0.tipo == 3 || this.arg1.tipo == 3) {
            return this.caracterCaracter();
        }
        else {
            return this.numberNumber();
        }
    };
    Casteo.prototype.stringString = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.caracterCaracter = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.numberNumber = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.booleaBolean = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.numberBolean = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.boleanNumber = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.boleanCaracter = function () {
        throw new Error("errro de caseteo");
    };
    Casteo.prototype.caracterBolean = function () {
        throw new Error("errro de caseteo");
    };
    return Casteo;
}());
exports.default = Casteo;
//# sourceMappingURL=casteo.js.map