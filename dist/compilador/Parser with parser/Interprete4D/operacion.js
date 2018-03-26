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
        this.es = lTeporales;
    }
    Operacion.prototype.sumar = function (arg0, arg1, temp) {
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
    return Operacion;
}());
exports.default = Operacion;
//# sourceMappingURL=operacion.js.map