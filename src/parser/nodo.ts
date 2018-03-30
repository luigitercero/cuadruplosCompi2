
export default class Nodo{

public term:string;

public token:string;
public childNode:Nodo[];

public location:location;
    constructor(nodo:Nodo){
        this.term =nodo.term;
      
        this.token = nodo.token;
        this.childNode = nodo.childNode;
        this.location = nodo.location;
     
    }

    
    public recorrer(nodo:Nodo,espacio:string){
        console.log(espacio+nodo.term); 
        nodo.childNode.forEach(element => {
            this.recorrer(element,espacio + " ");
        });

    }

}

class location {
 public first_column:number;
public first_line:number;
public last_column:number;
public last_line:number;

 constructor(){
    this.first_column = -1;
    this.first_line = -1 ;
    this.last_column = -1;
    this.last_line = -1;

 }

}