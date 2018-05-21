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
";"                                                         return ';'
"+"                                                         return '+'
","                                                         return ','

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
"ptr"                                                       return 'PTR'
"$_in_value"                                                return 'INVALUE'
"\"%c\""                                                        return 'CARA'
"\"%d\""                                                        return 'DIGITO'
"\"%f\""                                                        return 'FLOAT'
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
"="                                                         return '='
                                                     
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
    |EOF
  ; 
Op4D
    :Op
    |Asignacion
    |Salto
    |SaltoP
    |Metodo
    |LlamarMetodo
    |GuardarARR
    |ObtenerARR
    |Print
    |Lectura
    |Etiqueta ':'
    |ReMetodo
    ;

Op
    :'+' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.sumar($3,$5,$7);}
    |'-' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.restar($3,$5,$7);}
    |'*' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.multiplicar($3,$5,$7);}
    |'/' ',' Dato ',' Dato ',' TEMPORAL{parser.struct.op.dividir($3,$5,$7);}
    |'+' ',' Dato ',' Dato ',' PTR {parser.struct.op.aumetarptr  ($3,$5);}
    |'+' ',' Dato ',' Dato ',' HEAP {parser.struct.op.aumentarpth  ($3,$5);}
    |'-' ',' Dato ',' Dato ',' PTR {parser.struct.op.disminuirptr ($3,$5);}
    ;

Asignacion
    : '=' ',' Dato ',' ',' TEMPORAL{parser.struct.op.setValTemp($6,$3); console.log("Asignacion");}
    ;
Salto
    : JMP ',' ',' ',' ETIQUETA {parser.indice.valor = parser.struct.op.eitqueta($5);}
    ;
SaltoP
    : JE  ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.igual($3,$7,$5,parser.indice.valor);}
    | JNE ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.noigual($3,$7,$5,parser.indice.valor);}
    | JG  ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.mayorque($3,$7,$5,parser.indice.valor);}
    | JGE ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.mayorIgual($3,$7,$5,parser.indice.valor);}
    | JL  ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.menorque($3,$7,$5,parser.indice.valor);}
    | JLE ',' Dato ',' Dato ',' ETIQUETA {parser.indice.valor = parser.struct.op.menorIgual($3,$7,$5,parser.indice.valor);}
    ;
Metodo
    : BEGIN ',' ',' ',' ID {(parser.struct.op.begin($5));}
    ;

ReMetodo
   : END ',' ',' ',' ID {parser.indice.valor = parser.struct.op.endMetodo($5);}
   ;
LlamarMetodo
    : CALL ',' ',' ',' ID {parser.indice.valor = parser.struct.op.callMetodo($5);}
    ;
GuardarARR
    : '<=' ',' Dato ',' Dato ',' STACK {parser.struct.op.setSTACK($3,$5);}
    | '<=' ',' Dato ',' Dato ',' HEAP  {parser.struct.op.setHEAP ($3,$5);}
    ;
ObtenerARR
    : '=>' ',' Dato ',' TEMPORAL ',' STACK {parser.struct.op.getSTACK($3,$5);}
    | '=>' ',' Dato ',' TEMPORAL ',' HEAP  {parser.struct.op.getHEAP ($3,$5);}
    ;
Print 
    : PRINT '('CARA ',' Dato ')' ';'{parser.struct.op.printC ($5);}
    | PRINT '('DIGITO ',' Dato ')' ';' {parser.struct.op.printD ($5);}
    | PRINT '('FLOAT ',' Dato ')' ';' {parser.struct.op.printD ($5);}
    ;
Lectura
    : CALL ',' ',' ',' INVALUE{parser.struct.op.leer ($5);}
    ;

Dato
    : TEMPORAL {$$ = parser.struct.op.getValtemp($1);}
    | NUMBERLIST{$$ = parser.struct.op.convertiNumero($1);}
    | STACK {$$ = parser.struct.op.ptr; }
    | HEAP  {$$ = parser.struct.op.pth; }
    | PTR   {$$ = parser.struct.op.ptr; }
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