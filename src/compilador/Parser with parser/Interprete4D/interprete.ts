export default class Interprete{

    public p;
    constructor(){
        this.p = require('./compilador/Parser with parser/Interprete4D/codigoFinal');
        this.p.parser
        
        /**
         * 
parser.struct = {
    stack:[],
    heap:[],
    codigo:[],
    etiqueta:[],
    metod:[],
    variable:[]
}

 parser.treeparser  = {
 raiz : null
};

 parser.error ={
  error:[]

};
         */
        /*

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
}