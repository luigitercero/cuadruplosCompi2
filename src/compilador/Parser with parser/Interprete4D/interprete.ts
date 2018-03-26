import Operacion from "./operacion";

export default class Interprete{

    public p;
  
    constructor(inteprete){
        
        
        this.p = require('./codigoFinal');
      
        this.p.parser.struct.codigo = inteprete.C4D;
        this.p.parser.struct.etiqueta = inteprete.etiqueta;
        this.p.parser.struct.metodo = inteprete.metodo;
        this.p.parser.struct.op = new Operacion();
        this.p.parser.struct.leer = this;
        this.p.parser.struct.temporal = inteprete.temporal;
        /*
    stack:[],
    heap:[],
    codigo:[],
    etiqueta:[],
    metodo:[],
    temporal:[],
    ptr:0,
    pth:0,
    op:null,
    leer:null
}
        let archivo = fs.readFileSync('/home/luigitercero/Documentos/Compi2/Archivo De entrada/test', 'utf-8');
        let hola = p.parse( archivo);
        let nodo = new Nodo (p.parser.treeparser.raiz);
        let analizador = new Analizador();
        analizador.inicio(nodo);
        console.log(
        "esto es 3D");
        let result = analizador.get3D().C4D;
        for(let k in result) {
            console.log(result[k].poss, result[k].codigo);
        }*/
    }

    leer4D(iniciaEn:number){
       if (this.p.parser.struct.codigo !=null){
            for (let index = iniciaEn; index < this.p.parser.struct.codigo.length; index++) {
               this.p.parse(this.p.parser.struct.codigo[index].codigo);
                
            }
       }

    }
}