"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var asignacion_1 = __importDefault(require("../variable/asignacion"));
var declaracion_1 = __importDefault(require("../variable/declaracion"));
var control_1 = __importDefault(require("./control/control"));
var nodoSalida_1 = __importDefault(require("./control/nodoSalida"));
var primitivas_1 = __importDefault(require("./primitivas/primitivas"));
var cuerpo = /** @class */ (function () {
    function cuerpo(analizador) {
        this.analizador = analizador;
        this.asignar = new asignacion_1.default(analizador);
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
                if (nodo.childNode.length > 1) {
                    this.agregarRetorno(nodo.childNode[1], nodo.childNode[0].location);
                }
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
    cuerpo.prototype.agregarRetorno = function (nodo, location) {
        var op = this.analizador.exp.analizar(nodo);
        var retorno = this.analizador.variable.obtenerDirVariable("retorno", location.first_line, location.last_column);
        if (op.tipo != retorno.simbolo.getTipo()) {
            throw this.analizador.newError("retorno no coincide con el tipo", location.first_line, location.last_column);
        }
        this.analizador.agregarCodigo(this.analizador.saveEnPila(retorno.dir, op.valor), location.last_column, location.first_line);
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
                var temp = this.analizador.claseA;
                var navegar = this.analizador.variable.navegar(nodo.childNode[0]);
                this.analizador.claseA = temp;
                this.getMetodo(nodo.childNode[1], navegar);
                this.analizador.claseA = temp;
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
    cuerpo.prototype.getMetodo = function (nodo, esto) {
        var term = nodo.childNode[0].term;
        var nombre;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                return this.metodoID2(nombre, this.getParametro(nodo.childNode[2]), nodo.childNode[0].location, esto);
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
                this.privateParmetroM2(nodo.childNode[2], parametro);
                return true;
            case "e":
                this.privateParmetroM2(nodo.childNode[0], parametro);
                return true;
        }
        throw this.analizador.newError("error parametros", 0, 0);
    };
    cuerpo.prototype.privateParmetroM2 = function (nodo, parametro) {
        var term = nodo.term;
        switch (term) {
            case "Tipo":
                break;
            case "Nuevo":
                break;
            case "e":
                parametro.push(this.analizador.exp.analizar(nodo));
                return true;
        }
        throw this.analizador.newError("error parametros", 0, 0);
    };
    cuerpo.prototype.nuevoObjeto = function (nodo) {
        var objeto = nodo.childNode[1].childNode[0].token;
        var location = nodo.childNode[0].location;
        var tam = this.analizador.claseA.tabla.ptr;
        var metodo;
        this.analizador.claseA.tabla.aumetarAbmito();
        var este = this.analizador.metodoA.nuevoThis(location, objeto, tam);
        metodo = this.analizador.variable.getmetodo(nodo.childNode[1], este);
        this.analizador.claseA.tabla.disminuirAmbito();
        return metodo;
    };
    cuerpo.prototype.ejecutarMetodo = function (nombre, param, tam, location, esto) {
        var coment = this.analizador.genComentario("aumentando de ambito para " + this.analizador.claseA.nombre);
        var metodoNombre = nombre + param;
        var ambitotemporal = this.analizador.claseA;
        if (esto !== undefined) {
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        var metodo = this.analizador.claseA.buscarMetodo(metodoNombre, location);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
        coment = this.analizador.genComentario("llamando metodo " + metodoNombre);
        this.analizador.agregarCodigo(this.analizador.llamarMetodo("metodo" + metodo.id) + coment, location.last_column, location.first_line);
        this.analizador.claseA = ambitotemporal;
        coment = this.analizador.genComentario("disminyendo de ambito para " + this.analizador.claseA.nombre);
        this.analizador.agregarCodigo(this.analizador.genOperacion("-", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
        return metodo;
    };
    cuerpo.prototype.metodoID2 = function (nombre, parametoM, location, esto) {
        var tam = this.analizador.claseA.tabla.ptr;
        var dir;
        if (esto === undefined) {
            dir = this.analizador.variable.obtenerValorVariable("este", location.first_line, location.last_column).done;
        }
        else {
            dir = esto.valor;
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        var temp = this.escribirEstoAnuevoAmbito(dir, location, tam);
        var param = this.escribirParametrosApila(temp, parametoM);
        temp = temp + parametoM.length;
        return this.ejecutarMetodo(nombre, param, tam, location, esto);
    };
    cuerpo.prototype.escribirParametrosApila = function (temp, parametoM) {
        var param = "";
        for (var index = 0; index < parametoM.length; index++) {
            var t1 = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t1), parametoM[index].column, parametoM[index].fila);
            this.analizador.agregarCodigo(this.analizador.saveEnPila(t1, parametoM[index].valor), parametoM[index].column, parametoM[index].fila);
            param = param + "_" + parametoM[index].tipo;
            temp++;
        }
        return param;
    };
    cuerpo.prototype.escribirEstoAnuevoAmbito = function (esto, location, tam) {
        var temp = tam; //en esta posicion se encuentra el retorno
        temp++; //en esta posicion se guarda this
        var t2 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t2, esto), location.last_column, location.first_line);
        temp++; //siguiete posicionlibre
        this.analizador.agregarCodigo(this.analizador.genComentario("agregando parametros"), location.last_column, location.first_line);
        return temp;
    };
    return cuerpo;
}());
exports.default = cuerpo;
//# sourceMappingURL=cuerpo.js.map