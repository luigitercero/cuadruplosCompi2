
import Nodo from './nodo'
import Inter from './itermedio'
import Exp from './exp/operacion/Exp'
import Variable from './variable/variable'

import Metodo from './metodo/metodo'
import Clase from './tablaSimbolos/clase'
import Estructura from './tablaSimbolos/estructura/Estructuras'
import Recoleccion from '../precompilacion/recoleccion'
import Class from './clase/clase'
import Cuerpo from './metodo/cuerpo'
import nodoOperacion from './exp/operacion/nodoOperacion';
import Estruct from './estrucura/estructura'
export default class Analizador extends Inter {
    public exp: Exp;
    public variable: Variable;
    public metodoA: Metodo;
    public clas: Class;
    public claseA: Clase;
    public clases: Clase[];
    public cuerpo: Cuerpo;
    private estructura: Estruct;
    public Estructuras: Estructura;

    constructor() {
        super();
        this.exp = new Exp(this);
        this.variable = new Variable(this);
        this.metodoA = new Metodo(this);
        this.cuerpo = new Cuerpo(this);
        this.claseA = new Clase("", 0);
        this.clases = new Array<Clase>();
        this.Estructuras = new Estructura();
        this.clas = new Class(this);
        this.estructura = new Estruct(this);
        let n = new casteos();
        this.preAnalisis(n.casteo);
    }

    getCodEstruct() {
        return this.estructura;
    }


    getAmbito() {

        let ambito: any = [];

        for (let index = 0; index < this.claseA.tabla.Lista.length; index++) {
            const element = this.claseA.tabla.Lista[index];
            for (let index = 0; index < element.ambito.length; index++) {
                let datos = []
                const simbolo = element.ambito[index];
                datos.push(simbolo.getNombre());
                datos.push(simbolo.getTipo());
                datos.push(simbolo.getVisibilidad());
                datos.push(simbolo.getTamanio());
                datos.push(simbolo.possAmbito);
                datos.push(simbolo.linea);
                datos.push("ptr");
                datos.push(this.claseA.nombre);
                ambito.push(datos)
            }
        }

        for (let index = 0; index < this.claseA.tabla.esto.ambito.length; index++) {
            const simbolo = this.claseA.tabla.esto.ambito[index];
            let datos = []
            datos.push(simbolo.getNombre());
            datos.push(simbolo.getTipo());
            datos.push(simbolo.getVisibilidad());
            datos.push(simbolo.getTamanio());
            datos.push(simbolo.possAmbito);
            datos.push(simbolo.linea);
            datos.push("heap");
            datos.push(this.claseA.nombre);
            ambito.push(datos)

        }

        return ambito;
    }

    public recorrer(nodo: Nodo, espacio: string) {
        if (nodo.term == "Datos") {
            console.log(espacio + nodo.term);
            console.log(espacio + " " + nodo.childNode[0].token);
        } else {
            console.log(espacio + nodo.term);
            nodo.childNode.forEach(element => {
                this.recorrer(element, espacio + " ");
            });
        }


    }
    public recorrerArbol(nodo: Nodo) {
        console.log(this.claseA.nombre);
        console.log(nodo.term);
        nodo.childNode.forEach(element => {
            this.recorrer(element, " ");
        });
    }
    verTodasLasClases() {

        console.log("---------Obeservando clasese-----------")
        for (let index = 0; index < this.clases.length; index++) {
            let element = this.clases[index];
            element.verMetodosDeClase();
            element.verVariable();

        }

        console.log("---------Fin Obeservando clasese-----------")

    }
    buscarClase(nombre: string, navegar?: nodoOperacion): Clase {
        for (let index = 0; index < this.clases.length; index++) {
            let element = this.clases[index];
            if (element.nombre == nombre.toLowerCase()) {
                element.verVariable();
                return element;
            }
        }
        if (navegar == null) {
            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre, 0, 0)
        } else {

            throw this.newError("no se pudo encontrar la clase con el nombre de " + nombre + "variable", navegar.fila, navegar.column);
        }
    }
    verClaseA() {
        console.log("---------Obeservando ClaseA-----------")
        this.claseA.verMetodosDeClase();
        this.claseA.verVariable();
        console.log("---------Fin Obeservando ClaseA-----------")

    }
    /**
     * inicio
     *: Encabezado EOF
     *;
     * @param nodo 
     */

    public preAnalisis(data: any) {
        let archivo = data;
        this.puntero = false;
        var p = require('../compilador/Parser with parser/Codigo3D/codigoFinal');
        let hola = p.parse(/*prueba7 + prueba8*/ archivo);
        let nodo = new Nodo(p.parser.treeparser.raiz);
        this.inicio(nodo);
        this.puntero = true;
    }
    public inicio(nodo: Nodo): boolean {
        let recoleccion: Recoleccion = new Recoleccion(this);

        recoleccion.analizar(nodo);
        //this.verTodasLasClases();
        let nombre: string = nodo.childNode[0].term;
        switch (nombre) {
            case "inicio":
                this.log("inicio a inicio: " +
                    this.inicio(nodo.childNode[0])
                );
                return true;
            case "Encabezado":
                this.log("inicio a Encabezado: " +
                    this.encabezado(nodo.childNode[0]));
                return true;
        }
        return false;
    }

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
    public encabezado(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;
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
    }

    /**
     * este va elegir si creaa una estrucrura o crea una clase proviene del encabezado
     *    | Encabezado CrearClase
     *    | Encabezado Estruct
     * @param nodo 
     */
    public CE(nodo: Nodo): boolean {
        let nombre: string = nodo.term;
        switch (nombre) {
            case "CrearClase":
                this.log("CE a creaClase: " +
                    this.clas.crearClase(nodo));
                return true;
            case "Estruct":

                return true;
        }
        return false;
    }


    /**
     * Import
     *: Importar 
     *| Import Importar
     *;
     * @param nodo 
     */
    public import(nodo: Nodo): boolean {
        let nombre: string = nodo.childNode[0].term;

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
                return true
        }
        return false;
    }

    /**
     * Importar
     *: IMPORTAR '(' STRING_LIT ')' ';'
     *;
     * @param nodo 
     */
    public importar(nodo: Nodo): boolean {
        this.log("vamo a importar");
        return true;
    }
}



class casteos {

    public casteo: string;

    constructor() {
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
            "}"

    }
}