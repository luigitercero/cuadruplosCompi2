"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var variable_1 = __importDefault(require("./variable"));
var asignacion_1 = __importDefault(require("./asignacion"));
var declaracion_1 = __importDefault(require("./declaracion"));
var control_1 = __importDefault(require("./control/control"));
var nodoSalida_1 = __importDefault(require("./control/nodoSalida"));
var primitivas_1 = __importDefault(require("./primitivas/primitivas"));
var cuerpo = /** @class */ (function () {
    function cuerpo(analizador) {
        this.analizador = analizador;
        this.asignar = new asignacion_1.default(analizador);
        this.variable = new variable_1.default(analizador);
        this.declarar = new declaracion_1.default(analizador);
        this.control = new control_1.default(analizador);
        this.primitivas = new primitivas_1.default(analizador);
    }
    /**
         * CuerpoMetodo
         *   : Declaracion
         *   | Asignacion
         *   | getMetodoZ ';'
         *   | Control
         *   | Branching ';'
         *   ;
         * @param nodo
         */
    cuerpo.prototype.cuerpoMetodo = function (nodo, ciclo) {
        var term = nodo.childNode[0].term;
        if (ciclo == null) {
            ciclo = new nodoSalida_1.default();
        }
        switch (term) {
            case "Declaracion":
                this.declarar.declaracion(nodo.childNode[0], "");
                return ciclo;
            case "Asignacion":
                this.asignar.asignacion(nodo.childNode[0]);
                return ciclo;
            case "getMetodoZ":
                this.getMetodoZ(nodo.childNode[0]);
                return ciclo;
            case "Control":
                this.control.control(nodo.childNode[0], ciclo);
                return ciclo;
            case "Branching":
                this.branching(nodo.childNode[0], ciclo);
                return ciclo;
        }
        throw this.analizador.newError("error em cuerpo metodo", 0, 0);
    };
    cuerpo.prototype.branching = function (nodo, ciclo) {
        var term = nodo.childNode[0].term;
        var location = nodo.childNode[0].location;
        ;
        var salida;
        switch (term) {
            case "BREAK":
                this.analizarCiclo(ciclo, location);
                var l1 = this.analizador.newEtiqueta();
                this.analizador.agregarCodigo(this.analizador.genSalto(l1), location.last_column, location.first_line);
                ciclo.addEtiquetaS(l1, location);
                return ciclo;
            case "CONTINUE":
                this.analizarCiclo(ciclo, location);
                this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
                return ciclo;
            case "RETURN":
                l1 = this.analizador.newEtiqueta();
                this.analizador.agregarCodigo(this.analizador.genSalto(l1), location.last_column, location.first_line);
                ciclo.addEtiquetaR(l1, location);
                return ciclo;
        }
        throw this.analizador.newError("existe un error al buscar braching", 0, 0);
    };
    cuerpo.prototype.analizarCiclo = function (ciclo, location) {
        if (ciclo.isCiclo) {
            return true;
        }
        throw this.analizador.newError("no estamos para hacer un ciclo", 0, 0);
    };
    /**
     * getMetodoZ
     *  : Navegar  getMetodo
     *  | getMetodo
     *  ;
     * @param nodo
     */
    cuerpo.prototype.getMetodoZ = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "Navegar":
                return true;
            case "getMetodo":
                this.getMetodo(nodo.childNode[0]);
                return true;
        }
    };
    /**
     * getMetodo
     * : ID '(' getParametro
     * | Primitivas '(' getParametro
     * | Tipo '(' getParametro
     * ;
     * @param nodo
     */
    cuerpo.prototype.getMetodo = function (nodo) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                this.metodoID(nombre, this.getParametro(nodo.childNode[2]), nodo.childNode[0].location);
                return;
            case "Primitivas":
                nombre = nodo.childNode[0].childNode[0].term;
                this.primitivas.analizar(nombre, this.getParametro(nodo.childNode[2]));
                return;
            case "Tipo":
        }
    };
    /**
     * getParametro
    : ParametroM ')'
    | ')'
    ;
    */
    cuerpo.prototype.getParametro = function (nodo) {
        var term = nodo.childNode[0].term;
        var parametro = new Array();
        switch (term) {
            case "ParametroM":
                this.parametroM(nodo.childNode[0], parametro);
                return parametro;
            default: return parametro;
        }
    };
    /**
        ParametroM
            : ParametroM ',' e
            | ParametroM ',' Tipo
            | ParametroM ',' Nuevo
            | e
            | Tipo
            | Nuevo
            ;
     */
    cuerpo.prototype.parametroM = function (nodo, parametro) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "ParametroM":
                this.parametroM(nodo.childNode[0], parametro);
                this.parametroM(nodo.childNode[1], parametro);
            case "e":
                parametro.push(this.analizador.exp.analizar(nodo.childNode[0]));
                return true;
        }
    };
    cuerpo.prototype.metodoID = function (nombre, parametoM, location) {
        var tam = this.analizador.claseA.tabla.ptr;
        //obtengo la direccion donde esta this o esto  
        var esto = this.analizador.variable.obtenerValorVariable("esto", location.first_line, location.last_column);
        //aqui empiza el ambito simulado
        var temp = this.analizador.claseA.tabla.ptr; //en esta posicion se encuentra el retorno
        temp++; //en esta posicion se guarda this
        var t2 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t2, esto.done), location.last_column, location.first_line);
        temp++; //siguiete posicionlibre
        var param = "";
        for (var index = 0; index < parametoM.length; index++) {
            var t1 = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t1), parametoM[index].column, parametoM[index].fila);
            this.analizador.agregarCodigo(this.analizador.saveEnPila(t1, parametoM[index].valor), parametoM[index].column, parametoM[index].fila);
            param = param + "_" + parametoM[index].tipo;
            temp++;
        }
        var metodoNombre = nombre + param;
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", tam + "", "ptr"), location.last_column, location.first_line);
        var metodo = this.analizador.claseA.buscarMetodo(metodoNombre);
        this.analizador.agregarCodigo(this.analizador.llamarMetodo("metodo" + metodo.id), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.genOperacion("-", "ptr", tam + "", "ptr"), location.last_column, location.first_line);
    };
    return cuerpo;
}());
exports.default = cuerpo;
//# sourceMappingURL=cuerpo.js.map