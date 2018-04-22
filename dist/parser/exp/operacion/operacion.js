"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion_1 = __importDefault(require("./nodoOperacion"));
var nodoOperacion_2 = __importDefault(require("./nodoOperacion"));
var suma_1 = __importDefault(require("./suma"));
var comparacion_1 = __importDefault(require("./comparacion"));
var Operacion = /** @class */ (function () {
    function Operacion(anlaizador) {
        this.analizador = anlaizador;
    }
    Operacion.prototype.operarMayorIgual = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, ">=");
        return op.evaluar();
        ;
    };
    Operacion.prototype.operarMenorIgual = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, "<=");
        return op.evaluar();
    };
    Operacion.prototype.operarMayorQue = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, ">");
        return op.evaluar();
    };
    Operacion.prototype.operarMenorQue = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, "<");
        return op.evaluar();
    };
    Operacion.prototype.operarNoIgual = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, "!=");
        return op.evaluar();
    };
    Operacion.prototype.operarIgual = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new comparacion_1.default(a0, a1, this.analizador, "==");
        return op.evaluar();
    };
    Operacion.prototype.operarXor = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        if (a0.tipo == this.analizador.BOOLEANO)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF), a0.column, a0.fila); //agregnaod etiqueta falsa
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == this.analizador.BOOLEANO) {
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaV), a0.column, a0.fila); //agregnaod etiqueta verdadera
            var l5 = this.analizador.newEtiqueta();
            var l6 = this.analizador.newEtiqueta();
            this.analizador.agregarCodigo(a1.valor + "," + l5, a1.column, a1.fila);
            //this.analizador.agregarCodigo(a0.etiquetaV+","+ l6 +":",a0.column,a0.fila);//agregnaod etiqueta verdadera
            var res = new nodoOperacion_2.default("", this.analizador.BOOLEANO, a0.column, a0.fila);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaV(l6);
            res.addEtiquetaFV(a1.etiquetaF);
            res.addEtiquetaF(l5);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarAnd = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        if (a0.tipo == this.analizador.BOOLEANO)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaV), a0.column, a0.fila); //agregnaod etiqueta verdadera
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == this.analizador.BOOLEANO) {
            var res = new nodoOperacion_2.default("", this.analizador.BOOLEANO, a0.column, a0.fila);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaFV(a0.etiquetaF);
            res.addEtiquetaFV(a1.etiquetaF);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarOr = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        if (a0.tipo == this.analizador.BOOLEANO)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF), a0.column, a0.fila); //agregnaod etiqueta verdadera
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == this.analizador.BOOLEANO) {
            var res = new nodoOperacion_2.default("", this.analizador.BOOLEANO, a0.column, a0.fila);
            res.addEtiquetaVV(a0.etiquetaV);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaFV(a1.etiquetaF);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarEleva = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "*");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
    };
    Operacion.prototype.operarModulo = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "+");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
        ;
    };
    Operacion.prototype.operarDivicion = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "/");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
    };
    Operacion.prototype.operarMultiplicaion = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "*");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
    };
    Operacion.prototype.operarResta = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "-");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
    };
    Operacion.prototype.operarSuma = function (arg0, arg1) {
        var op = new suma_1.default(this.analizador, "+");
        op.setArg0(this.analizar(arg0));
        op.setArg1(this.analizar(arg1));
        return op.evaluar();
    };
    /**
     * este metodo inicia expresion
     * @param nodo aqui empiza un el nodo exp
     */
    Operacion.prototype.analizar = function (nodo) {
        var cantidad = nodo.childNode.length;
        switch (cantidad) {
            case 3:
                return this.operacion(nodo);
            case 2:
                return this.operacion2(nodo);
            case 1:
                return this.datos(nodo.childNode[0]);
        }
        throw new Error("error en analizar");
    };
    Operacion.prototype.operacion = function (nodo) {
        var operacion = nodo.childNode[1].term;
        switch (operacion) {
            case "'+'":
                return this.operarSuma(nodo.childNode[0], nodo.childNode[2]);
            case "'-'":
                return this.operarResta(nodo.childNode[0], nodo.childNode[2]);
            case "'*'":
                return this.operarMultiplicaion(nodo.childNode[0], nodo.childNode[2]);
            case "'/'":
                return this.operarDivicion(nodo.childNode[0], nodo.childNode[2]);
            case "'%'":
                return this.operarModulo(nodo.childNode[0], nodo.childNode[2]);
            case "'^'":
                return this.operarEleva(nodo.childNode[0], nodo.childNode[2]);
            case "'||'":
                return this.operarOr(nodo.childNode[0], nodo.childNode[2]);
            case "'&&'":
                return this.operarAnd(nodo.childNode[0], nodo.childNode[2]);
            case "'??'":
                return this.operarXor(nodo.childNode[0], nodo.childNode[2]);
            case "'=='":
                return this.operarIgual(nodo.childNode[0], nodo.childNode[2]);
            case "'!='":
                return this.operarNoIgual(nodo.childNode[0], nodo.childNode[2]);
            case "'<'":
                return this.operarMenorQue(nodo.childNode[0], nodo.childNode[2]);
            case "'<='":
                return this.operarMenorIgual(nodo.childNode[0], nodo.childNode[2]);
            case "'>'":
                return this.operarMayorQue(nodo.childNode[0], nodo.childNode[2]);
            case "'>='":
                return this.operarMayorIgual(nodo.childNode[0], nodo.childNode[2]);
        }
        this.analizador.newError("un error en el archivo Operacion.ts en el metodo operasicion no encotro un simbolo", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
        throw new Error("error en analizar");
    };
    Operacion.prototype.operacion2 = function (nodo) {
        var term = nodo.childNode[0].term;
        switch (term) {
            case "'-'":
                return this.invertirDato(this.analizar(nodo.childNode[1]));
            case "'!'":
                return this.negar(this.analizar(nodo.childNode[1]));
        }
        throw new Error("error en analizar");
    };
    Operacion.prototype.negar = function (arg0) {
        var v = arg0.etiquetaV;
        var f = arg0.etiquetaF;
        arg0.etiquetaV = f;
        arg0.etiquetaF = v;
        return arg0;
    };
    Operacion.prototype.invertirDato = function (arg0) {
        var t0 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.asignar("-1", t0), arg0.column, arg0.fila);
        //let t1 = this.analizador.newTemporal();
        var t2 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion("*", t0, arg0.valor, t2), arg0.column, arg0.fila);
        return new nodoOperacion_1.default(t2, arg0.tipo, arg0.column, arg0.fila);
    };
    Operacion.prototype.datos = function (nodo) {
        var term = nodo.term;
        switch (term) {
            case "NULL":
                return new nodoOperacion_2.default("nada", 35174492 + "", nodo.location.last_column, nodo.location.first_line);
            case "Datos":
                return this.resolverDatos(nodo);
        }
        throw new Error("error en analizar");
    };
    /**
     * Datos
     *: NUMBERLIST
     *| Identi
     *| STRINGLIST
     *| TRUE
     *| FALSE
     *;
     * @param nodo
     */
    Operacion.prototype.resolverDatos = function (nodo) {
        var term = nodo.childNode[0].term;
        var col = -1;
        var fil = -1;
        switch (term) {
            case "NUMBERLIST2":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                return new nodoOperacion_1.default(nodo.childNode[0].token, this.analizador.DOUBLE, col, fil);
            case "NUMBERLIST":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                return new nodoOperacion_1.default(nodo.childNode[0].token, this.analizador.INT, col, fil);
            case "CARACTER":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                return new nodoOperacion_1.default(nodo.childNode[0].token.charCodeAt(1) + "", this.analizador.CARACTER, col, fil);
            case "STRINGLIST":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                var cadena = this.cadena(nodo.childNode[0].token, nodo.childNode[0].location);
                return cadena;
            case "TRUE":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                var arg0 = new nodoOperacion_1.default("1", this.analizador.INT, col, fil);
                var arg1 = new nodoOperacion_1.default("1", this.analizador.INT, col, fil);
                var t = new comparacion_1.default(arg0, arg1, this.analizador, "==");
                return t.evaluar();
            case "FALSE":
                col = nodo.childNode[0].location.last_column;
                fil = nodo.childNode[0].location.first_line;
                var arg00 = new nodoOperacion_1.default("0", this.analizador.INT, col, fil);
                var arg10 = new nodoOperacion_1.default("1", this.analizador.INT, col, fil);
                var t0 = new comparacion_1.default(arg00, arg10, this.analizador, "==");
                return t0.evaluar();
            case "Identi":
                //col = nodo.childNode[0].location.first_line;
                //fil = nodo.childNode[0].location.last_column;
                var valor = this.analizador.variable.identi(nodo.childNode[0]);
                return valor;
        }
        throw new Error("error en analizar");
    };
    Operacion.prototype.cadena = function (cadena, location) {
        var t1 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.asignar("heap", t1), location.last_column, location.first_line);
        for (var index = 0; index < cadena.length; index++) {
            var element = cadena.charCodeAt(index);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", element + ""), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(), location.last_column, location.first_line);
        }
        this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", this.analizador.NULL), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(), location.last_column, location.first_line);
        var nodo = new nodoOperacion_1.default(t1, this.analizador.STRING, location.last_column, location.first_line);
        nodo.valor = t1;
        return nodo;
    };
    Operacion.prototype.getValor = function (arg0) {
        if (arg0.tipo == this.analizador.BOOLEANO) {
            var t0 = this.analizador.newTemporal();
            var es = this.analizador.newEtiqueta();
            /*para etiqueta verdadera */
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaV), arg0.column, arg0.fila);
            this.analizador.agregarCodigo(this.analizador.asignar("1", t0), arg0.column, arg0.fila);
            this.analizador.agregarCodigo(this.analizador.genSalto(es), arg0.column, arg0.fila); //salto de salida
            /*para etiqueta falsa */
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaF), arg0.column, arg0.fila);
            this.analizador.agregarCodigo(this.analizador.asignar("0", t0), arg0.column, arg0.fila);
            var am = new Array();
            am.push(es);
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(am), arg0.column, arg0.fila);
            return t0;
        }
        else {
            return arg0.valor;
        }
    };
    return Operacion;
}());
exports.default = Operacion;
//# sourceMappingURL=operacion.js.map