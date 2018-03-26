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
"-"                                                         return '-'
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



                                                     
\"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])*\"  yytext = yytext.substr(1,yyleng-2); return 'STRINGLIST';
{int}{frac}{exp}?\b                                         return 'NUMBERLIST'
"t"{int}                                                     return 'TEMPORAL'
"l"{int}                                                     return 'ETIQUETA'

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
    ;

Op
    :'+' ',' Dato ',' Dato ',' TEMPORAL
    |'-' ',' Dato ',' Dato ',' TEMPORAL
    |'*' ',' Dato ',' Dato ',' TEMPORAL
    |'/' ',' Dato ',' Dato ',' TEMPORAL
    ;

Asignacion
    : '=' ',' Dato ',' ',' TEMPORAL
    ;
Salto
    : JMP ',' ',' ',' ETIQUETA    
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
    : TEMPORAL 
    | NUMBERLIST
    | STRINGLIST
    ;

%% 
function Nodo ( term, location, token , childNode) {
  this.term =term;
  this.location = location;
  this.token = token;
  this.childNode = childNode;
}

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