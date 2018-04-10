
import Nodo from './nodo'
import Inter from './itermedio'
import Exp from './exp/operacion/Exp'
import Variable from './variable/variable'

import Metodo from './metodo/metodo'
import Clase from './tablaSimbolos/clase'
import Recoleccion from '../precompilacion/recoleccion'
import Class from './clase/clase'

export default class Analizador extends Inter {
    public exp:Exp;
    public variable:Variable;
    public metodoA:Metodo;
    public clas:Class;
    public claseA:Clase;
    public clases:Clase[];
    constructor(){
        super();    
        this.exp = new Exp(this);
        this.variable = new Variable(this);
        this.metodoA = new Metodo(this);
        this.claseA = new Clase("",0);
        this.clases = new Array<Clase>();
        this.clas = new Class(this);
    }
verTodasLasClases(){

    console.log("---------Obeservando clasese-----------")
    for (let index = 0; index < this.clases.length; index++) {
        let element = this.clases[index];
        element.verMetodosDeClase();
        element.verVariable();
        
    }

    console.log("---------Fin Obeservando clasese-----------")

}
buscarClase(nombre:string):Clase{
    for (let index = 0; index < this.clases.length; index++) {
        let element = this.clases[index];
        if (element.nombre == nombre){
            element.verVariable();
            return element;
        
        }
    }
    this.newError("no se pudo encontrar la clase con el nombre de "+nombre,0,0)
    return new Clase("",0);
}   
verClaseA(){
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
    public inicio (nodo:Nodo):boolean{
        let recoleccion:Recoleccion = new Recoleccion(this);
        recoleccion.analizar(nodo);
        //this.verTodasLasClases();
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "inicio":
                this.log( "inicio a inicio: "+
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
    public encabezado (nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "Encabezado":
                this.log ("encabezado a encabezado: "+
                this.encabezado(nodo.childNode[0]));
                this.CE(nodo.childNode[1]);
                return true;
            case "CrearClase":
                this.log ("encabezado a crear Clase: "+
                this.clas.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.log ("encabezado a Import: "+
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
        let nombre:string = nodo.term;   
        switch(nombre){
            case "CrearClase":
                this.log("CE a creaClase: "+
                this.clas.crearClase(nodo));
                return true;
            case  "Estruct":
                this.logPorCompletar("estruct")
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
    public import(nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
       
        switch(nombre){
            case "Importar":
                this.log("import a importar: "+
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
    public importar(nodo:Nodo):boolean{
        this.log("vamo a importar");
        return true;
    }
   
 
    /**
     * Navegar
     *   : var '.'
     *   | var '->'
     *   | getMetodo '.'
     *   | getMetodo '->'
     *   | Navegar var '.'
     *   | Navegar  getMetodo '.'
     *   | Navegar var '->'
     *   | Navegar  getMetodo '->'
     *   ;
     * @param nodo 
     */
    public navegar(nodo:Nodo):boolean{
        return false;
    }
    /**
     *  Control
     *   : If1
     *   | If2
     *   | Switch
     *   | While
     *   | Do_While
     *   | Repeat_Until
     *   | For
     *   | Loop
     *   | Count
     *   | Doble_Condicion
     *   ;
     * @param nodo
     */
    public control(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Cuerpo: '{'Cuerpo1 '}'
     *   | '{' '}'
     *   ;
     * @param nodo 
     */
    public cuerpo(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Cuerpo1
     *   :Cuerpo1 CuerpoMetodo
     *   |CuerpoMetodo
     *   ;
     * @param nodo 
     */
    public curpo1(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Branching
     *   : BREAK
     *   | BREAK ID
     *   | CONTINUE
     *   | RETURN
     *   | RETURN e
     *   ;
     * @param nodo 
     */
    public branching(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Expresion
     *  : '(' e ')'
     *  ;
     * @param nodo 
     */
    public expresion(nodo:Nodo):boolean{
        return false;
    }
    /**
     * getMetodoZ 
     *   : Navegar  getMetodo  
     *   | getMetodo 
     *   ;
     * @param nodo 
     */
    public getMetodoZ(nodo:Nodo):boolean{
        return false;
    }
    /**
     * getMetodo
     *   : ID '(' getParametro
     *   | Primitivas '(' getParametro
     *   | Tipo '(' getParametro
     *   ;
     * @param nodo 
     */
    public getMetodo(nodo:Nodo):boolean{
        return false;
    }
    /**
     * getParametro 
     *   : ParametroM ')'
     *   | ')'
     *   ;
     * @param nodo 
     */
    public getParametro(nodo:Nodo):boolean{
        return false;
    }
    /**
     * ParametroM 
     *   : ParametroM ',' e
     *   | ParametroM ',' Tipo
     *   | e
     *   | Tipo
     *   ;
     * @param nodo 
     */
    public parametroM(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Primitivas
     *   :IMPRIMIR
     *   |CONCATENAR
     *   |CONVERTIRCADENA
     *   |CONVERTIRENTERO
     *   |CREARPUNTERO
     *   |OBTERNERDIRECCION
     *   |RESERVAMEMORIA
     *   |CONSULTARTAMANIO
     *   |TECLADO
     *   ;
     * @param nodo 
     */
    public primitivas(nodo:Nodo):boolean{
        return false;
    }
    /**
     * e
     *   : e '+' e
     *   | e '-' e
     *   | e '*' e
     *   | e '/' e
     *   | e '%' e
     *   | e '^' e
     *   | '-' e 
     *   | '(' e ')'
     *   | e '<' e
     *   | e '>' e
     *   | e '<=' e
     *   | e '>=' e
     *   | e '==' e
     *   | e '!=' e
     *   | e '&&' e
     *   | e '||' e
     *   | e '??' e
     *   | '!' e
     *   | Datos
     *   | NULL 
     *   ;
     * @param nodo 
     */
    public e(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Lista
     *   : List '}'
     *   ;
     * @param nodo 
     */
    public lista(nodo:Nodo):boolean{
        return false;
    }
    /**
     * List
     *   : '{' DefList
     *   | List ',' DefList
     *   ;
     * @param nodo 
     */
    public list(nodo:Nodo):boolean{
        return false;
    }
    /**
     * Datos 
     *   : NUMBERLIST
     *   | Identi
     *   | STRINGLIST  
     *   | TRUE
     *   | FALSE
     *   ;
     * @param nodo 
     * @param Nodo 
     */
    public datos(nodo:Nodo):boolean{
        return false;
    }

    /**
     * Identi
     *   :var
     *   |getMetodo
     *   |Identi '->' var
     *   |Identi '->' getMetodo
     *   |Identi '.' var
     *   |Identi '.' getMetodo
     *   ;   
     */
    public identi(nodo:Nodo):boolean{
        return false;
    }
}