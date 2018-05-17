import Analizador from '../analizador'
import Nodo from '../nodo';
import Recorrer from './recorrerArbol'
import Struct from '../tablaSimbolos/estructura/Estructura';
import Variable from '../../precompilacion/variable';
import Simbolo from '../tablaSimbolos/simbolo';
import Location from '../location';
export default class Estructura {
    private analizador: Analizador;
    private recorrer: Recorrer;
    private _RVariable: Variable
    constructor(analizador: Analizador) {
        this.analizador = analizador;
        this.recorrer = new Recorrer();
        this._RVariable = new Variable(analizador);
    }


    delcararEstructurasGlobales(nodo: Nodo) {

        this.Inicio(nodo);
    }


    Inicio(nodo: Nodo): Struct {
        let term = nodo.childNode[0].term;
        this.analizador.recorrerArbol(nodo);
        switch (term) {
            case "Cuerpo_Estruct":
                return this.Cuerpo_Estruct(nodo.childNode[0]);
        }
        throw this.analizador.newError("error a declarar struct", 0, 0);
    }

    private Cuerpo_Estruct(nodo: Nodo): Struct {
        let term = nodo.childNode[0].term;
        switch (term) {
            case "Cuerpo_Estruct":
                let estructura: Struct = this.Cuerpo_Estruct(nodo.childNode[0]);
                this.Declarar_Variable(nodo.childNode[1], estructura);
                return estructura;
            case "ESTRUCTURA":
                return this.crearEstrucura(nodo.childNode[1]);

        }
        throw this.analizador.newError("error a declarar struct", 0, 0);
    }
    private Declarar_Variable(nodo: Nodo, estructura: Struct) {
        let tipo: string = nodo.childNode[0].term
        let struct: boolean = false;
        let punter: boolean = false;
        if (tipo == "Tipo") {
            tipo = nodo.childNode[0].childNode[0].token;

        } else {
            tipo = nodo.childNode[0].token;
            struct = true;
            punter = true;
        }
        let variable: Simbolo = this._RVariable.var(nodo.childNode[1], tipo, "");
        variable.setStruct(struct);
        variable.setPuntero(punter);
        this._RVariable.asignarValor(nodo.childNode[2], variable);
        estructura.agregarSim(variable);

    }

    private crearEstrucura(nodo: Nodo): Struct {
        let nombre = nodo.token;
        let estructura: Struct = new Struct(nombre, nodo.location.first_line);
        this.analizador.Estructuras.agregarEstructura(estructura);
        return estructura;
    }

    InicializarEstructura(nombre: string, location: Location) {
        let s: Struct | undefined = this.analizador.Estructuras.buscarEstructura(nombre, location);
        let struct: Struct;
        if (s == undefined) {
            let s2: Struct | undefined = this.analizador.claseA.estructura.buscarEstructura(nombre, location);
            if (s2 != undefined) {
                struct = s2;
            } else {
                throw this.analizador.newError("error no se encontro la estructura", location.first_line, location.last_column);
            }
        } else {
            struct = s;
        }

        struct.variables.ambito.length
    }

    public buscarEstructura(nombre: string, location: Location): Struct {
        let s: Struct | undefined = this.analizador.Estructuras.buscarEstructura(nombre, location);
        let struct: Struct;
        if (s == undefined) {
            let s2: Struct | undefined = this.analizador.claseA.estructura.buscarEstructura(nombre, location);
            if (s2 != undefined) {
                return struct = s2;
            } else {
                throw this.analizador.newError("error no se encontro la estructura", location.first_line, location.last_column);
            }
        } else {
            return struct = s;
        }
    }
}