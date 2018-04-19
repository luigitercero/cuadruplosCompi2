import * as Saludar from "./Saludar";
class probando{
 public count(){
    let sal = new Saludar.Saludar();;
    for (let index = 0; index < 10; index++) {
        console.log('esto es una ssdfprue zb'+sal.saludo() );
    }
   

 }

}
let count = new probando();
count.count();