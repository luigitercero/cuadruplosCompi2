import Analizador from '../../../analizador';
import Nodo from '../../nodo';
import NodoOperacion from './nodoOperacion'
import nodoOperacion from './nodoOperacion';
export default class Operacion{
    operarMayorIgual(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarMenorIgual(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarMayorQue(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarMenorQue(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarNoIgual(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarIgual(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarXor(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarAnd(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarOr(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarEleva(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarModulo(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarDivicion(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarMultiplicaion(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarResta(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }
    operarSuma(arg0: Nodo, arg1: Nodo): Nodo {
        throw new Error("Method not implemented.");
    }

    public  analizador: Analizador;
    constructor(anlaizador:Analizador){
        this.analizador = anlaizador;
    }

    analizar(nodo:Nodo){
       let cantidad:number = nodo.childNode.length
       
        switch(cantidad){
            case 3:
            this.operacion(nodo);
            break;
            case 2:
            this.operacion2(nodo);
            break;
            case 1:
            return this.datos(nodo.childNode[0]);
            
        }
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
        
        this.analizador.logError("un error en el archivo Operacion.ts en el metodo operasicion no encotro un simbolo");
        return new nodoOperacion("nada",35124492);
    }

    operacion2(nodo:Nodo){
        switch(nodo.childNode[0].term){
            case "'-'":
            case "'!'":
        }
    }

    datos(nodo:Nodo):NodoOperacion{
        let term = nodo.childNode[0].term
        switch(term){
            case "NULL":
            return new nodoOperacion("nada",35124492);
            case "Datos":
            return this.resolverDatos(nodo.childNode[0]);
        }
        return new nodoOperacion("nada",35124492);
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
        switch(nodo.term){
            case "NUMBERLIST":
            return new NodoOperacion(nodo.childNode[0].token,1);
            case "STRINGLIST":
            return new NodoOperacion(nodo.childNode[0].token,2);
            case "TRUE":
            return new NodoOperacion(nodo.childNode[0].token,0);
            case "FALSE":
            return new NodoOperacion(nodo.childNode[0].token,0);
            case "Identi":
            this.analizador.logPorCompletar("falta obterner datos de la tabla de simbolos");
            return new NodoOperacion(nodo.childNode[0].token,35174492);
        }
       return new nodoOperacion("nada",35124492);
    }


    
}