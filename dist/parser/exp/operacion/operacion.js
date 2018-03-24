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
        if (a0.tipo == 0)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF), a0.column, a0.fila); //agregnaod etiqueta falsa
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == 0) {
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaV), a0.column, a0.fila); //agregnaod etiqueta verdadera
            var l5 = this.analizador.newEtiqueta();
            var l6 = this.analizador.newEtiqueta();
            this.analizador.agregarCodigo(a1.valor + "," + l5, a1.column, a1.fila);
            //this.analizador.agregarCodigo(a0.etiquetaV+","+ l6 +":",a0.column,a0.fila);//agregnaod etiqueta verdadera
            var res = new nodoOperacion_2.default("", 0, a0.column, a0.fila);
            res.addEtiquetaV(a1.etiquetaV);
            res.addEtiquetaV(l6);
            res.addEtiquetaF(a1.etiquetaF);
            res.addEtiquetaF(l5);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarAnd = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        if (a0.tipo == 0)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaV), a0.column, a0.fila); //agregnaod etiqueta verdadera
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == 0) {
            var res = new nodoOperacion_2.default("", 0, a0.column, a0.fila);
            res.addEtiquetaV(a1.etiquetaV);
            res.addEtiquetaF(a0.etiquetaF);
            res.addEtiquetaF(a1.etiquetaF);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarOr = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        if (a0.tipo == 0)
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF), a0.column, a0.fila); //agregnaod etiqueta verdadera
        else
            this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
        var a1 = this.analizar(arg1);
        if (a1.tipo == 0) {
            var res = new nodoOperacion_2.default("", 0, a0.column, a0.fila);
            res.addEtiquetaV(a0.etiquetaV);
            res.addEtiquetaV(a1.etiquetaV);
            res.addEtiquetaF(a1.etiquetaF);
            return res;
        }
        else
            throw this.analizador.newError("no es un operrador boleano", a0.column, a0.fila);
    };
    Operacion.prototype.operarEleva = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "^");
        return op.evaluar();
    };
    Operacion.prototype.operarModulo = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "%");
        return op.evaluar();
    };
    Operacion.prototype.operarDivicion = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "/");
        return op.evaluar();
    };
    Operacion.prototype.operarMultiplicaion = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "*");
        return op.evaluar();
    };
    Operacion.prototype.operarResta = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "-");
        return op.evaluar();
    };
    Operacion.prototype.operarSuma = function (arg0, arg1) {
        var a0 = this.analizar(arg0);
        var a1 = this.analizar(arg1);
        var op = new suma_1.default(a0, a1, this.analizador, "+");
        return op.evaluar();
    };
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
        this.analizador.logError("un error en el archivo Operacion.ts en el metodo operasicion no encotro un simbolo");
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
                return new nodoOperacion_2.default("nada", 35124492, nodo.last_column, nodo.location.first_line);
                ;
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
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                return new nodoOperacion_1.default(nodo.childNode[0].token, 2, col, fil);
            case "NUMBERLIST":
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                return new nodoOperacion_1.default(nodo.childNode[0].token, 1, col, fil);
            case "CARACTER":
                col = nodo.childNode[1].location.first_line;
                fil = nodo.childNode[1].location.last_column;
                return new nodoOperacion_1.default(nodo.childNode[0].token.charAt(0), 3, col, fil);
            case "STRINGLIST":
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                return new nodoOperacion_1.default(nodo.childNode[0].token, 4, col, fil);
            case "TRUE":
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                var arg0 = new nodoOperacion_1.default("1", 1, col, fil);
                var arg1 = new nodoOperacion_1.default("1", 1, col, fil);
                var t = new comparacion_1.default(arg0, arg1, this.analizador, "==");
                return t.evaluar();
            case "FALSE":
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                var arg00 = new nodoOperacion_1.default("0", 1, col, fil);
                var arg10 = new nodoOperacion_1.default("1", 1, col, fil);
                var t0 = new comparacion_1.default(arg00, arg10, this.analizador, "==");
                return t0.evaluar();
            case "Identi":
                col = nodo.childNode[0].location.first_line;
                fil = nodo.childNode[0].location.last_column;
                this.analizador.logPorCompletar("falta obterner datos de la tabla de simbolos");
                return new nodoOperacion_2.default("35174492", 35174492, col, fil);
        }
        throw new Error("error en analizar");
    };
    return Operacion;
}());
exports.default = Operacion;
//# sourceMappingURL=operacion.js.map