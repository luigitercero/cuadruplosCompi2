"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion_1 = __importDefault(require("../exp/operacion/nodoOperacion"));
var simbolo_1 = __importDefault(require("../tablaSimbolos/simbolo"));
var Variable = /** @class */ (function () {
    function Variable(analizador) {
        this.analizador = analizador;
    }
    /**
     * retorna un nodo Operacion
     * var
     *: ID
     *| var '[' e ']'
     * ;
     * @param nodo
     * @param tipo
     * @param visibilidad
     */
    Variable.prototype.var = function (nodo, tipo, visibilidad) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                if (this.analizador.claseA.tabla.buscarEnPila(nombre))
                    this.analizador.newError("la variable existe", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                else {
                    var s = new simbolo_1.default(nombre, visibilidad, tipo);
                    this.analizador.claseA.tabla.agregarSimboloApila(s);
                    var op = new nodoOperacion_1.default("", "", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
                    op.simbolo = s;
                    return op;
                }
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
            case "var":
                var variable = this.var(nodo.childNode[0], tipo, visibilidad);
                var val = this.analizador.exp.analizar(nodo.childNode[2]);
                this.analizador.variable.agregarDimAHeap(variable, val, nodo.childNode[1].location);
                return variable;
            default:
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        }
    };
    return Variable;
}());
exports.default = Variable;
//# sourceMappingURL=variable.js.map