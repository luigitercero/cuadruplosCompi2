"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var tabla_1 = __importDefault(require("../tablaSimbolos/tabla"));
var nodoSalida_1 = __importDefault(require("./control/nodoSalida"));
var nodoOperacion_1 = __importDefault(require("../exp/operacion/nodoOperacion"));
var metodo = /** @class */ (function () {
    function metodo(analizador) {
        this.analizador = analizador;
    }
    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo
     */
    metodo.prototype.sobrescribir = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "SOBREESCRIBIR":
                this.analizador.logPorCompletar("tengo que sobreEcribir");
                this.analizador.log("sobrescribir a metodo: " +
                    this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.crearMetodo(nodo.childNode[0]);
                return true;
        }
        return false;
    };
    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo
     */
    metodo.prototype.crearMetodo = function (nodo) {
        var nombre = nodo.childNode[0].term;
        var metodos;
        var simtemp = this.analizador.claseA.tabla;
        this.analizador.claseA.tabla = new tabla_1.default();
        this.analizador.claseA.tabla.esto = simtemp.esto;
        var s = new nodoSalida_1.default();
        switch (nombre) {
            case "Visibilidad":
                metodos = this.metodo(nodo.childNode[1], nodo.childNode[0].childNode[0].token, s);
                this.endMetodo(metodos, nodo.childNode[2].location, s);
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla = simtemp;
                return true;
            case "Metodo":
                metodos = this.metodo(nodo.childNode[0], this.analizador.PUBLICO, s);
                this.endMetodo(metodos, nodo.childNode[1].location, s);
                this.analizador.claseA.tabla.disminuirAmbito();
                this.analizador.claseA.tabla = simtemp;
                return true;
        }
        return false;
    };
    metodo.prototype.endMetodo = function (metodos, location, s) {
        var coment = this.analizador.genComentario(metodos.nomMetodo + "");
        /*
        this.analizador.agregarCodigo(this.analizador.genOperacion("-","ptr",this.analizador.claseA.tabla.ptr+"","ptr"),
         location.last_column,location.first_line);
        */
        if (s.etiquetaR.length > 0) {
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(s.etiquetaR), location.last_column, location.first_line);
        }
        if (metodos.getNombre() == "Principal") {
            this.analizador.setFinal();
        }
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + metodos.id) + coment, location.last_column, location.first_line);
    };
    /**
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   | constructor
     *   ;
     * @param nodo
     */
    /**
     * Constructor
     *: ID '(' Parametros '{'
     *;
    */
    metodo.prototype.metodo = function (nodo, visi, s) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        var name;
        switch (nombre) {
            case "Tipo":
                return this.tip0ID(nodo, visi);
            case "ID":
                return this.tip1ID(nodo, visi);
            case "Metodo":
                metodo = this.metodo(nodo.childNode[0], visi, s);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1], s);
                metodo.escrito = true;
                return metodo;
            case "Constructor":
                var cons = nodo.childNode[0].childNode[0].token.toLowerCase();
                if (cons == this.analizador.claseA.nombre) {
                    name = this.analizador.claseA.nombre + this.parametros(nodo.childNode[0].childNode[2]);
                    nombreMetodo = this.analizador.claseA.nombre + "_" + name;
                    metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                    //this.nuevoThis(nodo.childNode[0].childNode[0].location);
                    this.callPreconstructor(nodo.childNode[0].childNode[0].location);
                    metodo.escrito = true;
                    return metodo;
                }
                else {
                    this.analizador.newError("error esto no es un contructor " + cons, nodo.childNode[0].childNode[0].location.first_line, nodo.childNode[0].childNode[0].location.last_column);
                }
                break;
            case "Principal":
                name = "Principal";
                this.analizador.setStart();
                metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                this.nuevoThis(nodo.childNode[0].childNode[0].location, this.analizador.claseA.nombre, 0);
                this.callPreconstructor(nodo.childNode[0].childNode[0].location);
                metodo.escrito = true;
                return metodo;
        }
        throw this.analizador.newError("error al crear metodo", 0, 0);
    };
    metodo.prototype.tip0ID = function (nodo, visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        var name;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].childNode[0].token;
            name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
            metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
            return metodo;
        }
        else {
            tipo = nodo.childNode[0].childNode[0].token;
            name = nodo.childNode[1 + 1].token + this.parametros(nodo.childNode[3 + 1]);
            metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
            return metodo;
        }
    };
    metodo.prototype.tip1ID = function (nodo, visibilidad) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        var name;
        if (nodo.childNode[1].term != 'tipID') {
            tipo = nodo.childNode[0].token;
            name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
            metodo = this.metodoImp(name, nodo.childNode[0].location);
            return metodo;
        }
        else {
            tipo = nodo.childNode[0].token;
            name = nodo.childNode[1 + 1].token + this.parametros(nodo.childNode[3 + 1]);
            metodo = this.metodoImp(name, nodo.childNode[0].location);
            return metodo;
        }
    };
    metodo.prototype.tipID = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "'['":
                return 1;
            case "tipID":
                return this.tipID(nodo.childNode[0]) + 1;
        }
        return 0;
    };
    metodo.prototype.constructorDefault = function (location) {
        var metodos = this.metodoImp(this.analizador.claseA.nombre, location);
        this.nuevoThis(location, this.analizador.claseA.nombre, 0);
        this.callPreconstructor(location);
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + metodos.id), location.last_column, location.first_line);
        this.analizador.claseA.tabla.disminuirAmbito();
    };
    metodo.prototype.callPreconstructor = function (location) {
        var _Preconstructor = this.analizador.claseA.buscarMetodo("preconstructor", location);
        this.analizador.agregarCodigo(this.analizador.llamarMetodo("metodo" + _Preconstructor.id), location.last_column, location.first_line);
    };
    //solo se agrega una posicion ppara poder apuntar al this
    metodo.prototype.nuevoThis = function (location, objeto, ptr) {
        var t1 = this.analizador.newTemporal();
        var t2 = this.analizador.newTemporal();
        var coment = this.analizador.genComentario("guardar this en retorno de metodo " + this.analizador.claseA.nombre);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", ptr + "", t1), location.last_column, location.first_line);
        ptr++;
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t1, "heap") + coment, location.last_column, location.first_line);
        coment = this.analizador.genComentario("guardar this en this de metodo " + this.analizador.claseA.nombre);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", ptr + "", t2), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.saveEnPila(t2, "heap") + coment, location.last_column, location.first_line);
        return new nodoOperacion_1.default("heap", objeto, location.last_column, location.first_line);
    };
    metodo.prototype.metodoImp = function (name, location) {
        var metodo = this.analizador.claseA.buscarMetodo(name, location);
        this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre, metodo.getTipo());
        this.analizador.claseA.tabla.aumetarAbmito();
        metodo.preFijo = this.analizador.claseA.nombre;
        var comentario = this.analizador.genComentario(this.analizador.claseA.nombre + "_" + name);
        this.analizador.agregarCodigo(this.analizador.metodoBegin(metodo.id) + comentario, location.last_column, location.first_line);
        for (var index = 0; index < metodo.parametro.length; index++) {
            var element = metodo.parametro[index];
            this.analizador.claseA.tabla.agregarSimboloApila(element);
        }
        return metodo;
    };
    /**
     * Parametros nodo.childNode[0].childNode[0].location
     *   : Parametro ')'
     *   |  ')'
     *   ;
     * @param nodo
     */
    metodo.prototype.parametros = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "')'": return "";
            case "Parametro": return "_" + this.parametro(nodo.childNode[0]);
        }
        this.analizador.newError("error al crear metodo", 0, 0);
        return "";
    };
    /**
     * Parametro
     *   : Tipo var
     *   | ID var
     *   | Parametro ',' Tipo var
     *   | Parametro ',' ID var
     *   ;
     * @param nodo
     */
    metodo.prototype.parametro = function (nodo) {
        var term = nodo.childNode[0].term;
        var tipo;
        var nombre;
        var simbolo;
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                return tipo;
            case "ID":
                tipo = nodo.childNode[0].token;
                return tipo;
            case "Parametro":
                return this.parametro(nodo.childNode[0]) + "_" + this.addParametron(nodo);
        }
        this.analizador.newError("error al crear parametro", 0, 0);
        return "";
    };
    metodo.prototype.addParametron = function (nodo) {
        var term = nodo.childNode[2].term;
        var tipo;
        var nombre;
        var simbolo;
        switch (term) {
            case "Tipo":
                tipo = nodo.childNode[2].childNode[0].token;
                return tipo;
            case "ID":
                tipo = nodo.childNode[2].token;
                return tipo;
        }
        this.analizador.newError("error al crear parametro", 0, 0);
        return "";
    };
    return metodo;
}());
exports.default = metodo;
//# sourceMappingURL=metodo.js.map