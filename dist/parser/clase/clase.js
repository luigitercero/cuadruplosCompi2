"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion_1 = __importDefault(require("../exp/operacion/nodoOperacion"));
var metodo_1 = __importDefault(require("../tablaSimbolos/metodo"));
var Clase = /** @class */ (function () {
    function Clase(analizador) {
        this.analizador = analizador;
    }
    /**
    * CrearClase
    *: Clase '}'
    *;
    * @param nodo
    */
    Clase.prototype.crearClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Clase":
                this.analizador.log("crearClase a Clase: " +
                    this.clase(nodo.childNode[0]));
                this.exixteContructor(nodo.childNode[1].location);
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return false;
    };
    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo
     */
    Clase.prototype.clase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "CLASE":
                this.analizador.claseA = this.analizador.buscarClase(nodo.childNode[1].token);
                var herdaDe = this.herencia(nodo.childNode[2]);
                this.asignarVariablesGlobales(herdaDe);
                return true;
            case "Clase":
                this.analizador.log("clase a clase: " +
                    this.clase(nodo.childNode[0]));
                this.cuerpoClase(nodo.childNode[1]);
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return false;
    };
    Clase.prototype.exixteContructor = function (location) {
        var metodo = this.analizador.claseA.buscarMetodo(this.analizador.claseA.nombre, location);
        if (metodo.escrito === false) {
            this.escribirContructor(location);
        }
        else {
        }
    };
    Clase.prototype.escribirContructor = function (location) {
        this.analizador.metodoA.constructorDefault(location);
    };
    /**
     * Herencia
     *:'{'
     *| HEREDADE ID '{'
     *;
     * @param nodo
     */
    Clase.prototype.herencia = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "HEREDADE":
                var hereda = this.analizador.buscarClase(nodo.childNode[1].token);
                if (hereda == undefined) {
                    throw this.analizador.newError("no existe la herenci con nombre de " + nodo.childNode[1].token, nodo.childNode[1].location.first_line, nodo.childNode[1].location.last_column);
                }
                else {
                    return hereda;
                }
            case "Herencia":
                return this.herencia(nodo.childNode[0]);
            case "'{'":
                return undefined;
        }
        throw this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
    };
    /**
     * este es el metod la produccion cuerpoClaes
     * CuerpoClase
     *   : DeclaracionClase
     *   | SobreEscribir
     *   | Estruct
     * ;
     * @param nodo
     */
    Clase.prototype.cuerpoClase = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "DeclaracionClase"://declaracion de una variable en una clase
                return true;
            case "SobreEscribir":
                this.analizador.log("cuerpoClase a sobrescribir: " +
                    this.analizador.metodoA.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                //this.analizador.getCodEstruct().Inicio(nodo.childNode[0],this.analizador.)
                return true;
            case "CuerpoClase":
                this.analizador.log("cuerpoClase a cuerpoClase: " +
                    this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        this.analizador.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        return false;
    };
    Clase.prototype.asignarVariablesGlobales = function (herdaDe) {
        //this.heredar(herdaDe);
        this.analizador.claseA.tabla.ptr = 2;
        var nombreClase = this.analizador.claseA.nombre;
        var poss = this.analizador.claseA.poss;
        var coment = this.analizador.genComentario(nombreClase + "_Precontructor");
        var _Precontructor = new metodo_1.default("Preconstructor", this.analizador.PUBLICO, nombreClase);
        this.analizador.claseA.agregarMetodo(_Precontructor);
        var id = this.analizador.getContador();
        _Precontructor.id = id + "";
        this.analizador.agregarCodigo(this.analizador.metodoBegin(id + "") + coment, 0, poss);
        coment = this.analizador.genComentario("desplazar tama;o de heap para variables de this");
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", this.analizador.claseA.tabla.esto.ambito.length + "", "heap") + coment, 0, poss);
        for (var index = 0; index < this.analizador.claseA.tabla.esto.ambito.length; index++) {
            var element = this.analizador.claseA.tabla.esto.ambito[index];
            var sim = element;
            if (!sim.getPunter()) {
                if (sim.dim.length > 0) {
                    this.agregarDimGlobal(sim);
                }
                if (element.valor.valor != null) {
                    this.analizador.variable.evaluarAsignacionasignarValor(sim);
                }
                else {
                    this.analizador.variable.incializar(sim, sim.getLocacion_de_declaracion());
                }
            }
            else {
                if (element.valor.valor != null) {
                    var nodo = element.valor.getNodo();
                    var Valor = this.analizador.exp.analizar(nodo);
                    var puntero = this.analizador.variable.crearPuntero(Valor);
                    this.analizador.variable.asignarPunteroDefaul(puntero, sim, sim.location);
                }
                else {
                    var valor = this.analizador.variable.crearPunteroDefault(sim.location);
                    this.analizador.variable.asignarPunteroDefaul(valor, sim, sim.location);
                }
            }
        }
        coment = this.analizador.genComentario("fin de metodo preconstructor para " + nombreClase);
        this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + id) + coment, 0, poss);
        this.analizador.claseA.tabla.ptr = 0;
        this.agregarPrimitrivas();
    };
    Clase.prototype.agregarPrimitrivas = function () {
        try {
            var hereda = this.analizador.buscarClase("casteos58592714DeLuisAzurdia");
            if (hereda == undefined) {
            }
            else {
                if (this.analizador.claseA.nombre != "casteos58592714deluisazurdia") {
                    for (var index = 0; index < hereda.metodo.length; index++) {
                        var element = hereda.metodo[index];
                        this.analizador.claseA.agregarMetodo(element);
                    }
                }
            }
        }
        catch (_a) {
        }
    };
    /**
     * agrega el tama;ano necesario para los arreglos funciona para valores globales
     * @param simbolo
     */
    Clase.prototype.agregarDimGlobal = function (simbolo) {
        var op = new nodoOperacion_1.default("", "", 0, simbolo.linea);
        op.simbolo = simbolo;
        for (var index = 0; index < simbolo.dim.length; index++) {
            var element = simbolo.dim[index];
            var val = this.analizador.exp.analizar(element);
            op.simbolo.tam = index;
            this.analizador.variable.agregarDimAHeapGLOBAL(op, val, simbolo.getLocacion_de_declaracion());
        }
        if (op.simbolo.tam > 0) {
            this.analizador.agregarCodigo(this.analizador.genComentario("desplazamiento de variable a psoicion de valores"), op.column, op.fila);
            var temp = this.analizador.variable.obtenerValorVariable(op.simbolo.getNombre(), op.fila, op.column);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.val, op.temp), op.column, op.fila);
            this.analizador.cuerpo.declarar.InicializarPosicionesArreglo(op);
            //this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", op.temp, "heap"), op.column, op.fila);
            //this.analizador.agregarCodigo(this.analizador.genOperacion("+","heap",1+"","heap"),op.column,op.fila);
        }
        else {
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", 1 + "", "heap"), op.column, op.fila);
        }
    };
    return Clase;
}());
exports.default = Clase;
//# sourceMappingURL=clase.js.map