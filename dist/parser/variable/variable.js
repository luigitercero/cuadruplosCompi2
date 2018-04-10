"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var obtenerDireccion_1 = __importDefault(require("./obtenerDireccion"));
var Variable = /** @class */ (function () {
    function Variable(analizdor) {
        this.analizador = analizdor;
    }
    /**
        *
        * @param nodo Identi
        *:var
        *|getMetodo
        *|Identi '->' var
        *|Identi '->' getMetodo
        *|Identi '.' var
        *|Identi '.' getMetodo
        *| THIS '.' VAR
        *;
        */
    Variable.prototype.identi = function (nodo) {
        var term = nodo.childNode[0].term;
        var variable;
        var valor;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                return variable;
            case "getMetodo":
            case "Identi":
                return this.identi(nodo.childNode[0]);
        }
        throw this.analizador.newError("error en identi", 0, 0);
    };
    /**
     * var
     *: ID
     *| var '[' e ']'
     * ;
     * @param nodo // nodo var
     * @param tipo //tipo
     * @param visibilidad  "visibilidad"
     */
    Variable.prototype.var = function (nodo) {
        var term = nodo.childNode[0].term;
        var nombre;
        var location;
        var simbolo;
        var valor;
        var variable;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                location = nodo.childNode[0].location;
                simbolo = this.analizador.claseA.buscarSimbolo(nombre);
                //Obtener direccion de la variable
                variable = this.analizador.variable.obtenerDirVariable(nombre, location.first_line, location.last_column);
                variable.addLocation(location);
                return variable;
            case "var":
                variable = this.var(nodo.childNode[0]);
                variable.tam = variable.tam + 1;
                valor = this.analizador.exp.analizar(nodo.childNode[2]);
                this.validarArreglo(variable, valor);
                return variable;
        }
        throw this.analizador.newError("error al intetar recorrer var en operaciones", 0, 0);
    };
    /**
        *
        * @param variable es un nodo temporal para evaluar la variable
        * @param possArreglo contienen la posicion para poder escribir el arreglo
        */
    Variable.prototype.validarArreglo = function (variable, possArreglo) {
        var fila = variable.location.first_line;
        var column = variable.location.last_column;
        if (possArreglo.tipo == this.analizador.INT) {
            if (variable.tam == 1) {
                variable.dir = this.getVAlorD(variable);
                variable.done = "heap";
                variable.temporal = possArreglo.valor;
            }
            else {
                var temp3 = this.getTamDim(variable, variable.tam);
                var temp4 = this.analizador.newTemporal();
                var temp5 = this.analizador.newTemporal();
                /**variamble.temp tiene el valor anterior de la posicion de arreglo donde se quiere acceder
                 * temp3 tiene el tam;o que la dimension tiene anterios
                */
                //aqui ando mapeando el arreglo
                this.analizador.agregarCodigo(this.analizador.genOperacion("*", variable.temporal, temp3, temp4), fila, column);
                //aqui mapeo la segunda posicion 
                this.analizador.agregarCodigo(this.analizador.genOperacion("+", temp4, possArreglo.valor, temp5), fila, column);
                variable.temporal = temp5;
            }
        }
        else {
            this.analizador.newError("error al querer acceder posicion de memoria ", fila, column);
        }
    };
    /**
     * obtiene desde el heap el tama;o de una dimesion del arreglo
     * @param variable
     * @param dim
     */
    Variable.prototype.getTamDim = function (variable, dim) {
        var possHeap = variable.dir;
        var temp1 = this.analizador.newTemporal();
        var temp2 = this.analizador.newTemporal();
        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.log("estoy en la dimension " + dim + " de la variable " + variable.simbolo.getNombre());
        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", variable.dir, dim - 1 + "", temp1), variable.location.first_line, variable.location.last_column);
        //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1, temp2), variable.location.first_line, variable.location.last_column);
        this.analizador.log("se obtuvo el tama;o de la dimension " + (dim - 1) + " de la variable " + variable.simbolo.getNombre() + " en " + temp2);
        return temp2;
    };
    Variable.prototype.getValorVariable = function (varibale) {
        var cuadruplo = "";
        if (varibale.tam > 0) {
            var temp = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+', varibale.dir, varibale.temporal, temp);
            varibale.temporal = temp;
            this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);
            var temp1 = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+', temp, varibale.tam + 1 + "", temp1);
            varibale.temporal = temp1;
            this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);
        }
        return this.getVAlorD(varibale);
    };
    /**
     * obtiene el valor de la posicion a partir de una direccion
     * @param varibale
     */
    Variable.prototype.getVAlorD = function (varibale) {
        var cuadruplo = "";
        var temp = this.analizador.newTemporal();
        if (varibale.done == "heap") {
            cuadruplo = this.analizador.getEnHeap(varibale.temporal, temp);
        }
        else if (varibale.done == "pila") {
            cuadruplo = this.analizador.getEnPila(varibale.temporal, temp);
        }
        this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);
        return temp;
    };
    Variable.prototype.moverseEnArreglo = function (variable, possArreglo) {
        var temp1 = this.analizador.newTemporal();
        var temp2 = this.analizador.newTemporal();
        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", variable.dir, possArreglo.valor, temp1), variable.location.first_line, variable.location.last_column);
        //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1, temp2), variable.location.first_line, variable.location.last_column);
        return temp2;
    };
    Variable.prototype.evaluarAsignacionasignarValor = function (simbolo) {
        var nodo = simbolo.valor.getNodo();
        var nombre = nodo.term;
        var location = simbolo.valor.location;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        var temp;
        var pos;
        switch (nombre) {
            case "e":
                var resultado = this.analizador.exp.analizar(nodo);
                if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                    var val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                    var temp_1 = this.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column);
                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp_1.temporal, val), location.first_line, location.last_column);
                    this.analizador.agregarCodigo(this.analizador.genComentario("fin de agregacion de valor a la variable " + simbolo.getNombre()), location.first_line, location.last_column); // es un comentario
                    return true;
                }
                else {
                    throw this.analizador.newError("error por compatibilidad de tipos ", location.first_line, location.last_column);
                }
            case "Nuevo":
                throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column);
            case "Lista":
                throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column);
        }
        this.analizador.newError("asinganr valor", location.first_line, location.last_column);
        return false;
    };
    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama
     * @param columna columna donde se llama
     */
    Variable.prototype.obtenerDirVariable = function (nombre, linea, columna) {
        var simbolo = this.analizador.claseA.tabla.buscarEnPila(nombre);
        if (simbolo != null) {
            var temp = this.getDirEnPila(nombre, linea, columna, simbolo);
            return new obtenerDireccion_1.default(temp, "pila", simbolo);
        }
        else {
            simbolo = this.analizador.claseA.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                var temp = this.getDirEnHeap(nombre, linea, columna, simbolo);
                return new obtenerDireccion_1.default(temp, "heap", simbolo);
            }
        }
        throw this.analizador.newError("no es posible encontrar la variable", linea, columna);
    };
    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama
     * @param columna columna donde se llama
     */
    Variable.prototype.obtenerValorVariable = function (nombre, linea, columna) {
        var simbolo = this.analizador.claseA.tabla.buscarEnPila(nombre);
        var dir;
        if (simbolo != null) {
            dir = this.getDirEnPila(nombre, linea, columna, simbolo);
            var temp = this.analizador.newTemporal();
            this.analizador.agregarCodigo(this.analizador.getEnPila(dir, temp), columna, linea);
            return new obtenerDireccion_1.default(dir, "pila", simbolo);
        }
        else {
            simbolo = this.analizador.claseA.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                dir = this.getDirEnHeap(nombre, linea, columna, simbolo);
                var temp = this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.getEnHeap(dir, temp), columna, linea);
                return new obtenerDireccion_1.default(dir, "heap", simbolo);
            }
        }
        throw this.analizador.newError("no es posible encontrar la variable", linea, columna);
    };
    Variable.prototype.getDirEnPila = function (nombre, linea, columna, simbolo) {
        var temp;
        var pos;
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion('+', "ptr", simbolo.possAmbito + "", pos), linea, columna); //buscar en pila el this
        return pos;
    };
    Variable.prototype.getDirEnHeap = function (nombre, linea, columna, simbolo) {
        this.analizador.agregarCodigo(this.analizador.genComentario("obteniendo direccion de memoria de variable " + simbolo.getNombre()), linea, columna); // es un comentario
        var temp;
        var pos;
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion('+', "ptr", "1", pos), linea, columna); //buscar en pila el this
        temp = this.analizador.newTemporal(); //temp contiene el dato en heap
        this.analizador.agregarCodigo(this.analizador.getEnPila(pos, temp), linea, columna); // valor en la pila en this
        var temp1 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion('+', temp, simbolo.possAmbito + "", temp1), linea, columna); //moverse en heap
        return temp1;
    };
    /**
     * Lista
     *: List '}'
     *;
    */
    Variable.prototype.lista = function (nodo, simbolo) {
        //this.list(simbolo)
    };
    /**
     *List
     *: '{' DefList
     *| List ',' DefList
     *;
    */
    Variable.prototype.list = function (nodo, simbolo) {
        var nombre = "";
        switch (nombre) {
            case "'{'":
            // this.defList(simbolo);
            case "List":
        }
    };
    /**
     *DefList
     *: e
     *| Lista
     *| Nuevo
     *;
    */
    Variable.prototype.defList = function (nodo, simbolo) {
    };
    return Variable;
}());
exports.default = Variable;
//# sourceMappingURL=variable.js.map