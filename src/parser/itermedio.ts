import Location from "./location";

/**
 * esta clase lleva el control del formato intermido
 */
export default class FormatoItermedio{
    private codigoIntermedio:string;
    private temporal:number;
    private etiqueta:number;
    public get3D(){
        return this.codigoIntermedio;
    }
    public agregarCodigo(codigo:string,column:number|-1,line:number|-1){
        this.codigoIntermedio  = this.codigoIntermedio + codigo+"\n";
    }

    constructor(){
        this.codigoIntermedio = "";
        this.temporal = 0;
        this.etiqueta = 0;
    }
    private pila (n:number):string{
     return "Pila [ " + n + " ]";
    }
    private heap(n:number):string{
        return "Heap [ " + n + " ]"
    }
    /**
     * 
     * @param pos es la posicion donde de que se desea acceder del staack
     * @param valor es valor que se va a guardar 
     */
    public guardarEnPila(pos:string,valor:string):string{
        return this.genCuadruplo("<=",pos,valor,"stack")
    }
    /**
     * 
     * @param pos es la posicion donde se vaa acceder
     * @param valor es el valor que que se obtiene al acceder la posicion del arreglo
     */
    public obtenerEnPila(pos:string,valor:string):string{
        return this.genCuadruplo("=>",pos,valor,"stack")
    }
    /**
     * 
     * @param pos es la posicion donde va a acceder al heap
     * @param valor  es el valor que se guarda en la posicion del heap
     */
    public guardarEnHeap(pos:string,valor:string):string{
        return this.genCuadruplo("<=",pos,valor,"heap")
    }
    /**
     * 
     * @param pos es la posicion donde se va guardar en el heap
     * @param valor es el valor que se guarda en la posicion del heap
     */
    public obtenerEnHeap(pos:string,valor:string):string{
        return this.genCuadruplo("=>",pos,valor,"heap")
    }
    /**
     * crea formato que se usara para las operacopms
     * @param operador este es el operador puede ser  + - * / == !=
     * @param argumeto1 este es el primer valor para la operacion
     * @param argumeto2 este es el segundo valor para la operacion
     * @param resultado es temporal en donde se guarda el resultado 
     */
    public genOperacion(operador:string,argumeto1:string,argumeto2:string,resultado:string):string{
        operador = this.opBool(operador);
        return  this.genCuadruplo(operador,argumeto1,argumeto2,resultado);
    }

    public opBool(operador:string)
    {
        switch (operador){
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

    }
    /**
     *  es el formato que necesita para hacer un salto
     * @param etiqueta es la etiqueta a donde va el salto
     */
    public genSalto(etiqueta:string):string{
        return  this.genCuadruplo("jmp","","",etiqueta);
     }
     public escribirEtiqueta(etiqueta:string):string{
         return (etiqueta + ":");
     }
     /**
      * asignar valor a variable
      * @param val es el valor que va a tener la variable
      * @param variable es la variable que se va a guardar el valor
      */
    public asignar(val:string, variable:string):string{
        return this.genCuadruplo("=",val,"",variable);
    }
    /**
     * iniciar un metodo
     * @param nombre  nombre del metodo
     */
    public metodoBegin(nombre:string):string{ 
        return this.genCuadruplo("begin","","",nombre);
    }
    /**
     * inalizar un metodo con el formato
     * @param nombre nombre del metodo 
     */
    public metodoEnd(nombre:string):string{ 
        return this.genCuadruplo("end","","",nombre);
    }
    /**
     * llama al metodo en formato
     * @param nombre nombre del metodo
     */
    public llamarMetodo(nombre:string):string{
        return this.genCuadruplo("call","","",nombre);
    }
    /**
     * este servira para llevar control de las acciones 
     * @param imprimir sentencia que se va imprimir
     */
    public log(imprimir:string){
        console.log (imprimir);
    }
    /**
     * este sera el metodo salida para la consola metodo imprimir
     * @param imprimir 
     */
    public salidaConsola(imprimir:string){
        console.log (imprimir);
    }
    /**
     * agregara un comentario al formato 3d
     * @param comentario 
     */
    public genComentario(comentario:string){
        return "// " + comentario;
    }
    /**
     * este sera el formato para generar el cuadruplo
     * @param operador 
     * @param argumeto1 
     * @param argumeto2 
     * @param resultado 
     */
    private genCuadruplo(operador:string,argumeto1:string,argumeto2:string,resultado:string){
        return operador + ", "+ argumeto1 +", "+argumeto2 +", "+resultado;
    }
    /**
     * genera una nueva etiqueta
     */
    public newEtiqueta(){
        let l = "L" + this.etiqueta;
        this.etiqueta = this.etiqueta + 1;
        return l;
    }
    /**
     * genera un nuevo temporal
     */
    public newTemporal(){
        let t = "T" + this.temporal;
        this.temporal = this.temporal + 1;
        return t;
    }
    /**
     * agreagar un nuevo error
     */
    public newError(descripcion:string,linea:number, columna:number){
        console.log(descripcion + " linea: " + linea+ " columna: "+ columna);
        return new Error(descripcion + " linea: " + linea+ " columna: "+ columna);
    }
    public logPorCompletar(mensaje:string){
        console.log("es necesario completar: " + mensaje);
    }
    public logError(mensaje:string){
        console.log("error en: " + mensaje);
       return new Error(mensaje);
    }

}