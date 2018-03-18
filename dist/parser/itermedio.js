"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * esta clase lleva el control del formato intermido
 */
var FormatoItermedio = /** @class */ (function () {
    function FormatoItermedio() {
        this.temporal = 0;
        this.etiqueta = 0;
    }
    FormatoItermedio.prototype.pila = function (n) {
        return "Pila [ " + n + " ]";
    };
    FormatoItermedio.prototype.heap = function (n) {
        return "Heap [ " + n + " ]";
    };
    /**
     *
     * @param pos es la posicion donde de que se desea acceder del staack
     * @param valor es valor que se va a guardar
     */
    FormatoItermedio.prototype.guardarEnPila = function (pos, valor) {
        return this.genCuadruplo("<=", pos, valor, "stack");
    };
    /**
     *
     * @param pos es la posicion donde se vaa acceder
     * @param valor es el valor que que se obtiene al acceder la posicion del arreglo
     */
    FormatoItermedio.prototype.obtenerEnPila = function (pos, valor) {
        return this.genCuadruplo("=>", pos, valor, "stack");
    };
    /**
     *
     * @param pos es la posicion donde va a acceder al heap
     * @param valor  es el valor que se guarda en la posicion del heap
     */
    FormatoItermedio.prototype.guardarEnHeap = function (pos, valor) {
        return this.genCuadruplo("<=", pos, valor, "heap");
    };
    /**
     *
     * @param pos es la posicion donde se va guardar en el heap
     * @param valor es el valor que se guarda en la posicion del heap
     */
    FormatoItermedio.prototype.obtenerEnHeap = function (pos, valor) {
        return this.genCuadruplo("=>", pos, valor, "heap");
    };
    /**
     * crea formato que se usara para las operacopms
     * @param operador este es el operador puede ser  + - * / == !=
     * @param argumeto1 este es el primer valor para la operacion
     * @param argumeto2 este es el segundo valor para la operacion
     * @param resultado es temporal en donde se guarda el resultado
     */
    FormatoItermedio.prototype.genOperacion = function (operador, argumeto1, argumeto2, resultado) {
        switch (operador) {
            case "==":
                operador = "je";
                break;
            case "!=":
                operador = "jne";
                break;
            case ">":
                operador = "jg";
                break;
            case ">=":
                operador = "jge";
                break;
            case "<":
                operador = "jl";
                break;
            case "<=":
                operador = "jle";
                break;
        }
        return this.genCuadruplo(operador, argumeto1, argumeto2, resultado);
    };
    /**
     *  es el formato que necesita para hacer un salto
     * @param etiqueta es la etiqueta a donde va el salto
     */
    FormatoItermedio.prototype.genSalto = function (etiqueta) {
        return this.genCuadruplo("jmp", "", "", etiqueta);
    };
    /**
     * asignar valor a variable
     * @param val es el valor que va a tener la variable
     * @param variable es la variable que se va a guardar el valor
     */
    FormatoItermedio.prototype.asignar = function (val, variable) {
        return this.genCuadruplo("=", val, "", variable);
    };
    /**
     * iniciar un metodo
     * @param nombre  nombre del metodo
     */
    FormatoItermedio.prototype.metodoBegin = function (nombre) {
        return this.genCuadruplo("begin", "", "", nombre);
    };
    /**
     * inalizar un metodo con el formato
     * @param nombre nombre del metodo
     */
    FormatoItermedio.prototype.metodoEnd = function (nombre) {
        return this.genCuadruplo("end", "", "", nombre);
    };
    /**
     * llama al metodo en formato
     * @param nombre nombre del metodo
     */
    FormatoItermedio.prototype.llamarMetodo = function (nombre) {
        return this.genCuadruplo("call", "", "", nombre);
    };
    /**
     * este servira para llevar control de las acciones
     * @param imprimir sentencia que se va imprimir
     */
    FormatoItermedio.prototype.log = function (imprimir) {
        console.log(imprimir);
    };
    /**
     * este sera el metodo salida para la consola metodo imprimir
     * @param imprimir
     */
    FormatoItermedio.prototype.salidaConsola = function (imprimir) {
        console.log(imprimir);
    };
    /**
     * agregara un comentario al formato 3d
     * @param comentario
     */
    FormatoItermedio.prototype.genComentario = function (comentario) {
        return "// " + comentario;
    };
    /**
     * este sera el formato para generar el cuadruplo
     * @param operador
     * @param argumeto1
     * @param argumeto2
     * @param resultado
     */
    FormatoItermedio.prototype.genCuadruplo = function (operador, argumeto1, argumeto2, resultado) {
        return operador + ", " + argumeto1 + ", " + argumeto2 + ", " + resultado;
    };
    /**
     * genera una nueva etiqueta
     */
    FormatoItermedio.prototype.newEtiqueta = function () {
        var l = "L" + this.etiqueta;
        this.etiqueta = this.etiqueta + 1;
        return l;
    };
    /**
     * genera un nuevo temporal
     */
    FormatoItermedio.prototype.newTemporal = function () {
        var t = "T" + this.temporal;
        this.temporal = this.temporal + 1;
        return t;
    };
    /**
     * agreagar un nuevo error
     */
    FormatoItermedio.prototype.newError = function (descripcion, linea, columna) {
        console.log(descripcion + " linea: " + linea + " columna: " + columna);
    };
    return FormatoItermedio;
}());
exports.default = FormatoItermedio;
