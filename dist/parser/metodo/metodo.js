"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                this.analizador.log("sobrescrbir a crear metodo: " +
                    this.crearMetodo(nodo.childNode[0]));
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
        this.analizador.claseA.tabla.aumetarAbmito();
        this.analizador.claseA.tabla.addReturnAndThis(this.analizador.claseA.nombre);
        switch (nombre) {
            case "Visibilidad":
                metodos = this.metodo(nodo.childNode[1], nodo.childNode[0].childNode[0].token);
                this.analizador.agregarCodigo(this.analizador.metodoEnd(this.analizador.claseA.nombre + "_" + metodos.id), nodo.childNode[2].location.last_column, nodo.childNode[2].location.first_line);
                this.analizador.claseA.tabla.disminuirAmbito();
                return true;
            case "Metodo":
                metodos = this.metodo(nodo.childNode[0], this.analizador.PUBLICO);
                var coment = this.analizador.genComentario(metodos.nomMetodo + "");
                this.analizador.agregarCodigo(this.analizador.metodoEnd("metodo" + metodos.id) + coment, nodo.childNode[1].location.last_column, nodo.childNode[1].location.first_line);
                this.analizador.claseA.tabla.disminuirAmbito();
                return true;
        }
        return false;
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
    metodo.prototype.metodo = function (nodo, visi) {
        var nombre = nodo.childNode[0].term;
        var tipo = this.analizador.VACIO;
        var nombreMetodo;
        var metodo;
        var name;
        switch (nombre) {
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                return metodo;
            case "ID":
                tipo = nodo.childNode[0].token;
                name = nodo.childNode[1].token + this.parametros(nodo.childNode[3]);
                metodo = this.metodoImp(name, nodo.childNode[0].location);
                return metodo;
            case "Metodo":
                metodo = this.metodo(nodo.childNode[0], visi);
                this.analizador.cuerpo.cuerpoMetodo(nodo.childNode[1]);
                return metodo;
            case "Constructor":
                name = "constructor" + this.parametros(nodo.childNode[0].childNode[2]);
                nombreMetodo = this.analizador.claseA.nombre + "_" + name;
                metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                return metodo;
            case "Principal":
                name = "Principal";
                this.analizador.setStart();
                metodo = this.metodoImp(name, nodo.childNode[0].childNode[0].location);
                return metodo;
        }
        throw this.analizador.newError("error al crear metodo", 0, 0);
    };
    metodo.prototype.metodoImp = function (name, location) {
        var metodo = this.analizador.claseA.buscarMetodo(name);
        metodo.id = this.analizador.getContador() + "";
        var comentario = this.analizador.genComentario(this.analizador.claseA.nombre + "_" + name);
        this.analizador.agregarCodigo(this.analizador.metodoBegin("metodo" + metodo.id) + comentario, location.last_column, location.first_line);
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