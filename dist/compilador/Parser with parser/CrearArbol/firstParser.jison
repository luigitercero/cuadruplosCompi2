/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

esc                         "\\"
%{
  %}

%%


\s+                   /* skip whitespace */
"/*"[^"*/"]*"*/"     /*ignore */
[A-Z][A-Z]+           return 'TERMINAL'
[A-Za-z_0-9-]+             return 'ID'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
['][^\n \s]*[']         return 'EXP'


"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
";"                   return ';'
"|"                   return '|'
":"                   return ':'


<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */


%start expressions

%% /* language grammar */

expressions
    : Gramar  EOF
      { console.log(salida); return $1;} 
    ;


Gramar
    : Gramar  Produccion';'
     
    |Produccion ';'
    
    ;

Produccion
    :  terminal

     {salida = salida + "\n  ; \n";}
    ;

terminal
      : terminal '|' te 
       {funcs = 1;
        salida = salida + "\n  "+$2 + " " + $3.nombre + "\n     {"+$3.Nodo+  "\n      nodo = new Nodo(\""+ $1 +"\",null,null,["+$3.Hijo +"]); \n"+ "      $"+"$ = nodo; }";
        $$ = $1;}
      |ID ':' te

       { funcs = 1;
        salida = salida + $1+":"+$3.nombre+ "\n     {"+$3.Nodo+  " \n      nodo = new Nodo(\""+ $1 +"\",null,null,["+$3.Hijo +"]);  \n"+ "      $"+"$ = nodo; }";
        $$ = $1 ;}
      
    ;

te
    : te t
      { var ID ={nombre: $1.nombre + " " + $2.nombre, Nodo: $1.Nodo + " " + $2.Nodo 
           ,Hijo : $1.Hijo + "," + $2.Hijo
           };

        $$= ID;}
      
    | t
      {var ID ={nombre: $1.nombre , Nodo: $1.Nodo , Hijo: $1.Hijo };

        $$= ID;}

        
    ;

/*New nodo ( term, location, posDeltoken , childNoDe*/
t
    : ID
      { 

        count = funcs;
        var ID ={nombre: $1, Nodo: "nodo"+ count+"= new Nodo (\"" + $1 +"\", @"+count+",$"+ count +", [] );" 
                              ,Hijo: "$" + count
                                };

        funcs= funcs+1;
        
        $$ = ID;}
      
    | EXP
      { 

        count = funcs;
        var ID ={nombre: $1, Nodo: "nodo"+ count+"= new Nodo (\"" + $1 +"\", @"+count+",$"+ count +", [] );" 
                              ,Hijo: "nodo" + count
                                };

        funcs= funcs+1;
        
        $$ = ID;}
      

     | TERMINAL{ 

        count = funcs;
        var ID ={nombre: $1, Nodo: "nodo"+ count+"= new Nodo (\"" + $1 +"\", @"+count+",$"+ count +", [] );" 
                              ,Hijo: "nodo" + count
                                };

        funcs= funcs+1;
        
        $$ = ID;}
    ; 
%%

var funcs = 1;
var salida = "";
