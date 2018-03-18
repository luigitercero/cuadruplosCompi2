import Location from '../parser/location'
export default class Nodo{

public term:string;
public location:Location;
public token:string;
public childNode:Nodo[];
    constructor(nodo:Nodo){
        this.term =nodo.term;
        this.location = new Location(nodo.location);
        this.token = nodo.token;
        this.childNode = nodo.childNode;
    }

    
    public recorrer(nodo:Nodo,espacio:string){
        console.log(espacio+nodo.term); 
        nodo.childNode.forEach(element => {
            this.recorrer(element,espacio + " ");
        });

    }

}