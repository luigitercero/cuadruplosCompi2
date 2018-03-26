/* description: Parses end executes mathematical expressions. */

/* lexical grammar */

%lex
%options case-insensitive
digit                       [0-9]
esc                         "\\"
int                         "-"?(?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)

%{


  %}

%%


\s+                   /* skip whitespace */

\/\/[^\n]*                                                   /* skip comment */
"/*"[^"*/"]*"*/"                                           /*ignore */

"*"                                                         return '*'
"/"                                                         return '/'

"+"                                                         return '+'
","                                                         return ','
"="                                                         return '='
"=>"                                                        return '=>'
"<="                                                        return '<='
"("                                                         return '('
")"                                                         return ')'
":"                                                         return ':'
"Begin"                                                     return 'BEGIN'
"end"                                                       return 'END'
"call"                                                      return 'CALL'
"stack"                                                     return 'STACK'
"heap"                                                      return 'HEAP'
"$_in_value"                                                return 'INVALUE'
"%c"                                                        return 'CARA'
"%d"                                                        return 'DIGITO'
"%f"                                                        return 'FLOAT'
"je"                                                        return 'JE'
"jne"                                                       return 'JNE'
"jg"                                                        return 'JG'
"jge"                                                       return 'JGE'
"jl"                                                        return 'JL'
"jle"                                                       return 'JLE'
"JMP"                                                       return 'JMP'
"Print"                                                     return 'PRINT'
"T"{int}+                                                     return 'TEMPORAL'
"L"{int}+                                                     return 'ETIQUETA'

                                                     
\"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])*\"  yytext = yytext.substr(1,yyleng-2); return 'STRINGLIST';
{int}{frac}?{exp}?\b                                         return 'NUMBERLIST'
"-"                                                         return '-'
[A-Za-z_0-9_]+                                               return 'ID';
\/(?:[^\/]|"\\/")*\/                                         return 'REGEX'
<<EOF>>                                                      return 'EOF'



/lex

/* operator associations and precedence */



%left '+' '-'
%left '*' '/' '%'
%left '^'
%left UMINUS


%start inicio
%error-verbose
%% /* language grammar */
inicio: Op4D EOF
  ; 
Op4D
    :Op
    |Asignacion
    |Salto
    |SaltoP
    |Metodo
    |LlamarMetodo
    |AccederARR
    |ObtenerARR
    |Print
    |Lectura
    |Etiqueta ':'
    ;

Op
    :'+' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.sumar($3,$5,$7);}
    |'-' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.restar($3,$5,$7);}
    |'*' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.multiplicar($3,$5,$7);}
    |'/' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.dividir($3,$5,$7);}
    ;

Asignacion
    : '=' ',' Dato ',' ',' TEMPORAL{parser.struct.op.setValTemp($6,$3); console.log("Asignacion");}
    ;
Salto
    : JMP ',' ',' ',' ETIQUETA {parser.indice.valor = arser.struct.op.eitqueta($5);}
    ;
SaltoP
    : JE  ',' Dato ',' Dato ',' ETIQUETA
    | JNE ',' Dato ',' Dato ',' ETIQUETA
    | JG  ',' Dato ',' Dato ',' ETIQUETA
    | JGE ',' Dato ',' Dato ',' ETIQUETA
    | JL  ',' Dato ',' Dato ',' ETIQUETA
    | JLE ',' Dato ',' Dato ',' ETIQUETA
    ;
Metodo
    : BEGIN ',' ',' ',' ID
    ;

ReMetodo
   : END ',' ',' ',' ID
   ;
LlamarMetodo
    : CALL ',' ',' ',' ID
    ;
AccederARR
    : '<=' ',' Dato ',' Dato ',' STACK 
    | '<=' ',' Dato ',' Dato ',' HEAP 
    ;
ObtenerARR
    : '=>' ',' Dato ',' Dato ',' STACK 
    | '=>' ',' Dato ',' Dato ',' HEAP 
    ;
Print 
    : PRINT '('CARA ',' Dato ')'
    | PRINT '('DIGITO ',' Dato ')'
    | PRINT '('FLOAT ',' Dato ')'
    ;
Lectura
    : CALL ',' ',' ',' INVALUE
    ;

Dato
    : TEMPORAL {$$ = parser.struct.op.getValtemp($1);}
    | NUMBERLIST{$$ = parser.struct.op.convertiNumero($1);}
    | STRINGLIST
    ;
Etiqueta
    : ETIQUETA
    | Etiqueta ',' ETIQUETA
    ;
%% 
function Nodo ( term, location, token , childNode) {
  this.term =term;
  this.location = location;
  this.token = token;
  this.childNode = childNode;
}

parser.interprete = {interprete:null}
parser.struct = {
    stack:[],
    heap:[],
    codigo:[],
    etiqueta:[],
    metodo:[],
    temporal:null,
    ptr:0,
    pth:0,
    op:null,
    leer:null
};

parser.indice = {
    valor:0,
};
 parser.treeparser  = {
 raiz : null
};

 parser.error ={
  error:[]

};