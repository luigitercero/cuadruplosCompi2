import SymTable from './parser/symboTable'
import Nodo from './parser/nodo'
import Inter from './parser/itermedio'
import Exp from './parser/exp/operacion/Exp'
import Variable from './parser/variable/variable'
export default class Analizador extends Inter {
    public exp:Exp;
    public variable:Variable;

    constructor(){
        super();
        this.exp = new Exp(this);
        this.variable = new Variable(this);
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
                this.crearClase(nodo));
                return true;
            case  "Estruct":
                this.logPorCompletar("estruct")
                return true;
        }
    return false;
    }


    /**
     * inicio
     *: Encabezado EOF
     *;
     * @param nodo 
     */
    public inicio (nodo:Nodo):boolean{
        
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
                this.crearClase(nodo.childNode[0]));
                return true;
            case "Import":
                this.log ("encabezado a Import: "+
                this.import(nodo.childNode[0]));
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
     * CrearClase
     *: Clase '}'
     *;
     * @param nodo 
     */
    public crearClase (nodo:Nodo):boolean{
        let nombre:string =nodo.childNode[0].term;
        switch(nombre){
            case "CrearClase":
                this.log("crearClase a crearClase: "+
                this.crearClase(nodo.childNode[0]));
                return true;
            case "Clase":
                this.log("crearClase a Clase: "+ 
                this.clase(nodo.childNode[0]));
                return true;
        }
        return false;
    }
    /**
     * Clase
     *: CLASE ID Herencia
     *| Clase CuerpoClase
     *;
     * @param nodo 
     */
    public clase(nodo:Nodo):boolean{
        let nombre:string =nodo.childNode[0].term;
        switch(nombre){
            case "CLASE":
                this.logPorCompletar("clase a tabla de simbolos");
                this.log("crear clase " + nodo.childNode[1].token );
                this.herencia(nodo.childNode[2]);
                return true;
            case "Clase":
                this.log("clase a clase: " +
                this.clase(nodo.childNode[0]));
                this.cuerpoClase(nodo.childNode[1]);
                return true;
        }
        return false;
    }
    /**
     * Herencia
     *:'{'
     *| HEREDADE ID '{'
     *;
     * @param nodo 
     */
    public herencia(nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "HEREDADE":
                this.logPorCompletar("herencia");
                this.log("agregando herencia " + nodo.childNode[1].token);
                return true;
            case "Herencia":
                this.herencia(nodo.childNode[0]);
                return true;
        }
        return false;
    }

    /**
     * este es el metod la produccion cuerpoClaes
     * CuerpoClase
     *   : DeclaracionClase 
     *   | SobreEscribir
     *   | Estruct
     * ;
     * @param nodo 
     */
    public cuerpoClase(nodo:Nodo):boolean{

        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "DeclaracionClase":
                this.variable.declaracion(nodo.childNode[0]);
                return true;
            case "SobreEscribir":
                this.log("cuerpoClase a sobrescribir: "+
                this.sobrescribir(nodo.childNode[0]));
                return true;
            case "Estruct":
                this.logPorCompletar("agreagar struct a tabla de simbolos");
                return true 
            case "CuerpoClase":
                this.log("cuerpoClase a cuerpoClase: " +
                this.cuerpoClase(nodo.childNode[0]));
                return true;
        }
        return false;
    }
    /**
     * SobreEscribir
     *  : SOBREESCRIBIR CrearMetodo
     *  |CrearMetodo
     *  ;
     * @param nodo 
     */
    public sobrescribir(nodo:Nodo):boolean{
        let nombre:string = nodo.childNode[0].term;
        switch(nombre){
            case "SOBREESCRIBIR":
                this.logPorCompletar("tengo que sobreEcribir")
                this.log("sobrescribir a metodo: " + 
                this.crearMetodo(nodo.childNode[1]));
                return true;
            case "CrearMetodo":
                this.log("sobrescrbir a crear metodo: "+ 
                this.crearMetodo(nodo.childNode[0]));
                return true;
        }
        return false;
    }
    /**
     * Metodo
     *   : Tipo ID '(' Parametros '{'
     *   | ID ID '(' Parametros '{'
     *   | Metodo  CuerpoMetodo
     *   ;
     * @param nodo 
     */
    public metodo (nodo:Nodo ,visi:string):boolean{
        let nombre = nodo.childNode[0].term;
        let tipo:string;
        let nombreMetodo:string;

        switch(nombre){
            case "Tipo":
                tipo = nodo.childNode[0].childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.logPorCompletar("agregar metodo a tabla de simbolos");
                return true;
            case "ID":
                tipo = nodo.childNode[0].token;
                nombreMetodo = nodo.childNode[1].token;
                this.logPorCompletar("agregar metodo a tabla de simbolos")
                return true;
            case "Metodo":
                this.metodo(nodo.childNode[0],"");
                this.cuerpoMetodo(nodo.childNode[1]);
                return true;
        }
        return false;
    }
    /**
     * CrearMetodo
     *   : Visibilidad Metodo '}'
     *   | Metodo '}'
     *   ;
     * @param nodo 
     */
    public crearMetodo(nodo:Nodo):boolean{
        let nombre :string = nodo.childNode[0].term
        switch(nombre){
            case "Visibilidad":
                this.log("agregar visibilidad");
                this.log("crear metodo a metodo: " +
                this.metodo(nodo.childNode[1],nodo.childNode[0].childNode[0].token));
                return true;
            case "Metodo":
                this.log("crear metodo a metodo: " +
                this.metodo(nodo.childNode[0],"pivate"));
                return true;
        }
        return false;
    }
    /**
     * Parametros
     *   : Parametro ')' 
     *   |  ')'
     *   ;
     * @param nodo 
     */
    public parametros(nodo:Nodo):boolean{
        return false;
    }

    /**
     * Parametro
     *   : Tipo ID 
     *   | ID ID 
     *   | Parametro ',' Tipo ID
     *   | Parametro ',' ID ID 
     *   ;
     * @param nodo 
     */
    public parametro(nodo:Nodo):boolean{
        return false;
    }
    /**
     * CuerpoMetodo
     *   : Declaracion
     *   | Asignacion
     *   | getMetodoZ ';'
     *   | Control
     *   | Branching ';'
     *   ;
     * @param nodo 
     */
    public cuerpoMetodo(nodo:Nodo):boolean{
        
        return false;
    }
    /**
     * Asignacion
     *   : var '=' e ';'
     *   | Navegar var '=' e ';'
     *   |'+=' e ';'
     *   |'*=' e ';'
     *   |'/=' e ';'
     *   | '++' ';' 
     *   | '--' ';'
     *   | var '=' Nuevo ';'
     *  ;
     * @param nodo 
     */
    public asignacion(nodo:Nodo):boolean{
        return false;
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