"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var asignacion_1 = __importDefault(require("../variable/asignacion"));
var declaracion_1 = __importDefault(require("../variable/declaracion"));
var control_1 = __importDefault(require("./control/control"));
var nodoSalida_1 = __importDefault(require("./control/nodoSalida"));
var nodoOperacion_1 = __importDefault(require("../exp/operacion/nodoOperacion"));
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
        var term = nodo.term;
        if (term == "e") {
            var op = this.analizador.exp.analizar(nodo);
            this.agregarRetornogg(op, location);
            return;
        }
        else if (term == "Nuevo") {
            var op = this.analizador.variable.getNuevo(nodo);
            this.agregarRetornogg(op, location);
            return;
        }
        throw this.analizador.newError("error en retorno algo anda mal", 0, 0);
    };
    cuerpo.prototype.agregarRetornogg = function (op, location) {
        var retorno = this.analizador.variable.obtenerDirVariable("retorno", location.first_line, location.last_column);
        if (op.tipo != retorno.simbolo.getTipo()) {
            if (op.tipo == this.analizador.NULL) {
            }
            else {
                throw this.analizador.newError("retorno no coincide con el tipo tipo objeto " + op.tipo
                    + "tipo retorno " + retorno.simbolo.getTipo(), location.first_line, location.last_column);
            }
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
                this.analizador.recorrerArbol(nodo);
                var pc = this.getParametro(nodo.childNode[2]);
                return this.metodoID2(nombre, pc, nodo.childNode[0].location, esto);
            case "Primitivas":
                nombre = nodo.childNode[0].childNode[0].term;
                var location_1 = nodo.childNode[0].childNode[0].location;
                this.primitivas.analizar(nombre, this.getParametro(nodo.childNode[2]), location_1);
                return;
            case "Tipo":
                throw this.analizador.newError("no puedo hacer esto todavia", 0, 0);
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
        this.analizador.recorrerArbol(nodo);
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
            case ("Tipo"):
                return true;
        }
        throw this.analizador.newError("error parametros", 0, 0);
    };
    cuerpo.prototype.privateParmetroM2 = function (nodo, parametro) {
        var term = nodo.term;
        switch (term) {
            case "Tipo":
                throw this.analizador.newError("aun no puedo hacer esto", 0, 0);
            //break
            case "Nuevo":
                throw this.analizador.newError("aun no puedo hacer esto", 0, 0);
            //break
            case "e":
                var valor = this.analizador.exp.analizar(nodo);
                if (valor.tipo == this.analizador.STRING) {
                    valor = new nodoOperacion_1.default(this.analizador.exp.crearArregloString(valor), "caracter", valor.column, valor.fila);
                    valor.simbolo.tam = 1;
                    valor.setTam(1);
                }
                parametro.push(valor);
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
    cuerpo.prototype.ejecutarMetodo = function (nombre, param, tam, location, temp, parametoM, esto) {
        var coment = this.analizador.genComentario("aumentando de ambito para " + this.analizador.claseA.nombre);
        var metodoNombre = nombre + param;
        var ambitotemporal = this.analizador.claseA;
        if (esto !== undefined) {
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        var metodo = this.analizador.claseA.buscarMetodo(metodoNombre, location, nombre);
        if (metodo.parametro.length == parametoM.length) {
            this.escribirParametrosApila(temp, parametoM, metodo);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
            coment = this.analizador.genComentario("llamando metodo " + metodoNombre);
            this.analizador.agregarCodigo(this.analizador.llamarMetodo("metodo" + metodo.id) + coment, location.last_column, location.first_line);
            this.analizador.claseA = ambitotemporal;
            coment = this.analizador.genComentario("disminyendo de ambito para " + this.analizador.claseA.nombre);
            this.analizador.agregarCodigo(this.analizador.genOperacion("-", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
            return metodo;
        }
        else {
            throw this.analizador.newError("error no se puede llamar metodo " + nombre + param, location.last_column, location.first_line);
        }
    };
    /**
     * escribir metodo antes de variables
     * agregar parametros
     * @param nombre
     * @param parametoM
     * @param location
     * @param esto
     */
    cuerpo.prototype.metodoID2 = function (nombre, parametoM, location, esto) {
        var tam = this.analizador.claseA.tabla.ptr;
        var dir;
        if (esto === undefined) {
            dir = this.analizador.variable.obtenerValorVariable("este", location.first_line, location.last_column).done; //aqui deberia de se valor en vez de done
            //throw this.analizador.newError("revisar done ", 0, 0);
        }
        else {
            dir = esto.valor;
            this.analizador.claseA = this.analizador.buscarClase(esto.tipo);
        }
        var temp = this.escribirEstoAnuevoAmbito(dir, location, tam);
        // let param = this.escribirParametrosApila(temp, parametoM);
        var param = this.tiposDeParametros(parametoM);
        return this.ejecutarMetodo(nombre, param, tam, location, temp, parametoM, esto);
    };
    /**
     * paremetros metodos variables metodos
     * @param temp
     * @param parametoM
     */
    cuerpo.prototype.escribirParametrosApila = function (temp, parametoM, metodo) {
        var param = "";
        for (var index = 0; index < parametoM.length; index++) {
            var t1 = this.analizador.newTemporal();
            metodo.parametro[index];
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t1), parametoM[index].column, parametoM[index].fila);
            var agregarValor = "";
            if (!metodo.parametro[index].getPunter()) {
                if (parametoM[index].tipo == this.analizador.STRING) {
                    if (metodo.parametro[index].getTipo() == this.analizador.CARACTER) {
                        if (metodo.parametro[index].tam == 1) {
                            agregarValor = this.analizador.saveEnPila(t1, parametoM[index].valor);
                        }
                        else {
                            throw this.analizador.newError("errror al querer gregar una cadena ", parametoM[index].column, parametoM[index].fila);
                        }
                    }
                    else {
                        throw this.analizador.newError("errror al querer gregar una cadena ", parametoM[index].column, parametoM[index].fila);
                    }
                }
                else {
                    agregarValor = this.analizador.saveEnPila(t1, parametoM[index].valor);
                }
            }
            else {
                var pra = parametoM[index].getReff();
                if (pra != undefined) {
                    if (parametoM[index].getReff().simbolo.getPunter()) {
                        var ap = this.analizador.variable.crearPunteroDefault(parametoM[index].
                            getReff().location);
                        var t0 = this.analizador.newTemporal();
                        this.analizador.agregarCodigo(this.analizador.genOperacion("+", ap.valor, "1", t0), parametoM[index].column, parametoM[index].fila);
                        this.analizador.agregarCodigo(this.analizador.saveEnHeap(ap.valor, parametoM[index].getReff().dir), parametoM[index].column, parametoM[index].fila);
                        this.analizador.agregarCodigo(this.analizador.saveEnHeap(t0, parametoM[index].getReff().gettemporalDeGuardado()), parametoM[index].column, parametoM[index].fila);
                        agregarValor = this.analizador.saveEnPila(t1, ap.valor);
                    }
                    else {
                        //aqui son apuntadores de variables
                        var ap = this.analizador.variable.crearPuntero(parametoM[index]);
                        agregarValor = this.analizador.saveEnPila(t1, ap.valor);
                    }
                }
                else {
                    throw this.analizador.newError("se requiere un apuntador con el tipo", parametoM[index].column, parametoM[index].fila);
                }
            }
            this.analizador.agregarCodigo(agregarValor, parametoM[index].column, parametoM[index].fila);
            param = param + "_" + parametoM[index].tipo;
            temp++;
        }
        return param;
    };
    cuerpo.prototype.tiposDeParametros = function (parametoM) {
        var param = "";
        for (var index = 0; index < parametoM.length; index++) {
            if (parametoM[index].tipo == this.analizador.STRING) {
                param = param + "_" + this.analizador.CARACTER;
            }
            else {
                param = param + "_" + parametoM[index].tipo;
            }
        }
        return param;
    };
    cuerpo.prototype.escribirEstoAnuevoAmbito = function (esto, location, tam) {
        var temp = tam; //en esta posicion se encuentra el retorno
        //en esta posicion se guarda this
        var t2 = this.analizador.newTemporal();
        var comentario = this.analizador.genComentario("guardar en pila nuevo ambito");
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t2, esto) + comentario + " esto en retorno", location.last_column, location.first_line);
        temp++;
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", temp + "", t2), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t2, esto) + comentario, location.last_column, location.first_line);
        temp++; //siguiete posicionlibre
        this.analizador.agregarCodigo(this.analizador.genComentario("agregando parametros"), location.last_column, location.first_line);
        return temp;
    };
    return cuerpo;
}());
exports.default = cuerpo;
//# sourceMappingURL=cuerpo.js.map