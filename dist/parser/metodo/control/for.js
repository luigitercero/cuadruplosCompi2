"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var comparacion_1 = __importDefault(require("../../exp/operacion/comparacion"));
var simbolo_1 = __importDefault(require("../../tablaSimbolos/simbolo"));
var FOR = /** @class */ (function () {
    function FOR(control) {
        this.control = control;
    }
    /**
     *For:FOR '('VARIABLE':' ID ';' DESDE ':' e ';' HASTA ':' e ')' Cuerpo
     *;
     * @param nodo
     * @param ciclo
     */
    FOR.prototype.ejecutar = function (nodo, ciclo) {
        /*se aumenta el ambito */
        this.control.analizador.claseA.tabla.aumetarAbmito();
        /*creo etiqueta start */
        var start = this.control.analizador.newEtiqueta();
        var SS = this.control.analizador.newEtiqueta();
        /*etiqueta incio*/
        ciclo.start.push(start);
        /*saltos al cuerpo */
        var ejecucion = [];
        ejecucion.push(this.control.analizador.newEtiqueta());
        /*nombrede la nueva vaiable que se crea */
        var ID = nodo.childNode[4].token;
        /*este el modo del cuerpo */
        var cuerpo = nodo.childNode[14];
        /*agregar variable a la tabla de simbolos */
        this.control.analizador.claseA.tabla.agregarSimboloApila(new simbolo_1.default(ID, "", this.control.analizador.INT));
        /*obtengo la direccion de la variable del contador */
        var dirID = this.control.analizador.variable.obtenerDirVariable(ID, nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
        dirID.addLocation(nodo.childNode[0].location);
        /**se evaluan los dos argumentos para determinas si se va a sumar o restar */
        var arg0 = this.control.analizador.exp.analizar(nodo.childNode[8]);
        var arg1 = this.control.analizador.exp.analizar(nodo.childNode[12]);
        /**agrego el argumento 0 a la variable contador ahi inicia */
        this.control.analizador.agregarCodigo(this.control.analizador.saveEnPila(dirID.dir, arg0.valor), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*se escribe la etiqueta start*/
        this.escribirEtiquetaSS(SS, nodo.childNode[0].location);
        /*se obtiene el valor del contador*/
        arg0 = this.control.analizador.variable.gerVal(dirID);
        /*si es igual debe salir del control */
        var igual = this.igual(arg0, arg1);
        ciclo.addEtiquetaSS(igual.etiquetaV);
        this.escribirEtiqueta(igual.etiquetaF, nodo.childNode[0].location);
        /**ejecuta el cuerpo */
        this.control.cuerpo(cuerpo, ciclo);
        this.escribirEtiquetaStart(ciclo, nodo.childNode[0].location);
        /*si es mayor debe disminuir */
        var mayor = this.mayorque(arg0, arg1);
        this.escribirEtiqueta(mayor.etiquetaF, nodo.childNode[0].location);
        /*si es menor debe sumar */
        var menor = this.menorque(arg0, arg1); //ciclo.addEtiquetaSS(mayor.etiquetaF);ciclo.addEtiquetaSS(menor.etiquetaF)
        /*etiqetas verdaderas si es menor */
        this.escribirEtiqueta(mayor.etiquetaV, nodo.childNode[0].location);
        var valorN = this.control.analizador
            .exp.evaluarPP(dirID, "-");
        /*guardar el nuevo valor al contador contador -1 */
        this.control.analizador.agregarCodigo(this.control.analizador.saveEnPila(dirID.dir, valorN.valor), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*saltar a la ejecucion del cuerpo */
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ejecucion[0]), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*escribe etiquetas verdaderas se es menor*/
        this.escribirEtiqueta(menor.etiquetaV, nodo.childNode[0].location);
        valorN = this.control.analizador
            .exp.evaluarPP(dirID, "+");
        /*guardar el nuevo valor al contador contador +1 */
        this.control.analizador.agregarCodigo(this.control.analizador.saveEnPila(dirID.dir, valorN.valor), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /*saltar a la ejecucion del cuerpo */
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(ejecucion[0]), nodo.childNode[0].location.last_column, nodo.childNode[0].location.first_line);
        /**escribe la etiqueta de ejecucion */
        this.escribirEtiqueta(ejecucion, nodo.childNode[0].location);
        /**regresa a start */
        this.escribirSaltoStart(SS, nodo.childNode[0].location);
        /**sale de start */
        this.escribirEtiquetaSalida(ciclo, nodo.childNode[0].location);
        this.control.analizador.claseA.tabla.disminuirAmbito();
    };
    FOR.prototype.escribirEtiqueta = function (etiqueta, location) {
        if (etiqueta.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(etiqueta), location.last_column, location.first_line);
        }
    };
    FOR.prototype.escribirEtiquetaSalida = function (ciclo, location) {
        if (ciclo.etiquetaS.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.etiquetaS), location.last_column, location.first_line);
        }
    };
    FOR.prototype.escribirEtiquetaStart = function (ciclo, location) {
        if (ciclo.start.length > 0) {
            this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiqueta(ciclo.start), location.last_column, location.first_line);
        }
    };
    FOR.prototype.escribirEtiquetaSS = function (SS, location) {
        this.control.analizador.agregarCodigo(this.control.analizador.escribirEtiquetaS(SS), location.last_column, location.first_line);
    };
    FOR.prototype.escribirSaltoStart = function (SS, location) {
        this.control.analizador.agregarCodigo(this.control.analizador.genSalto(SS), location.last_column, location.first_line);
    };
    FOR.prototype.errorIf = function (exp) {
        if (exp.tipo == this.control.analizador.BOOLEANO) {
        }
        else {
            this.control.analizador.newError("existe error al intentar operar el IF", exp.fila, exp.column);
        }
    };
    FOR.prototype.igual = function (arg0, arg1) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            var a = new comparacion_1.default(arg0, arg1, this.control.analizador, "==");
            return a.evaluar();
        }
        else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    };
    FOR.prototype.mayorque = function (arg0, arg1) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            var a = new comparacion_1.default(arg0, arg1, this.control.analizador, ">");
            return a.evaluar();
        }
        else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    };
    FOR.prototype.menorque = function (arg0, arg1) {
        if (arg0.tipo == this.control.analizador.INT && arg1.tipo == this.control.analizador.INT) {
            var a = new comparacion_1.default(arg0, arg1, this.control.analizador, "<");
            return a.evaluar();
        }
        else {
            throw this.control.analizador.newError("error en un for nlos tipos estan mal", arg0.fila, arg0.column);
        }
    };
    return FOR;
}());
exports.default = FOR;
//# sourceMappingURL=for.js.map