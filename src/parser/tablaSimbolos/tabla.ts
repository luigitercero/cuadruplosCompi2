import Simbolo from './simbolo'
import Ambito from './ambito'
export default class Tabla {

    public Lista:Ambito[];
    public esto:Ambito;
    public actual:Ambito;
    public ptr:number
    
    constructor(tabla?:Tabla) {
        if (tabla != null) {
            this.actual = new Ambito();
            this.esto = tabla.esto;
            this.Lista = new Array<Ambito>();
            this.Lista.push(this.actual);
            this.ptr = 0 ;

        }else {
            this.actual = new Ambito();
            this.esto = new Ambito();
            this.Lista = new Array<Ambito>();
            this.Lista.push(this.actual);
            this.ptr = 0 ;

        }
        
    }

    addReturnAndThis(estoTipo:string){
        let retorno = new Simbolo("retorno","","");
        let _esto = new Simbolo("esto","",estoTipo);
        this.agregarSimboloApila(retorno);
        this.agregarSimboloApila(_esto);
    }

    aumetarAbmito() {
        let nuevoAmbito = new Ambito();
        nuevoAmbito.setPTR(this.ptr);
        this.Lista.push(nuevoAmbito);
        this.actual = nuevoAmbito;
    }



    disminuirAmbito() {
        let ambitoActual:Ambito = this.actual;
        this.ptr = this.ptr - ambitoActual.ambito.length;
        this.Lista.pop();
        this.actual = this.Lista[this.Lista.length-1];
    }

    agregarSimboloApila(simbolo:Simbolo){
        simbolo.possAmbito = this.ptr;
        this.actual.agregarSimbolo(simbolo);
        this.siguietePosicionLibre(simbolo);
        return this.ptr;
    }
    buscarEnPila(nombre:string):Simbolo|null{
      
        for (let index = 0; index < this.Lista.length; index++) {
            for (let index2 = 0; index2 < this.Lista[index].ambito.length; index2++) {
                let simbolo = this.Lista[index].ambito[index2]
                if (simbolo.getNombre() == nombre) {
                    return  simbolo
                }   
            }
        }
        return null;
    }

    buscarEnHeap(nombre:string):Simbolo|null{
        for (let index = 0; index < this.esto.ambito.length; index++) {
            let simbolo = this.esto.ambito[index]
            
            if (simbolo.getNombre() == nombre) {
                return  simbolo
            }   
        }
        return null;
    }

    private siguietePosicionLibre(simbolo:Simbolo){
    this.ptr ++;
    }

    /*
    agregarVariable(nombre:string,visibilidad:string,tipo:string) {
      
    }*/
    getActual() {}
    existVarAmbitoActual(nombre:string) { 

    }

    verVariables(){
        console.log("/** variables Locales **/")
        for (let index = 0; index < this.Lista.length; index++) {
            const element = this.Lista[index];
            element.verVariables();
            
        }
        console.log("/** fin de variables Locales **/")
        console.log("/** esto **/")
        this.esto.verVariables();
        console.log("/** fin Esto **/")

    }
   


}