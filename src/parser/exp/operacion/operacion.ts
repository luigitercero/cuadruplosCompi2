import Analizador from '../../../analizador';
import Nodo from '../../nodo';
import NodoOperacion from './nodoOperacion'
import nodoOperacion from './nodoOperacion';
import Suma from './suma';
import Comparacion from './comparacion';


export default class Operacion{
    
    public  analizador: Analizador;
    constructor(anlaizador:Analizador){
        this.analizador = anlaizador;
    }
    
    operarMayorIgual(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,">=");
        return op.evaluar();;
    }
    operarMenorIgual(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,"<=");
        return op.evaluar();
    }
    operarMayorQue(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,">");
        return op.evaluar();
    }
    operarMenorQue(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,"<");
        return op.evaluar();
    }
    operarNoIgual(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,"!=");
        return op.evaluar();
    }
    operarIgual(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        let a1= this.analizar(arg1);
        let op:Comparacion = new Comparacion(a0, a1,this.analizador,"==");
        return op.evaluar();
    }
    operarXor(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        if (a0.tipo == "boolean")
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF),a0.column,a0.fila);//agregnaod etiqueta falsa
        else this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
        let a1= this.analizar(arg1);
        if(a1.tipo == "boolean" ){
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaV),a0.column,a0.fila);//agregnaod etiqueta verdadera
            let l5 = this.analizador.newEtiqueta();
            let l6 = this.analizador.newEtiqueta();
            this.analizador.agregarCodigo(a1.valor+","+ l5,a1.column,a1.fila);
            //this.analizador.agregarCodigo(a0.etiquetaV+","+ l6 +":",a0.column,a0.fila);//agregnaod etiqueta verdadera
            
            let res:nodoOperacion = new  nodoOperacion ("","boolean",a0.column,a0.fila);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaV(l6);
            res.addEtiquetaFV(a1.etiquetaF);
            res.addEtiquetaF(l5);
            return res;
        }
        else 
         throw this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
    }
    operarAnd(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        if (a0.tipo == "boolean")
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta( a0.etiquetaV),a0.column,a0.fila);//agregnaod etiqueta verdadera
        else this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
        let a1= this.analizar(arg1);
        if(a1.tipo == "boolean" ){
            let res:nodoOperacion = new  nodoOperacion ("","boolean",a0.column,a0.fila);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaFV(a0.etiquetaF);
            res.addEtiquetaFV(a1.etiquetaF);
            return res;
        }
        else 
         throw this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
    }
    operarOr(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let a0= this.analizar(arg0);
        if (a0.tipo == "boolean")
        this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(a0.etiquetaF),a0.column,a0.fila);//agregnaod etiqueta verdadera
        else this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
        let a1= this.analizar(arg1);
        if(a1.tipo == "boolean" ){
            let res:nodoOperacion = new  nodoOperacion ("","boolean",a0.column,a0.fila);
            res.addEtiquetaVV(a0.etiquetaV);
            res.addEtiquetaVV(a1.etiquetaV);
            res.addEtiquetaFV(a1.etiquetaF);
            return res;
        }
        else 
         throw this.analizador.newError("no es un operrador boleano",a0.column,a0.fila);
    }
    operarEleva(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"*");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();
    }
    operarModulo(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"+");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();;
        
    }
    operarDivicion(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"/");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();
    }
    operarMultiplicaion(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"*");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();
    }
    operarResta(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"-");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();
    }
    operarSuma(arg0: Nodo, arg1: Nodo): nodoOperacion {
        let op:Suma = new Suma(this.analizador,"+");
        op.setArg0( this.analizar(arg0));
        op.setArg1( this.analizar(arg1));
        return op.evaluar();
    }

   

    analizar(nodo:Nodo):nodoOperacion{
       let cantidad:number = nodo.childNode.length
       
        switch(cantidad){
            case 3:
            return this.operacion(nodo);
            case 2:
            return this.operacion2(nodo);
            case 1:
            return this.datos(nodo.childNode[0]);
        }
        throw new Error("error en analizar");
       
    }
    operacion(nodo:Nodo):nodoOperacion{
        let operacion:string =nodo.childNode[1].term;
        switch(operacion){
            case "'+'":
            return this.operarSuma(nodo.childNode[0],nodo.childNode[2]);
            case "'-'":
            return this.operarResta(nodo.childNode[0],nodo.childNode[2]);
            case "'*'":
            return this.operarMultiplicaion(nodo.childNode[0],nodo.childNode[2]);
            case "'/'":
            return this.operarDivicion(nodo.childNode[0],nodo.childNode[2])
            case "'%'":
            return this.operarModulo(nodo.childNode[0],nodo.childNode[2]);
            case "'^'":
            return this.operarEleva(nodo.childNode[0],nodo.childNode[2]);
            case "'||'":
            return this.operarOr(nodo.childNode[0],nodo.childNode[2]);
            case "'&&'":
            return this.operarAnd(nodo.childNode[0],nodo.childNode[2]);
            case "'??'":
            return this.operarXor(nodo.childNode[0],nodo.childNode[2]);
            case "'=='":
            return this.operarIgual(nodo.childNode[0],nodo.childNode[2]);
            case "'!='":
            return this.operarNoIgual(nodo.childNode[0],nodo.childNode[2]);
            case "'<'":
            return this.operarMenorQue(nodo.childNode[0],nodo.childNode[2]);
            case "'<='":
            return this.operarMenorIgual(nodo.childNode[0],nodo.childNode[2]);
            case "'>'":
            return this.operarMayorQue(nodo.childNode[0],nodo.childNode[2]);
            case "'>='":
            return this.operarMayorIgual(nodo.childNode[0],nodo.childNode[2]);
        }
        
        this.analizador.newError("un error en el archivo Operacion.ts en el metodo operasicion no encotro un simbolo",
    nodo.childNode[0].location.first_line,nodo.childNode[0].location.last_column);
        throw new Error("error en analizar");
    }

    operacion2(nodo:Nodo):NodoOperacion{
        let term = nodo.childNode[0].term
        switch(term){
            case "'-'":
            return this.invertirDato(this.analizar(nodo.childNode[1]));
            case "'!'":
            return this.negar(this.analizar(nodo.childNode[1]));
            
        }
        throw new Error("error en analizar");
    }
    negar(arg0:NodoOperacion){
        let v:string[] = arg0.etiquetaV;
        let f:string[] =arg0.etiquetaF;
        arg0.etiquetaV = f;
        arg0.etiquetaF = v;
        return arg0;
    }

    invertirDato(arg0:NodoOperacion){
        let t0 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.asignar("-1",t0),arg0.column,arg0.fila);
        //let t1 = this.analizador.newTemporal();
        let t2 = this.analizador.newTemporal();
        this.analizador.agregarCodigo(this.analizador.genOperacion("*",t0,arg0.valor,t2),arg0.column,arg0.fila);
        return new NodoOperacion(t2,arg0.tipo,arg0.column,arg0.fila);
    }
    datos(nodo:Nodo):NodoOperacion{
        let term = nodo.term
        switch(term){
            case "NULL":
            return new nodoOperacion("nada",351244926+"",nodo.location.last_column,nodo.location.first_line);
            case "Datos":
            return this.resolverDatos(nodo);
        }
        throw new Error("error en analizar");
    }
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
    resolverDatos(nodo:Nodo):NodoOperacion{
        let term = nodo.childNode[0].term;
        let col = -1;
        let fil = -1;
        switch(term){

            case "NUMBERLIST2":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            return new NodoOperacion(nodo.childNode[0].token,"double",col,fil);
            case "NUMBERLIST":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            return new NodoOperacion(nodo.childNode[0].token,"int",col,fil);
            case "CARACTER":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            return new NodoOperacion(nodo.childNode[0].token.charCodeAt(1)+"","caracter",col,fil);
            case "STRINGLIST":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            return new NodoOperacion(nodo.childNode[0].token,"string",col,fil);
            case "TRUE":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            let arg0 = new NodoOperacion("1","int",col,fil);
            let arg1 = new NodoOperacion("1","int",col,fil);
            let t:Comparacion = new Comparacion(arg0,arg1,this.analizador,"==");    
            return t.evaluar();
            case "FALSE":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            let arg00 = new NodoOperacion("0","int",col,fil);
            let arg10 = new NodoOperacion("1","int",col,fil);
            let t0:Comparacion = new Comparacion(arg00,arg10,this.analizador,"==");    
            return t0.evaluar();
            case "Identi":
            col = nodo.childNode[0].location.first_line;
            fil = nodo.childNode[0].location.last_column;
            this.analizador.logPorCompletar("falta obterner datos de la tabla de simbolos");
           
        return new nodoOperacion("nada",35174492+"",col,fil)
        }
      
        throw new Error("error en analizar");
    }

    getValor(arg0:nodoOperacion){
        if (arg0.tipo == "boolean") {
            let t0 = this.analizador.newTemporal();
            let es = this.analizador.newEtiqueta();
            /*para etiqueta verdadera */
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaV),arg0.column,arg0.fila)
            this.analizador.agregarCodigo(this.analizador.asignar("1",t0),arg0.column,arg0.fila)
            this.analizador.agregarCodigo(this.analizador.genSalto(es),arg0.column,arg0.fila)//salto de salida
            /*para etiqueta falsa */
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(arg0.etiquetaF),arg0.column,arg0.fila)
            this.analizador.agregarCodigo(this.analizador.asignar("0",t0),arg0.column,arg0.fila);
            let am:string[] = new Array();
            am.push(es);
            this.analizador.agregarCodigo(this.analizador.escribirEtiqueta(am),arg0.column,arg0.fila);
            return t0;
        
        }else {
            return arg0.valor;
        }

    }


    
}