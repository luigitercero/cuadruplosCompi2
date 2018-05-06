import Analizador from '../analizador';
import Nodo from '../nodo';
import Operador from '../exp/operacion/operacion'
import Simbolo from '../tablaSimbolos/simbolo'

import nodoOperacion from '../exp/operacion/nodoOperacion';
import { error } from 'util';
import Clase from '../tablaSimbolos/clase';
import Dir from './obtenerDireccion'
import Location from '../location';
import Metodo from '../tablaSimbolos/metodo';
import NodoNavegar from './nodoNavegar';
export default class Variable {

    public analizador: Analizador;
    constructor(analizdor: Analizador) {
        this.analizador = analizdor;
    }

    /**
        * 
        * @param nodo 
        * Identi
        *:var
        *|getMetodo
        *|Identi '->' var
        *|Identi '->' getMetodo
        *|Identi '.' var
        *|Identi '.' getMetodo
        *| THIS '.' VAR
        *;   
        */
    identi(nodo: Nodo): nodoOperacion {
        let term = nodo.childNode[0].term
        let variable: Dir;
        let valor;
        let location;
        let navegar;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                return this.gerVal(variable);
            case "getMetodo":
                return this.getmetodo(nodo.childNode[0])
            case "Identi":
                let temp = this.analizador.claseA;
                let identi = this.identi(nodo.childNode[0]);
                let op = this.identiObjec(nodo.childNode[2], identi, nodo.childNode[1].location);
                this.analizador.claseA = temp;
                return op;
            case "ESTE":
                variable = this.analizador.variable.obtenerValorVariable("este", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                navegar = new NodoNavegar(variable, nodo.childNode[1].term);
                location = nodo.childNode[0].location;
                variable.addLocation(nodo.childNode[0].location);
                variable = this.analizador.variable.var(nodo.childNode[2], navegar.variable.val);
                return this.gerVal(variable);
        }
        throw this.analizador.newError("error en identi", 0, 0);
    }

    /**
   *Navegar
   *: var '.'
   *| var '->'
   *| this .
   *| getMetodo '.'
   *| getMetodo '->'
   *| Navegar var '.'
   *| Navegar  getMetodo '.'
   *| Navegar var '->'
   *| Navegar  getMetodo '->'
   *| 
   *;
  */
    public navegar(nodo: Nodo): nodoOperacion {
        let term = nodo.childNode[0].term
        let variable: Dir;
        let navegarNodo: NodoNavegar;
        let op;
        let valor;
        let location;
        let navegar;
        switch (term) {
            case "var":
                variable = this.analizador.variable.var(nodo.childNode[0]);
                return this.analizador.variable.gerVal(variable);
            case "ESTE":
                variable = this.analizador.variable.obtenerDirVariable("este", nodo.childNode[0].location.first_line, nodo.childNode[0].location.last_column);
                location = nodo.childNode[1].location;

                variable.addLocation(nodo.childNode[0].location);
                return this.analizador.variable.gerVal(variable);
            case "getMetodo":
                return this.analizador.variable.getmetodo(nodo.childNode[0])
            case "Navegar":
                let temp = this.analizador.claseA;
                let identi = this.navegar(nodo.childNode[0]);
                let op = this.analizador.variable.identiObjec(nodo.childNode[1], identi, nodo.childNode[2].location);
                this.analizador.claseA = temp;
                return op;

        }

        throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", 0, 0);
    }
    calcularTamanio(identi: nodoOperacion, location: Location): nodoOperacion {
        let t1 = this.analizador.newTemporal()
        this.analizador.agregarCodigo(
            this.analizador.getEnHeap(identi.valor, t1), location.last_column, location.first_line
        );
        let resultado = new nodoOperacion(t1, this.analizador.INT, location.last_column, location.first_line);
        return resultado;
    }

    /**
     * verifica que en identi venga un va o un object
     * @param nodo 
     * @param identi 
     */
    public identiObjec(nodo: Nodo, identi: nodoOperacion, location: Location): nodoOperacion {
        if (nodo.childNode[0].token.toLowerCase() == "tamanio" && identi.simbolo.tam > 0) {
            return this.calcularTamanio(identi, location);
        } else {
            if (nodo.term == "var") {
                this.analizador.claseA = this.analizador.buscarClase(identi.tipo);
                return this.gerVal(this.analizador.variable.var(nodo, identi.valor));
            }
            else {
                if (nodo.term == "getMetodo") {
                    let t1 = this.analizador.newTemporal();
                    let temp = this.analizador.claseA.tabla.ptr;
                    temp++;
                    let colocarse_this = this.analizador.genOperacion("+", "ptr", temp + "", t1);
                    let guardar_aputandor_This = this.analizador.saveEnPila(t1, identi.valor);
                    this.analizador.agregarCodigo(colocarse_this, location.last_column, location.first_line);
                    this.analizador.agregarCodigo(colocarse_this, location.last_column, location.first_line);
                    return this.getmetodo(nodo, identi);
                }

            }
        }
        throw this.analizador.newError("no se si es variable o metodo", 0, 0)

    }
    gerVal(variable: Dir): nodoOperacion {
        let val = this.analizador.variable.getValorVariable(variable);
        let operador = new nodoOperacion(val, variable.simbolo.getTipo(), variable.location.last_column, variable.location.first_line);
        operador.simbolo = variable.simbolo;
        return operador
    }

    /**este deberia jalar retotno */
    getmetodo(nodo: Nodo, esto?: nodoOperacion): nodoOperacion {
        let l = nodo.childNode[0].location;
        let clase = this.analizador.claseA
        let metodo: Metodo = this.analizador.cuerpo.getMetodo(nodo, esto);//aqui es donde escribe el codigo
        this.analizador.claseA = clase;
        let tam = this.analizador.claseA.tabla.ptr;
        let t1 = this.analizador.newTemporal();
        let t2 = this.analizador.newTemporal();
        let mov = this.analizador.genOperacion("+", "ptr", tam + "", t1);
        let getR = this.analizador.getEnPila(t1, t2);

        this.analizador.agregarCodigo(mov, l.last_column, l.first_line);
        this.analizador.agregarCodigo(getR, l.last_column, l.first_line);

        return new nodoOperacion(t2, metodo.getTipo(), l.last_column, l.first_line);
    }
    /**
     * obtengo la direccion de la variable
     * var  
     *: ID
     *| var '[' e ']' 
     * ;
     * @param nodo // nodo var
     * @param tipo //tipo
     * @param visibilidad  "visibilidad"
     */
    var(nodo: Nodo, inicio?: string): Dir {
        let term = nodo.childNode[0].term;
        let nombre: string;
        let location;
        //let simbolo
        let valor: nodoOperacion;
        let variable: Dir;
        switch (term) {
            case "ID":
                nombre = nodo.childNode[0].token;
                location = nodo.childNode[0].location;
                // simbolo  = this.analizador.claseA.buscarSimbolo(nombre,inicio,location);
                //Obtener direccion de la variable
                variable = this.analizador.variable.obtenerDirVariable(nombre, location.first_line, location.last_column, inicio);
                variable.addLocation(location);
                return variable;
            case "var":
                variable = this.var(nodo.childNode[0], inicio);
                variable.tam = variable.tam + 1;
                valor = this.analizador.exp.analizar(nodo.childNode[2]);
                this.validarArreglo(variable, valor);
                return variable;
        }
        throw this.analizador.newError("error al intetar recorrer var en operaciones", 0, 0);
    }

    /**
     * esto se usa cuando se esta declarando un arreglo
     * @param variable es un nodo temporal para evaluar la variable
     * @param possArreglo contienen la posicion para poder escribir el arreglo
     */
    validarArreglo(variable: Dir, possArreglo: nodoOperacion) {
        let fila = variable.location.first_line;
        let column = variable.location.last_column;
        if (possArreglo.tipo == this.analizador.INT) {
            if (variable.tam == 1) {

                variable.dir = this.getVAlorD(variable);
                variable.done = "heap";
                variable.temporal = possArreglo.valor;

            } else {

                let temp3 = this.getTamDim(variable, variable.tam);
                let temp4 = this.analizador.newTemporal();
                let temp5 = this.analizador.newTemporal();

                /**variamble.temp tiene el valor anterior de la posicion de arreglo donde se quiere acceder
                 * temp3 tiene el tam;o que la dimension tiene anterios
                */
                //aqui ando mapeando el arreglo
                this.analizador.agregarCodigo(this.analizador.genOperacion("*", variable.temporal, temp3, temp4),
                    column, fila
                );
                //aqui mapeo la segunda posicion 
                this.analizador.agregarCodigo(this.analizador.genOperacion("+", temp4, possArreglo.valor, temp5),
                    column, fila
                );
                variable.temporal = temp5;
            }
        } else {
            this.analizador.newError("error al querer acceder posicion de memoria ", fila, column);

        }

    }
    /**
     * obtiene desde el heap el tama;o de una dimesion del arreglo
     * @param variable 
     * @param dim 
     */
    getTamDim(variable: Dir, dim: number) {
        let possHeap = variable.dir;

        let temp1 = this.analizador.newTemporal();
        let temp2 = this.analizador.newTemporal();

        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.log("estoy en la dimension " + dim + " de la variable " + variable.simbolo.getNombre());

        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", variable.dir, dim - 1 + "", temp1),
            variable.location.last_column, variable.location.first_line
        );

        //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1, temp2),
            variable.location.last_column, variable.location.first_line, );
        this.analizador.log("se obtuvo el tama;o de la dimension " + (dim - 1) + " de la variable " + variable.simbolo.getNombre() + " en " + temp2);

        return temp2;

    }

    getValorVariable(varibale: Dir) {
        let cuadruplo: string = "";
        if (varibale.tam > 0) {
            let temp = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+', varibale.dir, varibale.temporal, temp);
            varibale.temporal = temp;
            this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);
            let temp1 = this.analizador.newTemporal();
            cuadruplo = this.analizador.genOperacion('+', temp, varibale.tam + 1 + "", temp1);
            varibale.temporal = temp1;
            varibale.val = temp1;
            this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);

        }

        return this.getVAlorD(varibale);
    }
    /**
     * obtiene el valor de la posicion a partir de una direccion
     * @param varibale 
     */
    getVAlorD(varibale: Dir) {

        let cuadruplo: string = "";

        let temp = this.analizador.newTemporal();
        if (varibale.done == "heap") {
            cuadruplo = this.analizador.getEnHeap(
                varibale.temporal, temp
            );
        } else if (varibale.done == "pila") {
            cuadruplo = this.analizador.getEnPila(
                varibale.temporal, temp
            );
        } else {
            cuadruplo = this.analizador.getEnHeap(
                varibale.done, temp
            );

        }
        this.analizador.agregarCodigo(cuadruplo, varibale.location.last_column, varibale.location.first_line);
        return temp;
    }
    private moverseEnArreglo(variable: Dir, possArreglo: nodoOperacion) {
        let temp1 = this.analizador.newTemporal();
        let temp2 = this.analizador.newTemporal();

        //me muevo en la heap a posicion en donde esta el tama;o del arreglo
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", variable.dir, possArreglo.valor, temp1),
            variable.location.last_column, variable.location.first_line
        );

        //aqui obtengo el valor de la posicion dentro de la heap tengo el tama;o que necesito de la dimension
        this.analizador.agregarCodigo(this.analizador.getEnHeap(temp1, temp2),
            variable.location.last_column, variable.location.first_line);

        return temp2;
    }
    /**
     * AGREGANDO VALOR A VARIABLES DESPUES DE DECLARARSE
     */

    public incializar(simbolo: Simbolo, location: Location, inicio?: string) {
        let tipo = simbolo.getTipo();
        let escritura = "";

        if (simbolo.tam > 0) {
            return;
        }
        let temp = this.obtenerDirVariable(simbolo.getNombre(), location.first_line, location.last_column, inicio);
        switch (tipo) {
            case this.analizador.INT:
                this.setValVariable(temp, new nodoOperacion("0", simbolo.getTipo(),
                    location.last_column, location.first_line), location, inicio);
                break;
            case this.analizador.DOUBLE:
                this.setValVariable(temp, new nodoOperacion("0", simbolo.getTipo(),
                    location.last_column, location.first_line), location, inicio);
                break;
            case this.analizador.CARACTER:
                this.setValVariable(temp, new nodoOperacion("0", simbolo.getTipo(),
                    location.last_column, location.first_line), location, inicio);
                break;
            default:
                this.setValVariable(temp, new nodoOperacion(this.analizador.NULL, simbolo.getTipo(),
                    location.last_column, location.first_line), location, inicio);
                break;
        }

    }
    public evaluarAsignacionasignarValor(simbolo: Simbolo) {
        let nodo: Nodo = simbolo.valor.getNodo();
        let nombre = nodo.term;
        let location = simbolo.valor.location;
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        let temp: string;
        let pos: string
        switch (nombre) {

            case "e":
                let resultado: nodoOperacion = this.analizador.exp.analizar(nodo);
                if (this.analizador.exp.evaluarTipo(resultado.tipo, simbolo.getTipo())) {
                    let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                    let temp = this.obtenerDirVariable(simbolo.getNombre(),
                        location.first_line, location.last_column);

                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.temporal, val),
                        location.last_column, location.first_line);

                    this.analizador.agregarCodigo(this.analizador.genComentario
                        ("fin de agregacion de valor a la variable " + simbolo.getNombre())
                        , location.last_column, location.first_line);// es un comentario
                    return true;

                } else {
                    throw this.analizador.newError("error por compatibilidad de tipos ", location.first_line, location.last_column)
                }

            case "Nuevo":
                throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column)

            case "Lista":
                throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas", location.first_line, location.last_column)

        }
        this.analizador.newError("asinganr valor", location.first_line, location.last_column);
        return false;

    }

    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama 
     * @param columna columna donde se llama
     */
    obtenerDirVariable(nombre: string, linea: number, columna: number, inicio?: string): Dir {
        if (inicio === undefined) {
            let simbolo: Simbolo | null = this.analizador.claseA.tabla.buscarEnPila(nombre);
            if (simbolo != null) {
                let temp = this.getDirEnPila(nombre, linea, columna, simbolo);
                return new Dir(temp, "pila", simbolo);
            } else {
                simbolo = this.analizador.claseA.tabla.buscarEnHeap(nombre);
                if (simbolo != null) {
                    let temp = this.getDirEnHeap(nombre, linea, columna, simbolo);
                    return new Dir(temp, "heap", simbolo);
                }
            }
        } else {
            let simbolo;
            simbolo = this.analizador.claseA.tabla.buscarEnHeap(nombre);
            if (simbolo != null) {
                let temp = this.getDirRelativo(nombre, linea, columna, simbolo, inicio);
                return new Dir(temp, "heap", simbolo);
            }

        }
        throw this.analizador.newError("no es posible encontrar la variable " + nombre + " ", linea, columna);
    }

    /**
     * se cambia el valor de cualquier onda
     * @param simbolo es el simbolo que se va a cambirle el valor
     * @param resultado  es el valor que se quiere ene el simbolo
     * @param location  en donde se declaro 
     */
    setValVariable(simbolo: Dir, resultado: nodoOperacion, location: Location, inicio?: string) {
        return this.setVariableFiltro(simbolo, resultado, location, inicio);
    }

    private setVariableFiltro(simbolo: Dir, resultado: nodoOperacion, location: Location, inicio?: string) {
        if (simbolo.simbolo.getTipo() == resultado.tipo) {
            return this.setVariableNormal(simbolo, resultado, location, inicio);
        } else if (resultado.tipo == this.analizador.STRING && simbolo.simbolo.getTipo() == this.analizador.CARACTER) {

            return this.asignarCadenaAArreglo(simbolo, resultado, location);
        } else if (simbolo.simbolo.getTipo() == this.analizador.DOUBLE && resultado.tipo == this.analizador.INT) {
            return this.setVariableNormal(simbolo, resultado, location, inicio);
        } else if (resultado.tipo == this.analizador.NULL) {
            return this.setVariableNormal(simbolo, resultado, location, inicio);
        }
        throw this.analizador.newError("error al asignar tipos " + simbolo.simbolo.getNombre() + ": "
            + simbolo.simbolo.getTipo() + "  no es compatible con el valor de: " + resultado.tipo
            , location.first_line, location.last_column)
    }

    private asignarCadenaAArreglo(simbolo: Dir, arreglo: nodoOperacion, location: Location, inicio?: string) {
        let dim = simbolo.simbolo.tam;
        let dirArreglo = this.getValorVariable(simbolo);
        let val = this.analizador.exp.getValor(arreglo);
        let t1 = this.analizador.newTemporal();
        /*posicionarse al inicio del arreglo */

        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", (dim + 1) + "", dirArreglo, t1),
            location.last_column, location.first_line
        );

        let t2 = this.analizador.newTemporal();
        let lv = this.analizador.newEtiqueta();
        let lf = this.analizador.newEtiqueta();
        let ls = this.analizador.newEtiqueta();

        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(ls), arreglo.column, arreglo.fila
        );
        /*obtener valor de la variable */
        this.analizador.agregarCodigo(
            this.analizador.getEnHeap(arreglo.valor, t2), arreglo.column, arreglo.fila
        );
        /**escribiendo if papara seber si es nulo */
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("!=", t2, this.analizador.NULL, lv), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(lf), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lv), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap(t1, t2), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", t1, 1 + "", t1), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genOperacion("+", arreglo.valor, 1 + "", arreglo.valor), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.genSalto(ls), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.escribirEtiquetaS(lf), arreglo.column, arreglo.fila
        );
        this.analizador.agregarCodigo(
            this.analizador.saveEnHeap(t1, this.analizador.NULL), arreglo.column, arreglo.fila
        );

    }

    private setVariableNormal(simbolo: Dir, resultado: nodoOperacion, location: Location, inicio?: string) {
        let val = this.analizador.exp.getValor(resultado);
        let comentario = this.analizador.genComentario("se gurdara un valor a la variable " + simbolo.simbolo.getNombre())
        if (inicio === undefined) {
            if (simbolo.done == "pila") {
                this.analizador.agregarCodigo(this.analizador.saveEnPila(simbolo.dir, val) + comentario, location.last_column, location.first_line);
                return true;
            } else {

                if (simbolo.done == "heap") {
                    let t = this.validarPossdeArreglo(simbolo, location);
                    this.analizador.agregarCodigo(this.analizador.saveEnHeap(t, val) + comentario, location.last_column, location.first_line);
                    return true;
                }
            }
        } else {
            let t = this.validarPossdeArreglo(simbolo, location);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(t, val) + comentario, location.last_column, location.first_line);
            return true;
        }
        throw this.analizador.newError("error al cambiar variables " + simbolo.simbolo.getNombre() + " ", location.first_line, location.last_column);
    }

    /**
     * esto se usa cuando se quiere agregar un nuevo valor a un arreglo sabiendo la poss exacta
     * @param simbolo simbolo
     * @param location 
     */
    private validarPossdeArreglo(simbolo: Dir, location: Location) {
        if (simbolo.simbolo.tam > 0) {
            let t1 = this.analizador.newTemporal();
            let codigoPP = this.analizador.genOperacion("+", simbolo.dir, simbolo.temporal, t1);
            let t2 = this.analizador.newTemporal();
            let codigoPP2 = this.analizador.genOperacion("+", t1, (simbolo.tam + 1) + "", t2);
            this.analizador.agregarCodigo(codigoPP, location.last_column, location.first_line);
            this.analizador.agregarCodigo(codigoPP2, location.last_column, location.first_line);
            return t2;
        } else {
            return simbolo.dir
        }
    }

    /**
     * obtener y escribir el temporal de la posicion en memoria del objeto
     * retorna el temporal donde apunta
     * @param nombre nombre de la variable
     * @param linea linea donde se llama 
     * @param columna columna donde se llamanombre
     */
    obtenerValorVariable(nombre: string, linea: number, columna: number, inicio?: string): Dir {
        let comentario = this.analizador.genComentario("obteniendo valor de " + nombre);
        if (inicio !== null) {
            let simbolo: Simbolo | null = this.analizador.claseA.tabla.buscarEnPila(nombre);
            let dir
            if (simbolo != null) {
                dir = this.getDirEnPila(nombre, linea, columna, simbolo);
                let temp = this.analizador.newTemporal();
                this.analizador.agregarCodigo(this.analizador.getEnPila(dir, temp) + comentario, columna, linea);
                let v = new Dir(dir, "pila", simbolo);
                v.done = temp;
                v.val = temp
                return v;
            } else {
                simbolo = this.analizador.claseA.tabla.buscarEnHeap(nombre);
                if (simbolo != null) {
                    dir = this.getDirEnHeap(nombre, linea, columna, simbolo);
                    let temp = this.analizador.newTemporal();
                    this.analizador.agregarCodigo(this.analizador.getEnHeap(dir, temp) + comentario, columna, linea);
                    new Dir(dir, "heap", simbolo);
                    let v = new Dir(dir, "heap", simbolo);
                    v.done = temp;
                    v.val = temp
                    return v;
                }
            }
        } else {

        }

        throw this.analizador.newError("no es posible encontrar la variable", linea, columna);
    }


    private getDirEnPila(nombre: string, linea: number, columna: number, simbolo: Simbolo) {
        let temp: string;
        let pos: string
        let comentario = this.analizador.genComentario("obteniendo en pila el sibolo de " + nombre);
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+', "ptr", simbolo.possAmbito + "", pos) + comentario,
            columna, linea);//buscar en pila el this
        return pos
    }

    private getDirRelativo(nombre: string, linea: number, columna: number, simbolo: Simbolo, realitivo: string) {
        let temp: string;
        let pos: string
        //escribir esto si no esta en ambito local pero si existe en heap
        let comentario = this.analizador.genComentario
            ("obteniendo direccion de memoria de variable " + simbolo.getNombre())
        pos = this.analizador.newTemporal();
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+', realitivo, simbolo.possAmbito + "", pos) + comentario,
            columna, linea);//buscar en pila el this
        return pos
    }
    private getDirEnHeap(nombre: string, linea: number, columna: number, simbolo: Simbolo) {

        this.analizador.agregarCodigo(this.analizador.genComentario
            ("obteniendo direccion de memoria de variable en heap " + simbolo.getNombre())
            , columna, linea);// es un comentario

        let temp: string;
        let pos: string
        //escribir esto si no esta en ambito local pero si existe en heap
        pos = this.analizador.newTemporal();
        let comentario = this.analizador.genComentario("obteniendo en la pila this ");
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+', "ptr", "1", pos),
            columna, linea);//buscar en pila el this

        temp = this.analizador.newTemporal();//temp contiene el dato en heap
        this.analizador.agregarCodigo(this.analizador.getEnPila(pos, temp) + comentario,
            columna, linea);// valor en la pila en this
        let temp1 = this.analizador.newTemporal();
        comentario = this.analizador.genComentario("obteniendo valor de  " + nombre);
        this.analizador.agregarCodigo(
            this.analizador.genOperacion('+', temp, simbolo.possAmbito + "", temp1),
            columna, linea);//moverse en heap
        return temp1;
    }


    /**
     * Lista
     *: List '}'
     *;
    */
    lista(nodo: Nodo, simbolo: Simbolo) {
        //this.list(simbolo)
    }
    /**
     *List
     *: '{' DefList
     *| List ',' DefList
     *;
    */
    list(nodo: Nodo, simbolo: Simbolo) {
        let nombre = "";
        switch (nombre) {
            case "'{'":
            // this.defList(simbolo);
            case "List":
            // this.list(simbolo)
            //   this.defList(simbolo);
        }
    }

    /**
     *DefList
     *: e
     *| Lista
     *| Nuevo
     *;
    */
    private defList(nodo: Nodo, simbolo: Simbolo) {

    }

    public agregarDimAHeap(variable: nodoOperacion, val: nodoOperacion, location: any) {
        if (variable.simbolo.tam == 0) {
            /**
             * tengo que revisar las dimension dentroo del heap por que estas se estan perdinedo 
             * 
             */
            this.analizador.salidaConsola("iniciado variable con tama;o 0");
            this.analizador.agregarCodigo(this.analizador.saveEnPila(variable.simbolo.possAmbito + "", "heap"), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genComentario("saltando la primera poscion"), location.last_column, location.first_line)
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
            //escribe el valor en el heap del primer tama;o
            return this.dimension1(variable, val, location);
        } else {

            return this.dimensionAny(variable, val, location)
        }
    }

    /**
     * esto funciona para la primera dimension
     * @param variable 
     * @param val 
     * @param location 
     */
    private dimension1(variable: nodoOperacion, val: nodoOperacion, location: any) {
        this.analizador.salidaConsola("escribe una dimension");
        this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", val.valor), location.last_column, location.first_line);
        this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
        variable.temp = val.valor;
        variable.simbolo.addTam(1);
    }
    /**
     * esto fucniona para el resto dde fudimensiones
     * @param variable 
     * @param val 
     * @param location 
     */
    private dimensionAny(variable: nodoOperacion, val: nodoOperacion, location: any) {

        if (val.tipo == this.analizador.INT) {
            this.analizador.salidaConsola("agregando otro tama;");
            this.analizador.agregarCodigo(this.analizador.saveEnHeap("heap", val.valor), location.last_column, location.first_line);
            this.analizador.agregarCodigo(this.analizador.genOperacion("+", "heap", "1", "heap"), location.last_column, location.first_line);
            let CrearTam = this.analizador.newTemporal();
            //en esta etapa estoy reservando el tama;o real que estara tomando el arreglo en el futrua
            this.analizador.agregarCodigo(this.analizador.genOperacion("*", variable.temp, val.valor, CrearTam), location.last_column, location.first_line);
            variable.temp = CrearTam;
            variable.simbolo.addTam(1);
            return variable;
        } else {
            this.analizador.newError("no se pudo evaluar el tipo", location.first_line, location.last_column);
        }
    }


    public agregarDimAHeapGLOBAL(variable: nodoOperacion, val: nodoOperacion, location: any) {
        if (variable.simbolo.tam == 0) {

            //OBTENGO LA POSICION
            let temp = this.analizador.variable.obtenerDirVariable(variable.simbolo.getNombre(),
                variable.simbolo.linea, 0);
            this.analizador.agregarCodigo(this.analizador.saveEnHeap(temp.dir, "heap"),
                0, variable.simbolo.linea);
            this.analizador.agregarCodigo(this.analizador.siguiLibreHeap(), location.last_column, location.first_line);
            //escribe el valor en el heap del primer tama;o
            return this.dimension1(variable, val, location);
        } else {
            return this.dimensionAny(variable, val, location)
        }
    }


}