export default class Operacion {
    public es = {
        'C4D': [{ 'poss': -1, 'codigo': "", 'columna': -1, 'linea': -1, }],
        'state': true,
        'etiqueta': [{ 'etiqueta': "", 'poss': -1 }],
        'metodo': [{ 'metodo': "", 'poss': -1 }],
        'temporal': [{ "tempora": "retorno", "valor": 4 }]
    };

    public stack: number[];
    public heap: number[];
    public ptr: number = 0;
    public pth: number = 0;
    public linea: number = 0;
    public metodoAnterior: number[];
    public consola: string[];
    private lineaConsola = 0;
    private pila: any[];
    private temporal: any;
    public op = "";
    constructor(lTeporales: any) {
        this.consola = new Array();
        this.consola.push(" ");
        this.es = lTeporales;
        this.stack = new Array();
        this.heap = new Array();
        this.metodoAnterior = new Array();
        this.metodoAnterior.push(-1)
        this.temporal = [];
        this.pila = new Array()
        this.pila.push(this.temporal);


    }

    igual(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 == arg1) {
            this.op = arg0 + " == " + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + " == " + arg1;
            return linea
        }

    }

    noigual(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 != arg1) {
            this.op = arg0 + "!=" + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + "!=" + arg1;
            return linea
        }

    }

    getSTACK(arg0: number, temp: string) {
        this.op = temp + " = stack[" + arg0 + "] | ";
        this.op = this.op + temp + " = " + this.stack[arg0];
        this.setValTemp(temp, this.stack[arg0]);
    }
    getHEAP(arg0: number, temp: string) {
        this.op = temp + " = heap[" + arg0 + "] | ";
        this.op = this.op + temp + " = " + this.heap[arg0];
        this.setValTemp(temp, this.heap[arg0]);
    }
    setHEAP(arg0: number, arg1: number) {
        this.op = "heap[ " + arg0 + "]" + " = " + arg1;
        this.heap[arg0] = arg1;
    }
    setSTACK(arg0: number, arg1: number) {
        this.op = "stack[ " + arg0 + "]" + " = " + arg1;
        this.stack[arg0] = arg1;
    }
    aumetarptr(arg0: number, arg1: number) {
        this.op = "ptr" + " = " + arg0 + " + " + arg1;
        this.ptr = arg0 + arg1;
    }
    disminuirptr(arg0: number, arg1: number) {
        this.op = "ptr" + " = " + arg0 + " - " + arg1;
        this.ptr = arg0 - arg1;
    }
    aumentarpth(arg0: number, arg1: number) {
        this.op = "pth" + " = " + arg0 + " + " + arg1;
        this.pth = arg0 + arg1;
    }

    mayorque(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 > arg1) {
            this.op = arg0 + " > " + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + " > " + arg1;
            return linea
        }

    }
    menorque(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 < arg1) {
            this.op = arg0 + " < " + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + " < " + arg1;
            return linea
        }

    }

    mayorIgual(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 >= arg1) {
            this.op = arg0 + " >= " + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + " >= " + arg1;
            return linea
        }

    }

    menorIgual(arg0: number, etiqueta: string, arg1: number, linea: number) {
        if (arg0 <= arg1) {
            this.op = arg0 + " <= " + arg1;
            return this.eitqueta(etiqueta)
        } else {
            this.op = arg0 + " <= " + arg1;
            return linea
        }

    }
    sumar(arg0: number, arg1: number, temp: string) {
        this.op = temp + " = " + arg0 + " + " + arg1;
        this.setValTemp(temp, arg0 + arg1);
    }
    sumarV(arg0: number, arg1: number, temp: string) {
        this.op = temp + " = " + arg0 + " + " + arg1;
        this.setValTemp(temp, arg0 + arg1);
    }
    restar(arg0: number, arg1: number, temp: string) {
        this.op = temp + " = " + arg0 + " - " + arg1;
        this.setValTemp(temp, arg0 - arg1);
    }
    multiplicar(arg0: number, arg1: number, temp: string) {
        this.op = temp + " = " + arg0 + " * " + arg1;
        this.setValTemp(temp, arg0 * arg1);
    }
    dividir(arg0: number, arg1: number, temp: string) {
        this.op = temp + " = " + arg0 + " / " + arg1;
        this.setValTemp(temp, arg0 / arg1);
    }

    getValtemp(temp: string) {
        let key: number = this.getPosstemp(temp);
        //return this.es.temporal[key].valor;
        return this.temporal[key]
    }

    getPosstemp(temp: string) {
        let a = temp.replace("T", "");
        return +a;
    }

    setValTemp(temp: string, val: number) {
        let key: number = + this.getPosstemp(temp);
        //let temps = this.es.temporal[key].tempora;
        //this.es.temporal[key] = { "tempora": temps, "valor": val };
        this.temporal[key] = val;
    }
    convertiNumero(num: string) {
        return +num;
    }
    eitqueta(etiqueta: string) {
        let a = etiqueta.replace("L", "");
        return this.es.etiqueta[+a].poss - 1;
    }
    printC(num: number) {
        console.log(String.fromCharCode(num));
        if (num == 35174492) {
            this.lineaConsola++
            this.consola.push(" ")
        } else {
            this.consola[this.lineaConsola] = this.consola[this.lineaConsola] + String.fromCharCode(num);
        }
    }
    printD(num: number) {
        console.log(num);
        if (num == 35174492) {
            this.lineaConsola++
            this.consola.push(" ")
        } else {
            this.consola[this.lineaConsola] = this.consola[this.lineaConsola] + num + "";
            this.lineaConsola++
            this.consola.push(" ")
        }
    }

    callMetodo(nombre: string) {
        let poss = nombre.replace("metodo", "");
        this.metodoAnterior.push(this.linea);
        return this.es.metodo[+poss].poss - 1;
    }
    begin(nombre: string) {
        this.pila.push(this.temporal);
        this.temporal = [];
        //this.es.temporal = [{ "tempora": "retorno", "valor": 4 }]
    }
    endMetodo(nombre: string) {
        let anterior = this.metodoAnterior.pop()
        this.temporal = this.pila.pop();
        return anterior;
    }
}