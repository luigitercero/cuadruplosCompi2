import Analizador from '../analizador';
import Nodo from '../nodo';
import nodoOperacion from '../exp/operacion/nodoOperacion';
import Variable from "./variable";
import Simbolo from '../tablaSimbolos/simbolo';
import Location from '../location';
import Dir from '../variable/obtenerDireccion'
export default class Asignacion extends Variable {

    
    constructor(analizador:Analizador) {
        super(analizador);
    }


     /**
     * * AsignarValor
     *:';'
     *|'=' e ';'
     *|'=' Nuevo ';'
     *|'=' Lista ';' esta lista quiere decir los arreglos 0
     *;
     * 
     */
    asignarValor(nodo:Nodo,simbolo:Simbolo){
       
        let nombre:string = nodo.childNode[0].term;
        this.analizador.log("agregando valor"); 
        let location = nodo.childNode[0].location
        if(nombre == "';'"){

        }else{
            
            this.analizador.agregarCodigo(this.analizador.genComentario
                ("agregando valor a "+ simbolo.getNombre())
                ,location.first_line,location.last_column);// es un comentario
           this.evaluarAsignacionasignarValor(nodo.childNode[1],simbolo,location);

        }
        this.analizador.agregarCodigo(this.analizador.genComentario
            ("fin de incializacion de variable "+ simbolo.getNombre())
            ,location.first_line,location.last_column);// es un comentario

    }

    evaluarAsignacionasignarValor(nodo:Nodo, simbolo:Simbolo,location:Location){
       
        let nombre = nodo.term;
        
        this.analizador.logPorCompletar("falta agregar nuevas asignaciones");
        let temp: string;
        let pos: string
        switch(nombre){
            
            case "e": 
               
            let resultado:nodoOperacion = this.analizador.exp.analizar(nodo);
            if(this.analizador.exp.evaluarTipo(resultado.tipo , simbolo.getTipo())) {
                let val = this.analizador.exp.getValor(resultado); //el temporal del resulttod
                let temp = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(),location.first_line,location.last_column);
                this.analizador.agregarCodigo(this.analizador.saveEnPila(temp.temporal,val),location.first_line,location.last_column);
                    return true;
                
            }else if (resultado.tipo == this.analizador.NULL){
                let val = this.analizador.NULL; //el temporal del resulttod
                let temp = this.analizador.variable.obtenerDirVariable(simbolo.getNombre(),location.first_line,location.last_column);
                this.analizador.agregarCodigo(this.analizador.saveEnPila(temp.temporal,val),location.first_line,location.last_column);
                    return true;
            }else{
                throw this.analizador.newError("error por compatibilidad de tipos ",location.first_line,location.last_column); 
            }
            
            case "Nuevo":
            //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)
            return true;
            case "Lista":
            //throw this.analizador.newError("esto se puede si solo es un copilador de multiples pasadas",location.first_line,location.last_column)
            return true;
        }
        this.analizador.newError("asinganr valor",location.first_line,location.last_column);
        return false;
    }


    /**
     * Asignacion
     * Asignacion
     * : var Asignar ';'
     * | Navegar var Asignar ';'
     * ;
     * 
     *  
     * @param nodo 
     */
    public asignacion(nodo:Nodo):boolean{
        let term = nodo.childNode[0].term;
        let variable:Dir;
        switch (term) {
            case "var":
             variable = this.analizador.variable.var(nodo.childNode[0]);
             this.asignar( nodo.childNode[1],variable);
             return true;
            case "Navegar":
                this.navegar(nodo.childNode[0]);
        }
        this.analizador.newError("error algo esta mal",nodo.childNode[2].location.first_line,nodo.childNode[2].location.last_column);
        return false;
    }

    public navegar(nodo:Nodo) {

    }


   
/**
   Asignar
    :'+=' e 
    |'*=' e 
    |'/=' e 
    | '++'   
    | '--'  
    | '=' Nuevo 
    | '=' e     | '=' e 

    ;
     */
   private asignar(nodo:Nodo, variable:Dir) {
    let term = nodo.childNode[0].term 
        switch(term){
            case "'++'":
            return this.analizador.exp.evaluarPP(variable);
            case "'--'":
            return this.analizador.exp.evaluarMM(variable);
            case "'='":
            return this.getAdd(nodo.childNode[1]);
            case "'+=":
            return this.analizador.exp.masIgual(nodo.childNode[1],variable);
            case "'*='":
            return this.analizador.exp.porIgual(nodo.childNode[1],variable);
            case "'/='":
            return this.analizador.exp.divIgual(nodo.childNode[1],variable);
        }
        this.analizador.newError("error al asignar",0,0)
   }

   private getAdd(nodo:Nodo){
        let term = nodo.term;
        switch(term) {
            case "Nuevo":
            case "e":
            return this.analizador.exp.analizar
        }
   }
    
}