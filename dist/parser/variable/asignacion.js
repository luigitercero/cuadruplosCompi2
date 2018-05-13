"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Asignacion = /** @class */ (function () {
    function Asignacion(analizador) {
        this.analizador = analizador;
    }
    /**
    * * AsignarValor al declararse
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
            this.analizador.variable.incializar(simbolo, simbolo.getLocacion_de_declaracion());
        }
        else {
            if (simbolo.getPunter()) {
                this.analizador.variable.incializar(simbolo, simbolo.getLocacion_de_declaracion());
            }
            this.analizador.agregarCodigo(this.analizador.genComentario("agregando valor a " + simbolo.getNombre()), location.last_column, location.first_line); // es un comentario
            this.evaluarAsignacionasignarValor(nodo.childNode[1], simbolo, location);
        }
        this.analizador.agregarCodigo(this.analizador.genComentario("fin de incializacion de variable " + simbolo.getNombre()), location.last_column, location.first_line); // es un comentario
    };
    Asignacion.prototype.evaluarAsignacionasignarValor = function (nodo, simbolo, location) {
        var nombre = nodo.term;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        var temp;
        var pos;
        switch (nombre) {
            case "e":
                var resultado = this.analizador.exp.analizar(nodo);
                return this.asignarValoresAvariables(resultado, simbolo, location);
            case "Nuevo":
                resultado = this.analizador.variable.getNuevo(nodo);
                return this.asignarValoresAvariables(resultado, simbolo, location);
            //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column)
            case "Lista":
                var temp_1 = this.analizador.variable.obtenerValorVariable(simbolo.getNombre(), location.first_line, location.last_column);
                if (simbolo.tam > 0) {
                    this.analizador.variable.moverseApossDeArregloInicial(simbolo, temp_1, location);
                    this.analizador.recorrer(nodo, "");
                    this.analizador.variable.inicializandoLista(nodo.childNode[0], simbolo, location, temp_1);
                }
                else {
                    throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column);
                }
                return true;
        }
        this.analizador.newError("asinganr valor", location.first_line, location.last_column);
        return false;
    };
    Asignacion.prototype.asignarValoresAvariables = function (resultado, simbolo, location) {
        if (!simbolo.getPunter()) {
            if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                var val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                this.asignarValoresAvariables2(simbolo, location, val);
                return true;
            }
            else if (resultado.tipo == this.analizador.NULL) {
                var val = this.analizador.NULL; //el temporal del resulttod
                this.asignarValoresAvariables2(simbolo, location, val);
                return true;
            }
            else {
                throw this.analizador.newError("error por compatibilidad de tipos ", location.first_line, location.last_column);
            }
        }
        else {
            if (this.analizador.exp.evaluarTipo(resultado.tipo, this.analizador.INT)) {
                var a = resultado.getReff();
                var temp = this.analizador.variable.obtenerValorVariable(simbolo.getNombre(), location.first_line, location.last_column);
                if (a == undefined) {
                    var val = this.analizador.exp.getValor(resultado);
                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.val, val), location.last_column, location.first_line);
                }
                else {
                    this.AsignacionPunteros(resultado, location, temp);
                }
            }
            else {
                throw this.analizador.newError("error por compatibilidad de tipos ", location.first_line, location.last_column);
            }
        }
    };
    Asignacion.prototype.AsignacionPunteros = function (resultado, location, varible) {
        var a = resultado.getReff();
        var val = this.analizador.exp.getValor(resultado);
        if (resultado.getenDireccion()) {
            var t0 = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", varible.val, "1", t0), location.last_column, location.first_line);
            var lugar = 0;
            if (a.done == "pila") {
                lugar = 0;
            }
            else {
                lugar = 1;
            }
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, lugar + ""), location.last_column, location.first_line);
        }
        else {
            if (!a.simbolo.getPunter()) {
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val), location.last_column, location.first_line);
            }
            else {
                var val_1 = a.dir;
                var t0 = this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(varible.val, val_1), location.last_column, location.first_line);
                this.analizador.agregarCodigo(this.analizador.genOperacion("+", varible.val, "1", t0), location.last_column, location.first_line);
                var lugar = a.gettemporalDeGuardado();
                this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, lugar + ""), location.last_column, location.first_line);
            }
        }
    };
    Asignacion.prototype.asignarValoresAvariables2 = function (simbolo, location, val) {
        var temp = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(temp.temporal, val), location.last_column, location.first_line);
    };
    /**
       Asignar
        :'+=' e
        |'*=' e
        |'/=' e
        | '++'
        | '--'
        | '=' Nuevo
        | '=' e     | '=' e
        ;
         */
    Asignacion.prototype.asignar = function (nodo, variable) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "'++'":
                return this.analizador.exp.evaluarPP(variable, "+");
            case "'--'":
                return this.analizador.exp.evaluarPP(variable, "-");
            case "'='":
                return this.getAdd(nodo.childNode[1]);
            case "'+='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "+");
            case "'*='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "*");
            case "'/='":
                return this.analizador.exp.masIgual(nodo.childNode[1], variable, "/");
        }
        throw this.analizador.newError("error al asignar", 0, 0);
    };
    Asignacion.prototype.getAdd = function (nodo) {
        var term = nodo.term;
        switch (term) {
            case "Nuevo":
                return this.analizador.variable.getNuevo(nodo);
            case "e":
                return this.analizador.exp.analizar(nodo);
        }
        throw this.analizador.newError("error al asignar", 0, 0);
    };
    /**
     * Asignacion
     * Asignacion
     * : var Asignar ';'
     * | Navegar var Asignar ';'
     * ;
     * @param nodo
     */
    Asignacion.prototype.asignacion = function (nodo) {
        var term = nodo.childNode[0].term;
        var variable;
        var resultado;
        var location;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                resultado = this.asignar(nodo.childNode[1], variable);
                location = variable.location;
                if (!variable.simbolo.getPunter()) {
                    this.analizador.variable.setValVariable(variable, resultado, location);
                }
                else {
                    this.asignarApuntadores(variable, resultado, location);
                }
                return true;
            case "Navegar":
                var temp = this.analizador.claseA;
                var navegar = this.analizador.variable.navegar(nodo.childNode[0]);
                this.analizador.claseA = this.analizador.buscarClase(navegar.tipo, navegar);
                variable = this.analizador.variable.var(nodo.childNode[1], navegar.valor);
                this.analizador.claseA = temp;
                resultado = this.asignar(nodo.childNode[2], variable);
                location = variable.location;
                this.analizador.variable.setValVariable(variable, resultado, location, navegar.valor);
                this.analizador.claseA = temp;
                return true;
        }
        throw this.analizador.newError("error algo esta mal", nodo.childNode[2].location.first_line, nodo.childNode[2].location.last_column);
    };
    Asignacion.prototype.asignarApuntadores = function (simbolo, resultado, location) {
        this.asignarPunteroAPuntero(simbolo, resultado, location);
    };
    Asignacion.prototype.asignarPunteroAPuntero = function (simbolo, resultado, location, inicio) {
        simbolo.addLocation(location);
        var uff = this.analizador.variable.getVAlorD(simbolo);
        var t0 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", uff, "1", t0), location.first_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnHeap(uff, resultado.getReff().dir), location.first_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, resultado.getReff().gettemporalDeGuardado()), location.first_column, location.first_line);
    };
    return Asignacion;
}());
exports.default = Asignacion;
//# sourceMappingURL=asignacion.js.map