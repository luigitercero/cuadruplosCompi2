export default class Location{
    public fila : number;
    public columna:number;
    constructor(location){
        if (location != null){
        this.columna = location.last_column;
        this.fila = location.first_line
        }else{
            this.fila = 0;
            this.columna = 0;
        }
    }
    

}