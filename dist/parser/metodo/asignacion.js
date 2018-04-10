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
var variable_1 = __importDefault(require("./variable"));
var Asignacion = /** @class */ (function (_super) {
    __extends(Asignacion, _super);
    function Asignacion(analizador) {
        return _super.call(this, analizador) || this;
    }
    /**
    * * AsignarValor
    *:';'
    *|'=' e ';'
    *|'=' Nuevo ';'
    *|'=' Lista ';' esta lista quiere decir los arreglos 0
    *;
    *
    */
    Asignacion.prototype.asignarValor = function (nodo, simbolo) {
        var nombre = nodo.childNode[0].term;
        this.analizador.log("agregando valor");
        var location = nodo.childNode[0].location;
        if (nombre == "';'") {
        }
        else {
            this.analizador.agregarCodigo(this.analizador.genComentario("agregando valor a " + simbolo.getNombre()), location.first_line, location.last_column); // es un comentario
            this.evaluarAsignacionasignarValor(nodo.childNode[1], simbolo, location);
        }
        this.analizador.agregarCodigo(this.analizador.genComentario("fin de incializacion de variable " + simbolo.getNombre()), location.first_line, location.last_column); // es un comentario
    };
    Asignacion.prototype.evaluarAsignacionasignarValor = function (nodo, simbolo, location) {
        var nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        var temp;
        var pos;
        switch (nombre) {
            case "e":
                var resultado = this.analizador.exp.analizar(nodo);
                if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                    var val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                    var temp_1 = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column);
                    this.analizador.agregarCodigo(this.analizador.saveEnPila(temp_1.temporal, val), location.first_line, location.last_column);
                    return true;
                }
                else if (resultado.tipo == this.analizador.NULL) {
                    var val = this.analizador.NULL; //el temporal del resulttod
                    var temp_2 = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column);
                    this.analizador.agregarCodigo(this.analizador.saveEnPila(temp_2.temporal, val), location.first_line, location.last_column);
                    return true;
                }
                else {
                    throw this.analizador.newError("error por compatibilidad de tipos ", location.first_line, location.last_column);
                }
            case "Nuevo":
                //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)
                return true;
            case "Lista":
                //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)
                return true;
        }
        this.analizador.newError("asinganr valor", location.first_line, location.last_column);
        return false;
    };
    /**
     * Asignacion
     * Asignacion
     * : var Asignar ';'
     * | Navegar var Asignar ';'
     * ;
     *
     *
     * @param nodo
     */
    Asignacion.prototype.asignacion = function (nodo) {
        var term = nodo.childNode[0].term;
        var variable;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                this.asignar(nodo.childNode[1], variable);
                return true;
            case "Navegar":
                this.navegar(nodo.childNode[0]);
        }
        this.analizador.newError("error algo esta mal", nodo.childNode[2].location.first_line, nodo.childNode[2].location.last_column);
        return false;
    };
    Asignacion.prototype.navegar = function (nodo) {
    };
    /**
       Asignar
        :'+=' e
        |'*=' e
        |'/=' e
        | '++'
        | '--'
        | '=' Nuevo
        | '=' e
        ;
         */
    Asignacion.prototype.asignar = function (nodo, variable) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "'++'":
                this.analizador.exp.evaluarPP(variable);
            case "'--'":
                this.analizador.exp.evaluarMM(variable);
            case "'='":
                this.getAdd(nodo.childNode[1]);
        }
    };
    Asignacion.prototype.getAdd = function (nodo) {
        var term = nodo.term;
        switch (term) {
            case "Nuevo":
            case "e":
        }
    };
    return Asignacion;
}(variable_1.default));
exports.default = Asignacion;
//# sourceMappingURL=asignacion.js.map