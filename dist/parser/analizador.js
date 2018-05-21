"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodo_1 = __importDefault(require("./nodo"));
var itermedio_1 = __importDefault(require("./itermedio"));
var Exp_1 = __importDefault(require("./exp/operacion/Exp"));
var variable_1 = __importDefault(require("./variable/variable"));
var metodo_1 = __importDefault(require("./metodo/metodo"));
var clase_1 = __importDefault(require("./tablaSimbolos/clase"));
var Estructuras_1 = __importDefault(require("./tablaSimbolos/estructura/Estructuras"));
var recoleccion_1 = __importDefault(require("../precompilacion/recoleccion"));
var clase_2 = __importDefault(require("./clase/clase"));
var cuerpo_1 = __importDefault(require("./metodo/cuerpo"));
var estructura_1 = __importDefault(require("./estrucura/estructura"));
var Analizador = /** @class */ (function (_super) {
    __extends(Analizador, _super);
    function Analizador() {
        var _this = _super.call(this) || this;
        _this.exp = new Exp_1.default(_this);
        _this.variable = new variable_1.default(_this);
        _this.metodoA = new metodo_1.default(_this);
        _this.cuerpo = new cuerpo_1.default(_this);
        _this.claseA = new clase_1.default("", 0);
        _this.clases = new Array();
        _this.Estructuras = new Estructuras_1.default();
        _this.clas = new clase_2.default(_this);
        _this.estructura = new estructura_1.default(_this);
        var n = new casteos();
        _this.preAnalisis(n.estrucutra);
        _this.preAnalisis(n.casteo);
        return _this;
    }
    Analizador.prototype.getCodEstruct = function () {
        return this.estructura;
    };
    Analizador.prototype.getAmbito = function () {
        var ambito = [];
        for (var index = 0; index < this.claseA.tabla.Lista.length; index++) {
            var element = this.claseA.tabla.Lista[index];
            for (var index_1 = 0; index_1 < element.ambito.length; index_1++) {
                var datos = [];
                var simbolo = element.ambito[index_1];
                datos.push(simbolo.getNombre());
                datos.push(simbolo.getTipo());
                datos.push(simbolo.getVisibilidad());
                datos.push(simbolo.getTamanio());
                datos.push(simbolo.possAmbito);
                datos.push(simbolo.linea);
                datos.push("ptr");
                datos.push(this.claseA.nombre);
                ambito.push(datos);
            }
        }
        for (var index = 0; index < this.claseA.tabla.esto.ambito.length; index++) {
            var simbolo = this.claseA.tabla.esto.ambito[index];
            var datos = [];
            datos.push(simbolo.getNombre());
            datos.push(simbolo.getTipo());
            datos.push(simbolo.getVisibilidad());
            datos.push(simbolo.getTamanio());
            datos.push(simbolo.possAmbito);
            datos.push(simbolo.linea);
            datos.push("heap");
            datos.push(this.claseA.nombre);
            ambito.push(datos);
        }
        return ambito;
    };
    Analizador.prototype.recorrer = function (nodo, espacio) {
        var _this = this;
        if (nodo.term == "Datos") {
            console.log(espacio + nodo.term);
            console.log(espacio + " " + nodo.childNode[0].token);
        }
        else {
            console.log(espacio + nodo.term);
            nodo.childNode.forEach(function (element) {
                _this.recorrer(element, espacio + " ");
            });
        }
    };
    Analizador.prototype.recorrerArbol = function (nodo) {
        var _this = this;
        console.log(this.claseA.nombre);
        console.log(nodo.term);
        nodo.childNode.forEach(function (element) {
            _this.recorrer(element, " ");
        });
    };
    Analizador.prototype.verTodasLasClases = function () {
        console.log("---------Obeservando clasese-----------");
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            element.verMetodosDeClase();
            element.verVariable();
        }
        console.log("---------Fin Obeservando clasese-----------");
    };
    Analizador.prototype.buscarClase = function (nombre, navegar) {
        for (var index = 0; index < this.clases.length; index++) {
            var element = this.clases[index];
            if (element.nombre == nombre.toLowerCase()) {
                element.verVariable();
                return element;
            }
        }
        if (navegar == null) {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0);
        }
        else {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre + "variable", navegar.fila, navegar.column);
        }
    };
    Analizador.prototype.verClaseA = function () {
        console.log("---------Obeservando ClaseA-----------");
        this.claseA.verMetodosDeClase();
        this.claseA.verVariable();
        console.log("---------Fin Obeservando ClaseA-----------");
    };
    /**
     * inicio
     *: Encabezado EOF
     *;
     * @param nodo
     */
    Analizador.prototype.preAnalisis = function (data) {
        var archivo = data;
        this.puntero = false;
        var p = require('../compilador/Parser with parser/Codigo3D/codigoFinal');
        var hola = p.parse(/*prueba7 + prueba8*/ archivo);
        var nodo = new nodo_1.default(p.parser.treeparser.raiz);
        this.inicio(nodo);
        this.puntero = true;
    };
    Analizador.prototype.inicio = function (nodo) {
        var recoleccion = new recoleccion_1.default(this);
        recoleccion.analizar(nodo);
        //this.verTodasLasClases();
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0]));
                return true;
            case "Encabezado":
                this.log("inicio a Encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * Encabezado
     *   : Import
     *   | CrearClase
     *   | Estruct//SE AGRAGO
     *   | Encabezado CrearClase
     *   | Encabezado Estruct
     *   ;
     *
     * @param nodo
     */
    Analizador.prototype.encabezado = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Encabezado":
                this.log("encabezado a encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.log("encabezado a crear Clase: " +
                    this.clas.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.log("encabezado a Import: " +
                    this.import(nodo.childNode[0]));
                return true;
        }
        return false;
    };
    /**
     * este va elegir si creaa una estrucrura o crea una clase proviene del encabezado
     *    | Encabezado CrearClase
     *    | Encabezado Estruct
     * @param nodo
     */
    Analizador.prototype.CE = function (nodo) {
        var nombre = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.log("CE a creaClase: " +
                    this.clas.crearClase(nodo));
                return true;
            case "Estruct":
                return true;
        }
        return false;
    };
    /**
     * Import
     *: Importar
     *| Import Importar
     *;
     * @param nodo
     */
    Analizador.prototype.import = function (nodo) {
        var nombre = nodo.childNode[0].term;
        switch (nombre) {
            case "Importar":
                this.log("import a importar: " +
                    this.importar(nodo.childNode[0]));
                return true;
            case "Import":
                this.log("import a import: " +
                    this.import(nodo.childNode[0]));
                this.log("import a importar: " +
                    this.importar(nodo.childNode[1]));
                return true;
        }
        return false;
    };
    /**
     * Importar
     *: IMPORTAR '(' STRING_LIT ')' ';'
     *;
     * @param nodo
     */
    Analizador.prototype.importar = function (nodo) {
        this.log("vamo a importar");
        return true;
    };
    return Analizador;
}(itermedio_1.default));
exports.default = Analizador;
var casteos = /** @class */ (function () {
    function casteos() {
        this.estrucutra = "clase  nodo35174492 {\n" +
            "    luigiTercero valor;\n" +
            "    entero index ;\n" +
            "    nodo35174492 siguiente;\n" +
            "    \n" +
            "    nodo35174492 (luigiTercero valor,entero index) {\n" +
            "        este.valor = valor;\n" +
            "        este.index = index;\n" +
            "        este.siguiente = nada;\n" +
            "    }\n" +
            "    \n" +
            "}\n" +
            "\n" +
            "clase lista {\n" +
            "    \n" +
            "    nodo35174492 raiz;\n" +
            "    entero cont;\n" +
            "    \n" +
            "    lista () {\n" +
            "        este.raiz = nada;\n" +
            "        este.cont = 0;\n" +
            "    }\n" +
            "    \n" +
            "    publico vacio insertar (luigiTercero elemento) {\n" +
            "        este.cont ++;\n" +
            "        nodo35174492 valor = nuevo nodo35174492(elemento,este.cont);\n" +
            "            \n" +
            "        si (este.raiz == nada ) \n" +
            "            es_verdadero {\n" +
            "                este.raiz = valor;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                nodo35174492 actual = raiz;\n" +
            "                repetir_mientras (actual.siguiente != nada) {\n" +
            "                actual = actual.siguiente;\n" +
            "                }\n" +
            "                actual.siguiente = valor;\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "    \n" +
            "    publico luigiTercero obtener (entero indice) {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "               repetir_mientras (actual.siguiente != nada) {\n" +
            "                    si (actual.index == indice)\n" +
            "                        es_verdadero {\n" +
            "                            retorno actual.valor;\n" +
            "                        }\n" +
            "                        es_falso {\n" +
            "                \n" +
            "                        }\n" +
            "                    fin-si\n" +
            "                  actual = actual.siguiente;\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico luigiTercero buscar (luigiTercero valor) {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "               repetir_mientras (actual.siguiente != nada) {\n" +
            "                    si (actual.valor == valor)\n" +
            "                        es_verdadero {\n" +
            "                            retorno actual.valor;\n" +
            "                        }\n" +
            "                        es_falso {\n" +
            "                \n" +
            "                        }\n" +
            "                    fin-si\n" +
            "                  actual = actual.siguiente;\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico vacio recorrer () {\n" +
            "     nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        \n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                imprimir(\"no hay nada en la lista\");\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                \n" +
            "                imprimir(actual.valor);\n" +
            "                repetir_mientras (actual.siguiente != nada) {\n" +
            "                    actual = actual.siguiente;\n" +
            "                   imprimir(actual.valor);\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "    \n" +
            "}\n" +
            "\n" +
            "clase Pila {\n" +
            "  nodo35174492 raiz;\n" +
            "    entero cont;\n" +
            "    \n" +
            "    pila () {\n" +
            "        este.raiz = nada;\n" +
            "        este.cont = 0;\n" +
            "    }\n" +
            "    \n" +
            "    publico vacio apilar (luigiTercero elemento) {\n" +
            "        este.cont ++;\n" +
            "        nodo35174492 valor = nuevo nodo35174492(elemento,este.cont);\n" +
            "            \n" +
            "        si (este.raiz == nada ) \n" +
            "            es_verdadero {\n" +
            "                este.raiz = valor;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                valor.siguiente = raiz;\n" +
            "                raiz = valor;\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "    \n" +
            "    publico luigiTercero obtener (entero indice) {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "               repetir_mientras (actual.siguiente != nada) {\n" +
            "                    si (actual.index == indice)\n" +
            "                        es_verdadero {\n" +
            "                            \n" +
            "                            retorno actual.valor;\n" +
            "                        }\n" +
            "                        es_falso {\n" +
            "                \n" +
            "                        }\n" +
            "                    fin-si\n" +
            "                  actual = actual.siguiente;\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico luigiTercero desapilar () {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                cont--;\n" +
            "                raiz = actual.siguiente;\n" +
            "                retorno actual.valor;\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico vacio recorrer () {\n" +
            "     nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        \n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                imprimir(\"no hay nada en la lista\");\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                \n" +
            "                imprimir(actual.valor);\n" +
            "                repetir_mientras (actual.siguiente != nada) {\n" +
            "                    actual = actual.siguiente;\n" +
            "                   imprimir(actual.valor);\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "\n" +
            "}\n" +
            "\n" +
            "\n" +
            "\n" +
            "clase cola {\n" +
            "  nodo35174492 raiz;\n" +
            "    entero cont;\n" +
            "    \n" +
            "    cola () {\n" +
            "        este.raiz = nada;\n" +
            "        este.cont = 0;\n" +
            "    }\n" +
            "    \n" +
            "    publico vacio encolar (luigiTercero elemento) {\n" +
            "        este.cont ++;\n" +
            "        nodo35174492 valor = nuevo nodo35174492(elemento,este.cont);\n" +
            "            \n" +
            "        si (este.raiz == nada ) \n" +
            "            es_verdadero {\n" +
            "                este.raiz = valor;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                nodo35174492 actual = raiz;\n" +
            "                repetir_mientras (actual.siguiente != nada) {\n" +
            "                actual = actual.siguiente;\n" +
            "                }\n" +
            "                actual.siguiente = valor;\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "    \n" +
            "    publico luigiTercero obtener (entero indice) {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "               repetir_mientras (actual.siguiente != nada) {\n" +
            "                    si (actual.index == indice)\n" +
            "                        es_verdadero {\n" +
            "                            \n" +
            "                            retorno actual.valor;\n" +
            "                        }\n" +
            "                        es_falso {\n" +
            "                \n" +
            "                        }\n" +
            "                    fin-si\n" +
            "                  actual = actual.siguiente;\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico luigiTercero desencolar () {\n" +
            "        nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                retorno nada;\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                cont--;\n" +
            "                raiz = actual.siguiente;\n" +
            "                retorno actual.valor;\n" +
            "            }\n" +
            "        fin-si\n" +
            "        retorno nada;\n" +
            "    }\n" +
            "    \n" +
            "    \n" +
            "    publico vacio recorrer () {\n" +
            "     nodo35174492 actual ;\n" +
            "        actual  = raiz;\n" +
            "        \n" +
            "        si (actual == nada ) \n" +
            "            es_verdadero {\n" +
            "                imprimir(\"no hay nada en la lista\");\n" +
            "            }\n" +
            "            es_falso {\n" +
            "                \n" +
            "                imprimir(actual.valor);\n" +
            "                repetir_mientras (actual.siguiente != nada) {\n" +
            "                    actual = actual.siguiente;\n" +
            "                   imprimir(actual.valor);\n" +
            "                }\n" +
            "            }\n" +
            "        fin-si\n" +
            "    }\n" +
            "\n" +
            "}\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n" +
            "\n";
        this.casteo =
            "clase casteos58592714deluisazurdia {\n" +
                "\n" +
                "    publico  caracter [] convertirAcadena (decimal a) {\n" +
                "        entero divisor = 0;\n" +
                "        entero residuo = 0;\n" +
                "        entero primero = 1;\n" +
                "        entero residuo2 = 0;\n" +
                "        caracter numero[16];\n" +
                "        entero poss = 0;\n" +
                "       \n" +
                "        repetir_mientras (a >= 10) {\n" +
                "            repetir_mientras (a > 10) {\n" +
                "                divisor++;\n" +
                "                a = a - 10;\n" +
                "            }\n" +
                "            si (primero == 1) \n" +
                "                es_verdadero {\n" +
                "                    repetir_mientras (a >= 1) {\n" +
                "                        a--;\n" +
                "                        residuo++;\n" +
                "                    }\n" +
                "                    si (a != 0) \n" +
                "                        es_verdadero {\n" +
                "                        a = a * 10;\n" +
                "                        repetir_mientras (a >= 1) {\n" +
                "                            repetir_mientras (a >= 1) {\n" +
                "                                residuo2++;\n" +
                "                                a--;\n" +
                "                            }\n" +
                "                            numero[poss] = residuo2+48;\n" +
                "                            poss++;\n" +
                "                            a = a * 10;\n" +
                "                            residuo2 = 0;\n" +
                "                        }\n" +
                "                         numero[poss] = '.';\n" +
                "                         poss++;\n" +
                "                        } es_falso {\n" +
                "\n" +
                "                        }\n" +
                "                    fin-si\n" +
                "                    primero = 0;\n" +
                "                    a = residuo;\n" +
                "                }es_falso {\n" +
                "\n" +
                "                }\n" +
                "            fin-si\n" +
                "             numero[poss] = a + 48;\n" +
                "             poss++;\n" +
                "            a = divisor;\n" +
                "            divisor = 0;\n" +
                "        }\n" +
                "        numero[poss] = a + 48;\n" +
                "        poss++;\n" +
                "        entero countCarac = poss;\n" +
                "        entero c = 0;\n" +
                "        entero temp = countCarac;\n" +
                "        caracter salida[16];\n" +
                "        repetir_mientras (c < countCarac) {\n" +
                "         salida[c] = numero[temp - 1];\n" +
                "         temp--;\n" +
                "         c++;\n" +
                "        }\n" +
                "        retorno salida;\n" +
                "    }\n" +
                "    publico caracter  [] convertirAcadena (entero a) {\n" +
                "        entero divisor = 0;\n" +
                "        entero residuo = 0;\n" +
                "        entero primero = 1;\n" +
                "        caracter numero[16];\n" +
                "        entero poss = 0;\n" +
                "        entero dividendo = 1 ;\n" +
                "        \n" +
                "        repetir_mientras (a > dividendo) {\n" +
                "            dividendo = dividendo *10;\n" +
                "        }\n" +
                "        si (dividendo>a) \n" +
                "            es_verdadero {\n" +
                "             dividendo = dividendo /10;\n" +
                "             }\n" +
                "            es_falso {\n" +
                "            }\n" +
                "        fin-si\n" +
                "        \n" +
                "       repetir_mientras (1<dividendo) {\n" +
                "            repetir_mientras (a >=dividendo) {\n" +
                "               divisor++;\n" +
                "                a = a - dividendo;\n" +
                "            }\n" +
                "            \n" +
                "            si( divisor > 10 ) \n" +
                "                es_verdadero {\n" +
                "                  dividendo = dividendo /10;\n" +
                "                } \n" +
                "                es_falso {\n" +
                "                	dividendo = dividendo /10;\n" +
                "                    numero[poss] = divisor + 48;\n" +
                "                    poss++;\n" +
                "                    divisor = 0;\n" +
                "                }\n" +
                "            \n" +
                "            fin-si\n" +
                "        }\n" +
                "       \n" +
                "        numero[poss] = a +48;\n" +
                "        poss++;\n" +
                "        retorno numero;\n" +
                "    }\n" +
                "    \n" +
                "    \n" +
                "    publico entero convertirAEntero (caracter a[16]) {\n" +
                "        entero conta = 0; \n" +
                "        entero decena = 1;\n" +
                "        entero char = 0;\n" +
                "        entero numero = 0 ;\n" +
                "        repetir_Mientras(a[conta] != nada) {\n" +
                "            char = a[conta]; \n" +
                "            si (char > 47 && char < 58 ) \n" +
                "                es_verdadero {\n" +
                "                    numero = numero* decena + (char - 48) ;\n" +
                "                    decena = 10;\n" +
                "                }\n" +
                "                es_falso {\n" +
                "                    si (a[conta] == '.') \n" +
                "                        es_verdadero {\n" +
                "                            romper;\n" +
                "                        }\n" +
                "                        es_falso {\n" +
                "                           numero = numero + char;\n" +
                "                        }\n" +
                "                    fin-si\n" +
                "                }\n" +
                "            fin-si\n" +
                "            conta++;\n" +
                "        }\n" +
                "        retorno numero;\n" +
                "    }\n" +
                "    \n" +
                "publico vacio concatenar (caracter destino[25],caracter valor[25]) {\n" +
                "        entero n0 = 0;\n" +
                "        entero n1 = 0;\n" +
                "        Repetir_Mientras (destino[n0] != nada){\n" +
                "            n0++;\n" +
                "        \n" +
                "        }\n" +
                "        \n" +
                "        \n" +
                "        Repetir_Mientras (valor[n1] != nada){\n" +
                "        si (destino.tamanio> n0+1) \n" +
                "               es_verdadero {\n" +
                "                           \n" +
                "               }\n" +
                "               es_falso {\n" +
                "      	            imprimir (\"se ha pasado del tamanio del arreglo\");\n" +
                "                   destino[n0] = nada;\n" +
                "               }\n" +
                "         fin-si\n" +
                "            destino[n0] = valor[n1];\n" +
                "            n0++;\n" +
                "            n1++;\n" +
                "        }\n" +
                "      destino[n0+1] = nada;\n" +
                "        si (destino.tamanio> n0+1) \n" +
                "      es_verdadero {\n" +
                "      \n" +
                "      }\n" +
                "      es_falso {\n" +
                "      	imprimir (\"se ha pasado del tamanio del arreglo\");\n" +
                "      }\n" +
                "      fin-si\n" +
                "\n" +
                "}\n" +
                "\n" +
                "publico vacio concatenar (caracter destino[25],caracter valor[25],entero numero) {\n" +
                "       \n" +
                "     concatenar(destino,valor);\n" +
                "     concatenar(destino,convertirAcadena(numero));\n" +
                "    \n" +
                "}\n" +
                "\n" +
                "publico vacio concatenar (caracter destino[25],caracter valor[25],decimal numero) {\n" +
                "       \n" +
                "     concatenar(destino,valor);\n" +
                "     concatenar(destino,convertirAcadena(numero));\n" +
                "    \n" +
                "}\n" +
                "\n" +
                "publico vacio concatenar (caracter destino[25],caracter valor[25],booleano numero) {\n" +
                "    concatenar(destino,valor);\n" +
                "    si (numero)\n" +
                "        es_verdadero {\n" +
                "        concatenar(destino,\"verdadero\");\n" +
                "        }\n" +
                "        es_falso {\n" +
                "        concatenar(destino,\"falso\");\n" +
                "        }\n" +
                "    fin-si\n" +
                "     \n" +
                "     \n" +
                "    \n" +
                "}" +
                "publico vacio concatenar (caracter destino[25],entero valor) {\n" +
                "    concatenar(destino,convertirAcadena(valor));\n" +
                "}" +
                "}";
    }
    return casteos;
}());
//# sourceMappingURL=analizador.js.map