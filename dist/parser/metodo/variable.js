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
    Variable.prototype.filtrarVariable = function (variable) {
        if (variable.simbolo.tam > 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario("desplazamiento de variable a psoicion de valores"), variable.column, variable.fila);
            var temp = this.analizador.variable.obtenerDirVariable(variable.simbolo.getNombre(), variable.column, variable.fila);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.temporal, variable.temp), variable.column, variable.fila);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", variable.temp, "heap"), variable.column, variable.fila);
        }
    };
    /**
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
                this.agregarDimAHeap(variable, val, nodo.childNode[1].location);
                return variable;
            default:
                throw this.analizador.newError("esto no puede declararse ", nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        }
    };
    Variable.prototype.agregarDimAHeap = function (variable, val, location) {
        if (variable.simbolo.tam == 0) {
            this.analizador.salidaConsola("iniciado variable con tama;o 0");
            this.analizador.agregarCodigo(this.analizador.saveEnPila(variable.simbolo.possAmbito + "", "heap"), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genComentario("saltando la primera poscion"), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
            //escribe el valor en el heap del primer tama;o
            this.analizador.salidaConsola("escribe una dimension");
            this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", val.valor), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
            variable.temp = val.valor;
            variable.simbolo.addTam(1);
            return variable;
        }
        else {
            if (val.tipo == this.analizador.INT) {
                this.analizador.salidaConsola("agregando otro tama;");
                this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", val.valor), location.last_column, location.first_line);
                this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
                var CrearTam = this.analizador.newTemporal();
                //en esta etapa estoy reservando el tama;o real que estara tomando el arreglo en el futrua
                this.analizador.agregarCodigo(this.analizador.genOperacion("*", variable.temp, val.valor, CrearTam), location.last_column, location.first_line);
                variable.temp = CrearTam;
                variable.simbolo.addTam(1);
                return variable;
            }
            else {
                this.analizador.newError("no se pudo evaluar el tipo", location.first_line, location.last_column);
            }
        }
    };
    return Variable;
}());
exports.default = Variable;
//# sourceMappingURL=variable.js.map