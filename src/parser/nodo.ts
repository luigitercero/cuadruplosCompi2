import location from './location'
export default class Nodo {

    public term: string;

    public token: string;
    public childNode: Nodo[];

    public location: location;
    constructor(nodo: Nodo) {
        this.term = nodo.term;

        this.token = nodo.token;
        this.childNode = nodo.childNode;
        this.location = nodo.location;

    }


    public recorrer(nodo: Nodo, espacio: string) {
        console.log(espacio + nodo.term);
        nodo.childNode.forEach(element => {
            this.recorrer(element, espacio + " ");
        });

    }

}

