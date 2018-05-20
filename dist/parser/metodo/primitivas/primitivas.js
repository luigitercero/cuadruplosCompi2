"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var nodoOperacion_1 = __importDefault(require("../../exp/operacion/nodoOperacion"));
var imprimir_1 = __importDefault(require("./imprimir"));
var concatenar_1 = __importDefault(require("./concatenar"));
var Primitivas = /** @class */ (function () {
    function Primitivas(analizador) {
        this.analizador = analizador;
        this.imprimir = new imprimir_1.default(analizador);
        this.concatenar = new concatenar_1.default(analizador);
    }
    /**
     * Primitivas
     * :IMPRIMIR
     * |CONCATENAR
     * |CONVERTIRCADENA
     * |CONVERTIRENTERO
     * |CREARPUNTERO
     * |OBTERNERDIRECCION
     * |RESERVAMEMORIA
     * |CONSULTARTAMANIO
     * |TECLADO
     * ;
     */
    Primitivas.prototype.analizar = function (metodo, varible, location) {
        switch (metodo) {
            case "IMPRIMIR":
                this.imprimir.imprimir(varible);
                break;
            case "CONCATENAR":
                this.concatenar.ejecutar(varible);
                break;
            case "CONVERTIRCADENA":
            case "CONVERTIRENTERO":
            case "CREARPUNTERO":
            case "OBTERNERDIRECCION":
            case "RESERVAMEMORIA":
            case "CONSULTARTAMANIO":
            case "TECLADO":
                this.TECLADO(metodo, varible, location);
                break;
        }
    };
    Primitivas.prototype.TECLADO = function (metodo, parametoM, location) {
        var tam = this.analizador.claseA.tabla.ptr;
        var t1 = this.analizador.newTemporal();
        this.ambitoSimulado(tam + 0, t1, location);
        this.retorno(t1, location);
        this.ambitoSimulado(tam + 2, t1, location);
        this.Salida(parametoM, t1, location);
        this.ambitoSimulado(tam + 1, t1, location);
        this.input(t1, location);
        this.ambitoSimulado(tam + 3, t1, location);
        this.saveTipo(parametoM[1].simbolo);
        this.tipoAPila(t1, this.saveTipo(parametoM[1].simbolo) + "", location);
        this.aumentarAmbito(tam, location);
        this.escribirTeclado(location);
        this.disminuirAmbito(tam, location);
        this.ambitoSimulado(tam + 1, t1, location);
        var t2 = this.analizador.newTemporal();
        // let t3 = this.analizador.newTemporal();
        this.agregarValor(t1, t2, location);
        this.agregarValorAsimbolos(parametoM, t2, location);
    };
    Primitivas.prototype.agregarValorAsimbolos = function (parametoM, t2, location) {
        var simbolo = parametoM[1].simbolo;
        var dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column);
        switch (simbolo.getTipo()) {
            case this.analizador.CARACTER:
                if (simbolo.tam > 0) {
                    // let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                    var valor_1 = new nodoOperacion_1.default(t2, this.analizador.STRING, location.last_column, location.first_line);
                    this.analizador.variable.setVariableFiltro(dir, valor_1, location);
                    return 3;
                }
                else {
                    this.analizador.agregarCodigo(this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line);
                    //let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                    var valor_2 = new nodoOperacion_1.default(t2, this.analizador.CARACTER, location.last_column, location.first_line);
                    this.analizador.variable.setVariableFiltro(dir, valor_2, location);
                    return 2;
                }
            case this.analizador.DOUBLE:
                this.analizador.agregarCodigo(this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line);
                // let dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column)
                var valor = new nodoOperacion_1.default(t2, this.analizador.DOUBLE, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 1;
            case this.analizador.INT:
                this.analizador.agregarCodigo(this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line);
                dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column);
                valor = new nodoOperacion_1.default(t2, this.analizador.INT, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 0;
            case this.analizador.BOOLEANO:
                this.analizador.agregarCodigo(this.analizador.getEnHeap(t2, t2), location.last_column, location.first_line);
                dir = this.analizador.variable.obtenerDirVariable(parametoM[1].simbolo.getNombre(), location.first_line, location.last_column);
                valor = new nodoOperacion_1.default(t2, this.analizador.BOOLEANO, location.last_column, location.first_line);
                this.analizador.variable.setVariableFiltro(dir, valor, location);
                return 5;
            default:
                return -1;
        }
    };
    Primitivas.prototype.saveTipo = function (simbolo) {
        switch (simbolo.getTipo()) {
            case this.analizador.CARACTER:
                if (simbolo.tam > 0) {
                    return 3;
                }
                else {
                    return 2;
                }
            case this.analizador.DOUBLE:
                return 1;
            case this.analizador.INT:
                return 0;
            case this.analizador.BOOLEANO:
                return 5;
            default:
                return -1;
        }
    };
    Primitivas.prototype.agregarValor = function (t1, t2, location) {
        this.analizador.agregarCodigo(this.analizador.getEnPila(t1, t2), location.last_column, location.first_line);
    };
    Primitivas.prototype.escribirTeclado = function (location) {
        this.analizador.agregarCodigo("call, , ,$_in_value", location.last_column, location.first_line);
    };
    Primitivas.prototype.retorno = function (t1, location) {
        var coment = this.analizador.genComentario("retorno que no se usa");
        var agregarValor = this.analizador.saveEnPila(t1, "0");
        this.analizador.agregarCodigo(agregarValor + coment, location.last_column, location.first_line);
    };
    Primitivas.prototype.tipoAPila = function (t1, tipo, location) {
        var coment = this.analizador.genComentario("tipo Objeto");
        var agregarValor = this.analizador.saveEnPila(t1, tipo);
        this.analizador.agregarCodigo(agregarValor, location.last_column, location.first_line);
    };
    Primitivas.prototype.input = function (t1, location) {
        var coment = this.analizador.genComentario("posicion de la entrada");
        var agregarValor = this.analizador.saveEnPila(t1, "heap");
        this.analizador.agregarCodigo(agregarValor, location.last_column, location.first_line);
    };
    Primitivas.prototype.Salida = function (parametoM, t1, location) {
        var agregarValor = "";
        var coment = this.analizador.genComentario("posiscion de arreglo de salida");
        if (parametoM[0].tipo == this.analizador.STRING) {
            var valor = this.analizador.exp.crearArregloString(parametoM[0]);
            agregarValor = this.analizador.saveEnPila(t1, valor);
        }
        else {
            agregarValor = this.analizador.saveEnPila(t1, parametoM[0].valor);
        }
        this.analizador.agregarCodigo(agregarValor + coment, location.last_column, location.first_line);
    };
    Primitivas.prototype.ambitoSimulado = function (tam, temporal, location) {
        var coment = this.analizador.genComentario("subir en ambito sumulado");
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", tam + "", temporal) + coment, location.last_column, location.first_line);
    };
    Primitivas.prototype.aumentarAmbito = function (tam, location) {
        var coment = this.analizador.genComentario("aumentar ambito");
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
    };
    Primitivas.prototype.disminuirAmbito = function (tam, location) {
        var coment = this.analizador.genComentario("disminuir ambito");
        this.analizador.agregarCodigo(this.analizador.genOperacion("-", "ptr", tam + "", "ptr") + coment, location.last_column, location.first_line);
    };
    return Primitivas;
}());
exports.default = Primitivas;
//# sourceMappingURL=primitivas.js.map