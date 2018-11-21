"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * esta clase lleva el control del formato intermido
 */
var FormatoItermedio = /** @class */ (function () {
    function FormatoItermedio() {
        this.codigo4D = {
            'C4D': [{ 'poss': -1, 'codigo': "", 'columna': -1, 'linea': -1, 'ambito': "", 'tipo': "", 'value': "" }],
            'state': true,
            'etiqueta': [{ 'etiqueta': "", 'poss': -1 }],
            'metodo': [{ 'metodo': "", 'poss': -1 }],
            'temporal': [{ "tempora": "retorno", "valor": 35174492 }],
            'start': 1,
            'end': 5
        };
        this.INT = "entero";
        this.CARACTER = "caracter";
        this.STRING = "string";
        this.BOOLEANO = "booleano";
        this.PUBLICO = "publico";
        this.PRIVADO = "privado";
        this.PROTEGIDO = "protegido";
        this.VACIO = "vacio";
        this.DOUBLE = "decimal";
        this.NULL = "35174492";
        this.codigoIntermedio = "";
        this.temporal = 1;
        this.etiqueta = 1;
        this.poss = 1;
        this.contador = 0;
        this.puntero = true;
    }
    FormatoItermedio.prototype.get3D = function () {
        return this.codigo4D;
    };
    FormatoItermedio.prototype.gen3D = function () {
        var salida = "";
        for (var index = 1; index < this.codigo4D.C4D.length; index++) {
            var element = this.codigo4D.C4D[index];
            salida = salida + element.codigo + "\n";
        }
        return salida;
    };
    FormatoItermedio.prototype.setFinal = function () {
        this.codigo4D.end = this.poss;
    };
    /*retorna el numero de metodo que toca */
    FormatoItermedio.prototype.getContador = function () {
        this.contador++;
        this.codigo4D.metodo.push({ 'metodo': "metodo" + this.contador, 'poss': this.poss });
        return this.contador;
    };
    FormatoItermedio.prototype.agregarCodigo = function (codigo, column, linea, tipo, value) {
        this.codigoIntermedio = this.codigoIntermedio + codigo + "\n";
        var a = this.getAmbito();
        var p = "";
        var v = "";
        if (tipo != undefined) {
        }
        if (this.puntero) {
            this.codigo4D.C4D.push({
                'poss': this.poss, 'codigo': codigo, 'columna': column, 'linea': linea,
                'ambito': a, 'tipo': p, 'value': v
            });
        }
        else {
            this.codigo4D.C4D.push({
                'poss': this.poss, 'codigo': codigo, 'columna': -1, 'linea': linea,
                'ambito': a, 'tipo': p, 'value': v
            });
        }
        this.poss++;
        console.log("#" + codigo, ' columna: ' + column + ' linea: ' + linea);
    };
    FormatoItermedio.prototype.getAmbito = function () {
        return "";
    };
    FormatoItermedio.prototype.siguiLibreHeap = function () {
        return this.genOperacion("+", "heap", 1 + "", "heap");
    };
    FormatoItermedio.prototype.setStart = function () {
        this.codigo4D.start = this.poss;
    };
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
    FormatoItermedio.prototype.saveEnPila = function (pos, valor) {
        return this.genCuadruplo("<=", pos, valor, "stack");
    };
    /**
     *
     * @param pos es la posicion donde se vaa acceder
     * @param valor es el valor que que se obtiene al acceder la posicion del arreglo
     */
    FormatoItermedio.prototype.getEnPila = function (pos, valor) {
        return this.genCuadruplo("=>", pos, valor, "stack");
    };
    /**
     *
     * @param pos es la posicion donde va a acceder al heap
     * @param valor  es el valor que se guarda en la posicion del heap
     */
    FormatoItermedio.prototype.saveEnHeap = function (pos, valor) {
        return this.genCuadruplo("<=", pos, valor, "heap");
    };
    /**
     *
     * @param pos es la posicion en el heap
     * @param valor es el valor del la posicion del heap
     */
    FormatoItermedio.prototype.getEnHeap = function (pos, valor) {
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
        operador = this.opBool(operador);
        return this.genCuadruplo(operador, argumeto1, argumeto2, resultado);
    };
    FormatoItermedio.prototype.opBool = function (operador) {
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
        return operador;
    };
    /**
     *  es el formato que necesita para hacer un salto
     * @param etiqueta es la etiqueta a donde va el salto
     */
    FormatoItermedio.prototype.genSalto = function (etiqueta) {
        return this.genCuadruplo("jmp", "", "", etiqueta);
    };
    /**
     * L1,L2:
     */
    FormatoItermedio.prototype.escribirEtiqueta = function (etiqueta) {
        var _this = this;
        var salida = "";
        etiqueta.forEach(function (element) {
            if (salida == "") {
                salida = element;
                var a = element.replace("L", "");
                _this.codigo4D.etiqueta[+a] = { "etiqueta": element, "poss": _this.poss };
            }
            else {
                salida = salida + "," + element;
                var a = element.replace("L", "");
                _this.codigo4D.etiqueta[+a] = { "etiqueta": element, "poss": _this.poss };
            }
        });
        if (salida != "") {
            return (salida + ":");
        }
        else {
            return "";
        }
    };
    FormatoItermedio.prototype.escribirEtiquetaS = function (etiqueta) {
        var a = etiqueta.replace("L", "");
        this.codigo4D.etiqueta[+a] = { "etiqueta": etiqueta, "poss": this.poss };
        return etiqueta + ":";
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
    FormatoItermedio.prototype.metodoBegin = function (id) {
        this.codigo4D.metodo[+id] = { "metodo": "metodo" + id, "poss": this.poss };
        return this.genCuadruplo("begin", "", "", "metodo" + id);
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
        this.codigo4D.etiqueta.push({ 'etiqueta': l, 'poss': -1 });
        return l;
    };
    /**
     * genera un nuevo temporal
     */
    FormatoItermedio.prototype.newTemporal = function () {
        var t = "T" + this.temporal;
        this.temporal = this.temporal + 1;
        this.codigo4D.temporal.push({ 'tempora': t, 'valor': 35174492 });
        return t;
    };
    /**
     * agreagar un nuevo error
     */
    FormatoItermedio.prototype.newError = function (descripcion, linea, columna) {
        console.log(descripcion + " linea: " + linea + " columna: " + columna);
        throw new Error(descripcion + " linea: " + linea + " columna: " + columna);
    };
    FormatoItermedio.prototype.logPorCompletar = function (mensaje) {
        console.log("es necesario completar: " + mensaje);
    };
    return FormatoItermedio;
}());
exports.default = FormatoItermedio;
//# sourceMappingURL=itermedio.js.map