import Nodo from './parser/nodo'
import Analizador from './parser/analizador'
import Interprete from './compilador/Parser with parser/Interprete4D/interprete'
import Tabla from './parser/tablaSimbolos/tabla';

export default class Init {


    public archivo: any;
    public d4: any;
    public analizador: Analizador;
    private inter4D: Interprete;
    constructor(nombre: string, archivo?: boolean) {
        if (archivo == undefined) {
            var fs = require('fs');
            let rut = "/home/luigitercero/Documentos/Compi2/Archivo De entrada/"
            this.archivo = fs.readFileSync(rut + nombre, 'utf-8');
        } else {
            this.archivo = nombre;
        }
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
    public meter(data: string) {
        this.inter4D.Op.meterHeap(data);
    }
    public getSalida(): boolean {
        if (this.inter4D.getIndex() > 0) {
            return false;
        }
        return true;
    }
    public getAmbito(): any {
        return this.inter4D.ambito;
    }

    public getPila() {
        return this.inter4D.Op.stack;
    }

    public consola() {
        return this.inter4D.Op.consola;
    }

    public getHeap() {
        return this.inter4D.Op.heap;
    }

    public getptr() {
        return this.inter4D.Op.ptr;
    }

    public getpth() {
        return this.inter4D.Op.pth;
    }

    public getOperacion() {
        return this.inter4D.Op.op;
    }
    public enviarCadena() {
        if (this.inter4D.Op.pedir) {
            return this.inter4D.Op.message;
        }
    }
    public isPedir() {
        return this.inter4D.Op.pedir
    }
    public reiniciarPedir() {
        this.inter4D.Op.pedir = false;
    }
    public debuguear(data: any) {
        if (this.inter4D != undefined) {
            // console.log(result.temporal[key].tempora+ " esto estoy probando " + key);
            let a = this.inter4D.seguir(data);
            return a;
        }
    }
    public seSalio() {
        return this.inter4D.salida;
    }
    public stop() {
        this.inter4D.salida = true;

    }
    public start() {
        this.inter4D.salida = false;
    }
    public siguiente() {
        return this.inter4D.siguiente();
    }
    public siguienteSimple() {

    }

    static init(nombre: string, archivo?: boolean): Init {
        return new Init(nombre, archivo);
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