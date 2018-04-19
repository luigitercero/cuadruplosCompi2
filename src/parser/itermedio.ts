
/**
 * esta clase lleva el control del formato intermido
 */
export default class FormatoItermedio{
    private codigoIntermedio:string;
    private temporal:number;
    private etiqueta:number;
    private poss:number;
    public codigo4D = {
        'C4D':[{'poss':-1,'codigo':"",'columna':-1,'linea':-1,}],
        'state':true,
        'etiqueta':[{'etiqueta':"",'poss':-1}],
        'metodo' :[{'metodo':"",'poss':-1}],
        'temporal':[{"tempora":"retorno","valor":35174492}],
        'start':1,
    };
    public get3D(){
        return this.codigo4D;
    }
    public agregarCodigo(codigo:string,column:number|-1,line:number|-1){
        this.codigoIntermedio  = this.codigoIntermedio + codigo+"\n";
        this.codigo4D.C4D.push({'poss':this.poss,'codigo':codigo,'columna':column,'linea':line});
        this.poss ++;
        console.log("#"+codigo,' columna: '+column +' linea: ' +line );
    }

    public siguiLibreHeap() {
        return this.genOperacion("+","heap",1+"","heap")
    }
    public setStart() {
        this.codigo4D.start = this.poss;
    }

    constructor(){
        this.codigoIntermedio = "";
        this.temporal = 1;
        this.etiqueta = 1;
        this.poss = 1;
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
    public saveEnPila(pos:string,valor:string):string{
        return this.genCuadruplo("<=",pos,valor,"stack");
    }
    /**
     * 
     * @param pos es la posicion donde se vaa acceder
     * @param valor es el valor que que se obtiene al acceder la posicion del arreglo
     */
    public getEnPila(pos:string,valor:string):string{
        return this.genCuadruplo("=>",pos,valor,"stack")
    }
    /**
     * 
     * @param pos es la posicion donde va a acceder al heap
     * @param valor  es el valor que se guarda en la posicion del heap
     */
    public saveEnHeap(pos:string,valor:string):string{
        return this.genCuadruplo("<=",pos,valor,"heap")
    }
    /**
     * 
     * @param pos es la posicion en el heap
     * @param valor es el valor del la posicion del heap
     */
    public getEnHeap(pos:string,valor:string):string{
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
     /**
      * L1,L2:
      */
     public escribirEtiqueta(etiqueta:string[]):string{
        let salida = "";
        etiqueta.forEach(element => {
            if (salida == "") {
                salida = element; 
                let a =  element.replace("L","");
                this.codigo4D.etiqueta[+a] ={"etiqueta":element,"poss":this.poss};
               
                }
            else {salida = salida + "," +element;
            let a =  element.replace("L","");
            this.codigo4D.etiqueta[+a] ={"etiqueta":element,"poss":this.poss};
            } 
        }); if(salida != ""){
            return (salida + ":");
        }else {return ""}
        
     }

     public escribirEtiquetaS(etiqueta:string):string{
        let a =  etiqueta.replace("L","");
        this.codigo4D.etiqueta[+a] ={"etiqueta":etiqueta,"poss":this.poss};
        return etiqueta+":";
        
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
        this.codigo4D.etiqueta.push({'etiqueta': l,'poss':-1});
        return l;
    }
    /**
     * genera un nuevo temporal
     */
    public newTemporal(){
        let t = "T" + this.temporal;
        this.temporal = this.temporal + 1;
        this.codigo4D.temporal.push({'tempora':t,'valor':35174492});
        return t;
    }
    /**
     * agreagar un nuevo error
     */
    public newError(descripcion:string,linea:number, columna:number){
        console.log(descripcion + " linea: " + linea+ " columna: "+ columna);
        throw new Error(descripcion + " linea: " + linea+ " columna: "+ columna);
    }
    public logPorCompletar(mensaje:string){
        console.log("es necesario completar: " + mensaje);
        
    }
    
   public INT :string = "entero";
   public CARACTER:string ="caracter";
   public STRING:string ="string";
   public BOOLEANO:string = "booleano";
   public PUBLICO:string = "publico";
   public PRIVADO:string = "privado";
   public PROTEGIDO:string = "protegido";
   public VACIO:string="vacio";
   public DOUBLE:string="decimal"
   public NULL:string="35174492"
}

interface IPerson {
    firstName: string;
    lastName: string;
 }
