import Nodo from './parser/nodo'
import Analizador from './parser/analizador'
import Interprete from './compilador/Parser with parser/Interprete4D/interprete'
import Tabla from './parser/tablaSimbolos/tabla';

export default class Init {


    public archivo: any;
    public d4: any;
    public analizador: Analizador;
    private inter4D: Interprete;
    constructor(nombre: string) {

        var fs = require('fs');
        let rut = "/home/luigitercero/Documentos/Compi2/Archivo De entrada/"
        //let archivo = fs.readFileSync(rut+'arreglo', 'utf-8');
        //let archivo = fs.readFileSync(rut+'asignaciones', 'utf-8');
        //let archivo = fs.readFileSync(rut+'operacion', 'utf-8');
        //let archivo = fs.readFileSync(rut+'test', 'utf-8');
        this.archivo = fs.readFileSync(rut + nombre, 'utf-8');
        //let archivo = fs.readFileSync(rut+'control', 'utf-8');
    }


    public analizar(data: any) {
        this.archivo = data;
        var p = require('./compilador/Parser with parser/Codigo3D/codigoFinal');
        let hola = p.parse(/*prueba7 + prueba8*/ this.archivo);
        let nodo = new Nodo(p.parser.treeparser.raiz);
        this.analizador = new Analizador();
        this.analizador.inicio(nodo);
        let result = this.analizador.get3D();
        this.d4 = result;
        this.inter4D = new Interprete(result);
    }

    public getAmbito(): any {
        return this.inter4D.ambito;

    }
    public getPila() {
        return this.inter4D.p.parser.struct.op.stack;
    }
    public consola() {
        return this.inter4D.p.parser.struct.op.consola;
    }
    public getHeap() {
        return this.inter4D.p.parser.struct.op.heap;
    }
    public getptr() {
        return this.inter4D.p.parser.struct.op.ptr;
    }
    public getpth() {
        return this.inter4D.p.parser.struct.op.pth;
    }

    public getOperacion() {
        return this.inter4D.p.parser.struct.op.op;
    }
    public debuguear(data: any) {
        if (this.inter4D != undefined) {
            // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
            let a = this.inter4D.seguir(data);
            /**
            for(let k in this.d4.temporal) {
               console.log(this.d4.temporal[k].tempora,this.d4.temporal[k].valor);
            }
   
            for(let k in this.d4.etiqueta) {
               console.log(this.d4.etiqueta[k].poss,this.d4.etiqueta[k].etiqueta);
            }
           
            var persons: { [id: string] : IPerson; } = {};
            persons["p1"] = { firstName: "F1", lastName: "L1" };
            persons["p2"] = { firstName: "Fe", lastName: "Le" };
            console.log(persons["p1"].firstName);
            console.log(persons["p2"].firstName); */
            return a;
        }
    }
    public siguiente() {
        return this.inter4D.siguiente();
    }


    static init(nombre: string): Init {
        return new Init(nombre);
    }
}

interface IPerson {
    firstName: string;
    lastName: string;
}

class P {

    p() {
        var persons: { [id: string]: IPerson; } = {};
        persons["p1"] = { firstName: "F1", lastName: "L1" };

    }
}