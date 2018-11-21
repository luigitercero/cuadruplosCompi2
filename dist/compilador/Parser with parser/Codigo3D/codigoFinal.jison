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

"+="                                                        return '+='
"++"                                                        return '++'
"--"                                                        return '--'
"*="                                                        return '*='
"/="                                                        return '/='
"+="                                                        return '+='
"->"                                                        return '->'
"*"                                                         return '*'
"/"                                                         return '/'
"-"                                                         return '-'
"+"                                                         return '+'
"^"                                                         return '^'
"("                                                         return '('
")"                                                         return ')'
"%"                                                         return '%'

"<="                                                        return '<='
">="                                                        return '>='
"=="                                                        return '=='
"!="                                                        return '!='

"<"                                                         return '<'
">"                                                         return '>'
"??"                                                        return '??'     


"&&"                                                        return '&&'
"||"                                                        return '||'
"|&"                                                        return '|&'
"&?"                                                        return '&?'
"|?"                                                        return '|?'
"!"                                                         return '!'             

";"                                                          return ';'
","                                                          return ','
"{"                                                          return '{'
"}"                                                          return '}'
"["                                                          return '['
"]"                                                          return ']'                                                         
":"                                                          return ':'
"@sobreescribir"            return 'SOBREESCRIBIR'
"importar"                  return 'IMPORTAR'
"hereda_de"                 return 'HEREDADE'
"clase"                     return 'CLASE'
"publico"                   return 'PUBLICO'
"privado"                   return 'PRIVADO'
"protegido"                 return 'PROTEGIDO'
"vacio"                     return 'VACIO'
"entero"                    return 'INTEGER'
"fin-si"                    return 'FINSI'
"si"                        return 'IF'
"es_verdadero"              return 'ESVERDADERO'
"es_falso"                  return 'ESFALSO' 
"evaluar_si"                return 'SWITCH'
"defecto"                   return 'DEFAULT'
"es_igual_a"                return 'CASE'
"romper"                    return 'BREAK'
"continuar"                 return 'CONTINUE'
"retorno"                   return 'RETURN'
"hacer"                     return 'DO'
"repetir"                   return 'REAPEAT'
"repetir_contando"          return 'FOR'
"repetir_mientras"          return 'REPETIRMIENTRAS'
"variable"                  return 'VARIABLE'
"desde"                     return 'DESDE'
"hasta"                     return 'HASTA'
"enciclar"                  return 'LOOP'
"contador"                  return 'COUNT'
"Principal"                 return 'PRINCIPAL'
"true"                      return 'TRUE'
"false"                     return 'FALSE'
"booleano"                   return 'BOOLEAN'
"decimal"                   return 'DOUBLE'
"caracter"                  return 'CHAR'

"imprimir"                  return 'IMPRIMIR'

"puntero"                   return 'PUNTERO'
"crearpuntero"              return 'CREARPUNTERO'
"obtenerdireccion"          return 'OBTERNERDIRECCION'
"reservarmemoria"           return 'RESERVAMEMORIA'
"consultartamanio"          return 'CONSULTARTAMANIO'
"leer_teclado"              return 'TECLADO'


"nuevo"                     return 'NUEVO'
"este"                      return 'ESTE'
"funcion"                   return 'FUNCION'
"mientras"                  return 'WHILE'
"ciclo_doble_condicion"     return 'DOBLECONDICION'
    
"HASTA_QUE"                 return 'UNTIL'
"estructura"                return 'ESTRUCTURA'
"nada"                      return 'NADA'                                           
"\""[^\"]*"\""  yytext = yytext.substr(1,yyleng-2);             return 'STRINGLIST';
{int}{frac}{exp}?\b                                         return 'NUMBERLIST2';
{int}{exp}?\b                                               return 'NUMBERLIST';
[A-Za-z_0-9_]+                                              return 'ID';
['][^\n][']                                                 return 'CARACTER'
['][\\][0][']                                               return 'NULO'
"."                                                         return '.'
"="                                                         return '='
\/(?:[^\/]|"\\/")*\/                                        return 'REGEX'
<<EOF>>                                                      return 'EOF'



/lex

/* operator associations and precedence */


%left '||' 
%left '??'
%left '&&' 
%left '!' 
%left '==' '!=' '>' '<' '>=' '<='

%left '+' '-'
%left '*' '/' '%'
%left '^'
%left UMINUS


%start inicio
%error-verbose
%% /* language grammar */
inicio:Encabezado EOF
     {
        console.log("fin");     
    nodo1= new Nodo ("Encabezado", @1,$1, [] ); nodo2= new Nodo ("EOF", @2,$2, [] ); 
      nodo = new Nodo("inicio",null,null,[$1,nodo2]);  
      parser.treeparser.raiz = nodo;  
      $$ = nodo; 
      
      }
      | EOF
  ; 
Encabezado:Import
     {nodo1= new Nodo ("Import", @1,$1, [] ); 
      nodo = new Nodo("Encabezado",null,null,[$1]);  
      $$ = nodo; }
  | Estruct
     {nodo1= new Nodo ("Estruct", @1,$1, [] );
      nodo = new Nodo("Encabezado",null,null,[$1]); 
      $$ = nodo; }
  | CrearClase
     {nodo1= new Nodo ("CrearClase", @1,$1, [] );
      nodo = new Nodo("Encabezado",null,null,[$1]); 
      $$ = nodo; }
  | Encabezado CrearClase
     {nodo1= new Nodo ("Encabezado", @1,$1, [] ); nodo2= new Nodo ("CrearClase", @2,$2, [] );
      nodo = new Nodo("Encabezado",null,null,[$1,$2]); 
      $$ = nodo; }
  | Encabezado Estruct
     {nodo1= new Nodo ("Encabezado", @1,$1, [] ); nodo2= new Nodo ("Estruct", @2,$2, [] );
      nodo = new Nodo("Encabezado",null,null,[$1,$2]); 
      $$ = nodo; }
  ; 
Import:Importar
     {nodo1= new Nodo ("Importar", @1,$1, [] ); 
      nodo = new Nodo("Import",null,null,[$1]);  
      $$ = nodo; }
  | Import Importar
     {nodo1= new Nodo ("Import", @1,$1, [] ); nodo2= new Nodo ("Importar", @2,$2, [] );
      nodo = new Nodo("Import",null,null,[$1,$2]); 
      $$ = nodo; }
  ; 
Importar:IMPORTAR '(' STRING _LIT ')' ';'
     {nodo1= new Nodo ("IMPORTAR", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("STRING", @3,$3, [] ); nodo4= new Nodo ("_LIT", @4,$4, [] ); nodo5= new Nodo ("')'", @5,$5, [] ); nodo6= new Nodo ("';'", @6,$6, [] ); 
      nodo = new Nodo("Importar",null,null,[nodo1,nodo2,nodo3,$4,nodo5,nodo6]);  
      $$ = nodo; }
  ; 
CrearClase
    :Clase '}'
     {nodo1= new Nodo ("Clase", @1,$1, [] ); nodo2= new Nodo ("'}'", @2,$2, [] ); 
      nodo = new Nodo("CrearClase",null,null,[$1,nodo2]);  
      $$ = nodo; }
  ; 
Herencia:'{'
     {nodo1= new Nodo ("'{'", @1,$1, [] ); 
      nodo = new Nodo("Herencia",null,null,[nodo1]);  
      $$ = nodo; }
  | HEREDADE ID '{'
     {nodo1= new Nodo ("HEREDADE", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] ); nodo3= new Nodo ("'{'", @3,$3, [] );
      nodo = new Nodo("Herencia",null,null,[nodo1,nodo2,nodo3]); 
      $$ = nodo; }
  ; 
Clase:CLASE ID Herencia
     {nodo1= new Nodo ("CLASE", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] ); nodo3= new Nodo ("Herencia", @3,$3, [] ); 
      nodo = new Nodo("Clase",null,null,[nodo1,nodo2,$3]);  
      $$ = nodo; }
  | Clase CuerpoClase
     {nodo1= new Nodo ("Clase", @1,$1, [] ); nodo2= new Nodo ("CuerpoClase", @2,$2, [] );
      nodo = new Nodo("Clase",null,null,[$1,$2]); 
      $$ = nodo; }
  ; 
CuerpoClase:DeclaracionClase
     {nodo1= new Nodo ("DeclaracionClase", @1,$1, [] ); 
      nodo = new Nodo("CuerpoClase",null,null,[$1]);  
      $$ = nodo; }
  | SobreEscribir
     {nodo1= new Nodo ("SobreEscribir", @1,$1, [] );
      nodo = new Nodo("CuerpoClase",null,null,[$1]); 
      $$ = nodo; }
  | Estruct
     {nodo1= new Nodo ("Estruct", @1,$1, [] );
      nodo = new Nodo("CuerpoClase",null,null,[$1]); 
      $$ = nodo; }
  
  ; 
DeclaracionClase:Visibilidad Declaracion
     {nodo1= new Nodo ("Visibilidad", @1,$1, [] ); nodo2= new Nodo ("Declaracion", @2,$2, [] ); 
      nodo = new Nodo("DeclaracionClase",null,null,[$1,$2]);  
      $$ = nodo; }
  | Declaracion
     {nodo1= new Nodo ("Declaracion", @1,$1, [] );
      nodo = new Nodo("DeclaracionClase",null,null,[$1]); 
      $$ = nodo; }
  ; 
Estruct:Cuerpo_Estruct ']' ';'
     {nodo1= new Nodo ("Cuerpo_Estruct", @1,$1, [] ); nodo2= new Nodo ("']'", @2,$2, [] ); nodo3= new Nodo ("';'", @3,$3, [] ); 
      nodo = new Nodo("Estruct",null,null,[$1,nodo2,nodo3]);  
      $$ = nodo; }
  ; 
Cuerpo_Estruct:ESTRUCTURA ID '['
     {nodo1= new Nodo ("ESTRUCTURA", @1,$1, [] ); nodo2= new Nodo ("'['", @3,$3, [] ); 
      nodo3= new Nodo ("ID", @2,$2, [] );
      nodo = new Nodo("Cuerpo_Estruct",null,null,[nodo1,nodo3,nodo2]);
      $$ = nodo; }
  | Cuerpo_Estruct Declaracion
     {nodo1= new Nodo ("Cuerpo_Estruct", @1,$1, [] ); nodo2= new Nodo ("Declaracion", @2,$2, [] );
      nodo = new Nodo("Cuerpo_Estruct",null,null,[$1,$2]); 
      $$ = nodo; }
  ; 
Declaracion:Tipo var AsignarValor     {nodo1= new Nodo ("Tipo", @1,$1, [] ); nodo2= new
 Nodo ("var", @2,$2, [] ); nodo3= new Nodo ("AsignarValor", @3,$3, [] );
      nodo = new Nodo("Declaracion",null,null,[$1,$2,$3]);
      $$ = nodo; }
  | ID var AsignarValor
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] ); nodo3= new Nodo ("AsignarValor", @3,$3, [] );
      nodo = new Nodo("Declaracion",null,null,[nodo1,$2,$3]);
      $$ = nodo; }
  | CREARPUNTERO '(' Tipo ',' ID ')' AsignarValor
     {nodo1= new Nodo ("CREARPUNTERO", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("Tipo", @3,$3, [] ); nodo4= new Nodo ("','", @4,$4, [] ); nodo5= new Nodo ("ID", @5,$5, [] ); nodo6= new Nodo("')'", @6,$6, [] ); nodo7= new Nodo ("AsignarValor",@7,$7, [] );
      nodo = new Nodo("Declaracion",null,null,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7]);
      $$ = nodo; }
  | CREARPUNTERO '(' ID ',' ID ')' AsignarValor
     {nodo1= new Nodo ("CREARPUNTERO", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("ID", @3,$3, [] ); nodo4= new Nodo ("','", @4,$4, [] );nodo5= new Nodo ("ID", @5,$5, [] ); nodo6= new Nodo ("')'", @6,$6, [] ); nodo7= new Nodo ("AsignarValor", @7,$7, [] );
      nodo = new Nodo("Declaracion",null,null,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,$7]);
      $$ = nodo; }
  ;
var:ID
     {nodo1= new Nodo ("ID", @1,$1, [] ); 
      nodo = new Nodo("var",null,null,[nodo1]);  
      $$ = nodo; }
  | PUNTERO ID
    {nodo0 = new Nodo ("PUNTERO", @1,$1, [] );
     nodo1= new Nodo ("ID", @2,$2, [] );  
      nodo = new Nodo("var",null,null,[nodo0,nodo1]);  
      $$ = nodo; }
  | var '[' e ']'
     {nodo1= new Nodo ("var", @1,$1, [] ); nodo2= new Nodo ("'['", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] ); nodo4= new Nodo ("']'", @4,$4, [] );
      nodo = new Nodo("var",null,null,[$1,nodo2,$3,nodo4]); 
      $$ = nodo; }
;
AsignarValor:';'
     {nodo1= new Nodo ("';'", @1,$1, [] ); 
      nodo = new Nodo("AsignarValor",null,null,[nodo1]);  
      $$ = nodo; }
  | '=' e ';'
     {nodo1= new Nodo ("'='", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); nodo3= new Nodo ("';'", @3,$3, [] );
      nodo = new Nodo("AsignarValor",null,null,[nodo1,$2,nodo3]); 
      $$ = nodo; }
  | '=' Nuevo ';'
     {nodo1= new Nodo ("'='", @1,$1, [] ); nodo2= new Nodo ("Nuevo", @2,$2, [] ); nodo3= new Nodo ("';'", @3,$3, [] );
      nodo = new Nodo("AsignarValor",null,null,[nodo1,$2,nodo3]); 
      $$ = nodo; }
 | '=' Lista ';'
     {nodo1= new Nodo ("'='", @1,$1, [] ); nodo2= new Nodo ("Lista", @2,$2, [] ); nodo3= new Nodo ("';'", @3,$3, [] );
      nodo = new Nodo("AsignarValor",null,null,[nodo1,$2,nodo3]); 
      $$ = nodo; }
  ; 
Nuevo:NUEVO getMetodo
     {nodo1= new Nodo ("NUEVO", @1,$1, [] ); nodo2= new Nodo ("getMetodo", @2,$2, [] ); 
      nodo = new Nodo("Nuevo",null,null,[nodo1,$2]);  
      $$ = nodo; }
  ; 
Visibilidad:PUBLICO
     {nodo1= new Nodo ("PUBLICO", @1,$1, [] ); 
      nodo = new Nodo("Visibilidad",null,null,[nodo1]);  
      $$ = nodo; }
  | PRIVADO
     {nodo1= new Nodo ("PRIVADO", @1,$1, [] );
      nodo = new Nodo("Visibilidad",null,null,[nodo1]); 
      $$ = nodo; }
  | PROTEGIDO
     {nodo1= new Nodo ("PROTEGIDO", @1,$1, [] );
      nodo = new Nodo("Visibilidad",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
Tipo:INTEGER
     {nodo1= new Nodo ("INTEGER", @1,$1, [] ); 
      nodo = new Nodo("Tipo",null,null,[nodo1]);  
      $$ = nodo; }
  | BOOLEAN
     {nodo1= new Nodo ("BOOLEAN", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | CHAR
     {nodo1= new Nodo ("CHAR", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | DOUBLE
     {nodo1= new Nodo ("DOUBLE", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | VACIO
     {nodo1= new Nodo ("VACIO", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | FUNCION
     {nodo1= new Nodo ("FUNCION", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | LISTA
     {nodo1= new Nodo ("LISTA", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | PILA
     {nodo1= new Nodo ("PILA", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  | COLA
     {nodo1= new Nodo ("COLA", @1,$1, [] );
      nodo = new Nodo("Tipo",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
CrearMetodo:Visibilidad Metodo '}'
     {nodo1= new Nodo ("Visibilidad", @1,$1, [] ); nodo2= new Nodo ("Metodo", @2,$2, [] ); nodo3= new Nodo ("'}'", @3,$3, [] ); 
      nodo = new Nodo("CrearMetodo",null,null,[$1,$2,nodo3]);  
      $$ = nodo; }
  | Metodo '}'
     {nodo1= new Nodo ("Metodo", @1,$1, [] ); nodo2= new Nodo ("'}'", @2,$2, [] );
      nodo = new Nodo("CrearMetodo",null,null,[$1,nodo2]); 
      $$ = nodo; }
  ; 
SobreEscribir:SOBREESCRIBIR CrearMetodo
     {nodo1= new Nodo ("SOBREESCRIBIR", @1,$1, [] ); nodo2= new Nodo ("CrearMetodo", @2,$2, [] ); 
      nodo = new Nodo("SobreEscribir",null,null,[nodo1,$2]);  
      $$ = nodo; }
  | CrearMetodo
     {nodo1= new Nodo ("CrearMetodo", @1,$1, [] );
      nodo = new Nodo("SobreEscribir",null,null,[$1]); 
      $$ = nodo; }
  ; 
Metodo:
 Tipo ID '(' Parametros '{'
     {nodo1= new Nodo ("tip", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] ); nodo3= new Nodo ("'('", @3,$3, [] ); nodo4=new Nodo ("Parametros", @4,$4, [] ); nodo5= new Nodo ("'{'", @5,$5, [] );
      nodo = new Nodo("Metodo",null,null,[$1,nodo2,nodo3,$4,nodo5]);
      $$ = nodo; }
  |Tipo tipID ID '(' Parametros '{'
     { nodo2= new Nodo ("ID", @3,$3, [] ); nodo3= new Nodo ("'('", @4,$4, [] ); nodo5= new Nodo ("'{'", @6,$6, [] );
      nodo = new Nodo("Metodo",null,null,[$1,$2,nodo2,nodo3,$5,nodo5]);
      $$ = nodo; }
  | ID ID '(' Parametros '{'
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] ); nodo3= new Nodo ("'('", @3,$3, [] ); nodo4= new Nodo ("Parametros", @4,$4, [] ); nodo5= new Nodo ("'{'", @5,$5, [] );
      nodo = new Nodo("Metodo",null,null,[nodo1,nodo2,nodo3,$4,nodo5]);
      $$ = nodo; }
  | ID tipID ID '(' Parametros '{'
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("tipID", @2,$2, [] ); nodo3= new Nodo ("ID", @3,$3, [] ); nodo4= new Nodo ("'('", @4,$4, [] ); nodo5= new Nodo ("Parametros", @5,$5, [] ); nodo6=new Nodo ("'{'", @6,$6, [] );
      nodo = new Nodo("Metodo",null,null,[nodo1,$2,nodo3,nodo4,$5,nodo6]);
      $$ = nodo; }
  | Metodo CuerpoMetodo
     {nodo1= new Nodo ("Metodo", @1,$1, [] ); nodo2= new Nodo ("CuerpoMetodo", @2,$2, [] );
      nodo = new Nodo("Metodo",null,null,[$1,$2]);
      $$ = nodo; }
  | Constructor
     {nodo1= new Nodo ("Constructor", @1,$1, [] );
      nodo = new Nodo("Metodo",null,null,[$1]);
      $$ = nodo; }
  | Principal
     {nodo1= new Nodo ("Principal", @1,$1, [] );
      nodo = new Nodo("Metodo",null,null,[$1]);
      $$ = nodo; }
  ;

tipID:'[' ']'
     {nodo1= new Nodo ("'['", @1,$1, [] ); nodo2= new Nodo ("']'", @2,$2, [] );
      nodo = new Nodo("tipID",null,null,[nodo1,nodo2]);
      $$ = nodo; }
  | tipID '[' ']'
     {nodo1= new Nodo ("tipID", @1,$1, [] ); nodo2= new Nodo ("'['", @2,$2, [] );nodo3= new Nodo ("']'", @3,$3, [] );
      nodo = new Nodo("tipID",null,null,[$1,nodo2,nodo3]);
      $$ = nodo; }
  ;
Constructor:ID '(' Parametros '{'
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("Parametros", @3,$3, [] ); nodo4= new Nodo ("'{'", @4,$4, [] ); 
      nodo = new Nodo("Constructor",null,null,[nodo1,nodo2,$3,nodo4]);  
      $$ = nodo; }
  ; 

Parametros:Parametro ')'
     {nodo1= new Nodo ("Parametro", @1,$1, [] ); nodo2= new Nodo ("')'", @2,$2, [] ); 
      nodo = new Nodo("Parametros",null,null,[$1,nodo2]);  
      $$ = nodo; }
  | ')'
     {nodo1= new Nodo ("')'", @1,$1, [] );
      nodo = new Nodo("Parametros",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
Parametro:Tipo var
     {nodo1= new Nodo ("Tipo", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] ); 
      nodo = new Nodo("Parametro",null,null,[$1,$2]);  
      $$ = nodo; }
  | ID var
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] );
      nodo = new Nodo("Parametro",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | Parametro ',' Tipo var
     {nodo1= new Nodo ("Parametro", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("Tipo", @3,$3, [] ); nodo4= new Nodo ("var", @4,$4, [] );
      nodo = new Nodo("Parametro",null,null,[$1,nodo2,$3,$4]); 
      $$ = nodo; }
  | Parametro ',' ID var
     {nodo1= new Nodo ("Parametro", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("ID", @3,$3, [] ); nodo4= new Nodo ("var", @4,$4, [] );
      nodo = new Nodo("Parametro",null,null,[$1,nodo2,nodo3,$4]); 
      $$ = nodo; }
  ; 

CuerpoMetodo:Declaracion
     {nodo1= new Nodo ("Declaracion", @1,$1, [] ); 
      nodo = new Nodo("CuerpoMetodo",null,null,[$1]);  
      $$ = nodo; }
  | Asignacion
     {nodo1= new Nodo ("Asignacion", @1,$1, [] );
      nodo = new Nodo("CuerpoMetodo",null,null,[$1]); 
      $$ = nodo; }
  | getMetodoZ ';'
     {nodo1= new Nodo ("getMetodoZ", @1,$1, [] ); nodo2= new Nodo ("';'", @2,$2, [] );
      nodo = new Nodo("CuerpoMetodo",null,null,[$1,nodo2]); 
      $$ = nodo; }
  | Control
     {nodo1= new Nodo ("Control", @1,$1, [] );
      nodo = new Nodo("CuerpoMetodo",null,null,[$1]); 
      $$ = nodo; }
  | Branching ';'
     {nodo1= new Nodo ("Branching", @1,$1, [] ); nodo2= new Nodo ("';'", @2,$2, [] );
      nodo = new Nodo("CuerpoMetodo",null,null,[$1,nodo2]); 
      $$ = nodo; }
  ; 
Asignacion
  :var Asignar ';'
     {nodo1= new Nodo ("var", @1,$1, [] ); nodo2= new Nodo ("Asignar", @2,$2, [] ); nodo3= new Nodo ("';'", @3,$3, [] ); 
      nodo = new Nodo("Asignacion",null,null,[$1,$2,nodo3]);  
      $$ = nodo; }
  | Navegar var Asignar ';'
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] ); nodo3= new Nodo ("Asignar", @3,$3, [] ); nodo4= new Nodo ("';'", @4,$4, [] );
      nodo = new Nodo("Asignacion",null,null,[$1,$2,$3,nodo4]); 
      $$ = nodo; }
  ; 
Asignar:'+=' e 
     {nodo1= new Nodo ("'+='", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] );
      nodo = new Nodo("Asignar",null,null,[nodo1,$2]);  
      $$ = nodo; }
  | '*=' e 
     {nodo1= new Nodo ("'*='", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); 
      nodo = new Nodo("Asignar",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | '/=' e 
     {nodo1= new Nodo ("'/='", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); 
      nodo = new Nodo("Asignar",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | '++' 
     {nodo1= new Nodo ("'++'", @1,$1, [] ); 
      nodo = new Nodo("Asignar",null,null,[nodo1]); 
      $$ = nodo; }
  | '--' 
     {nodo1= new Nodo ("'--'", @1,$1, [] );
      nodo = new Nodo("Asignar",null,null,[nodo1]); 
      $$ = nodo; }
  | '=' Nuevo 
     {nodo1= new Nodo ("'='", @1,$1, [] ); nodo2= new Nodo ("Nuevo", @2,$2, [] ); 
      nodo = new Nodo("Asignar",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | '=' e 
     {nodo1= new Nodo ("'='", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); 
      nodo = new Nodo("Asignar",null,null,[nodo1,$2]); 
      $$ = nodo; }
  ; 



Navegar:var '.'
     {nodo1= new Nodo ("var", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] ); 
      nodo = new Nodo("Navegar",null,null,[$1,nodo2]);  
      $$ = nodo; }
  | var '->'
     {nodo1= new Nodo ("var", @1,$1, [] ); nodo2= new Nodo ("'->'", @2,$2, [] );
      nodo = new Nodo("Navegar",null,null,[$1,nodo2]); 
      $$ = nodo; }
  | getMetodo '.'
     {nodo1= new Nodo ("getMetodo", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] );
      nodo = new Nodo("Navegar",null,null,[$1,nodo2]); 
      $$ = nodo; }
  | getMetodo '->'
     {nodo1= new Nodo ("getMetodo", @1,$1, [] ); nodo2= new Nodo ("'->'", @2,$2, [] );
      nodo = new Nodo("Navegar",null,null,[$1,nodo2]); 
      $$ = nodo; }
  | Navegar var '.'
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] ); nodo3= new Nodo ("'.'", @3,$3, [] );
      nodo = new Nodo("Navegar",null,null,[$1,$2,nodo3]); 
      $$ = nodo; }
  | Navegar getMetodo '.'
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("getMetodo", @2,$2, [] ); nodo3= new Nodo ("'.'", @3,$3, [] );
      nodo = new Nodo("Navegar",null,null,[$1,$2,nodo3]); 
      $$ = nodo; }
  | Navegar var '->'
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("var", @2,$2, [] ); nodo3= new Nodo ("'->'", @3,$3, [] );
      nodo = new Nodo("Navegar",null,null,[$1,$2,nodo3]); 
      $$ = nodo; }
  | Navegar getMetodo '->'
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("getMetodo", @2,$2, [] ); nodo3= new Nodo ("'->'", @3,$3, [] );
      nodo = new Nodo("Navegar",null,null,[$1,$2,nodo3]); 
      $$ = nodo; }
  | ESTE '.'
     {nodo1= new Nodo ("ESTE", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] );
      nodo = new Nodo("Navegar",null,null,[nodo1,nodo2]); 
      $$ = nodo; }
  ; 

Control:If1
     {nodo1= new Nodo ("If1", @1,$1, [] ); 
      nodo = new Nodo("Control",null,null,[$1]);  
      $$ = nodo; }
  | If2
     {nodo1= new Nodo ("If2", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  |If3
        {nodo1= new Nodo ("If2", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Switch
     {nodo1= new Nodo ("Switch", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | While
     {nodo1= new Nodo ("While", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Do_While
     {nodo1= new Nodo ("Do_While", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Repeat_Until
     {nodo1= new Nodo ("Repeat_Until", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | For
     {nodo1= new Nodo ("For", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Loop
     {nodo1= new Nodo ("Loop", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Count
     {nodo1= new Nodo ("Count", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Doble_Condicion
     {nodo1= new Nodo ("Doble_Condicion", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  | Repetir
     {nodo1= new Nodo ("Repetir", @1,$1, [] );
      nodo = new Nodo("Control",null,null,[$1]); 
      $$ = nodo; }
  ; 


If1:IF Expresion  ESVERDADERO Cuerpo ESFALSO Cuerpo Finsi
     {nodo1= new Nodo ("IF", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] );  nodo4= new Nodo ("ESVERDADERO", @3,$3, [] ); nodo5= new Nodo ("Cuerpo", @4,$4, [] ); nodo6= new Nodo ("ESFALSO", @5,$5, [] ); nodo7= new Nodo ("Cuerpo", @6,$6, [] ); nodo8= new Nodo ("FINSI", @7,$7, [] ); 
      nodo = new Nodo("If1",null,null,[nodo1,$2,nodo4,$4,nodo6,$6,nodo8]);  
      $$ = nodo; }
  ;
Finsi:
    FINSI {$$=$1}
    
;
If2:IF Expresion  ESFALSO Cuerpo ESVERDADERO Cuerpo Finsi
     {nodo1= new Nodo ("IF", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] );  nodo4= new Nodo ("ESFALSO", @3,$3, [] ); nodo5= new Nodo ("Cuerpo", @4,$4, [] ); nodo6= new Nodo ("ESVERDADERO", @5,$5, [] ); nodo7= new Nodo ("Cuerpo", @6,$6, [] ); nodo8= new Nodo ("FINSI", @7,$7, [] ); 
      nodo = new Nodo("If2",null,null,[nodo1,$2,nodo4,$4,nodo6,$6,nodo8]);  
      $$ = nodo; }
  ;

  If3:IF Expresion  ESVERDADERO Cuerpo Finsi
     {nodo1= new Nodo ("IF", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] );  nodo4= new Nodo ("ESVERDADERO", @3,$3, [] ); nodo5= new Nodo ("Cuerpo", @4,$4, [] ); nodo8= new Nodo ("FINSI", @5,$5, [] ); 
      nodo = new Nodo("If3",null,null,[nodo1,$2,nodo4,$4,nodo8]);  
      $$ = nodo; }
  ; 
Switch:SWITCH Expresion '{' CuerpoSwitch Default
     {nodo1= new Nodo ("SWITCH", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] ); nodo3= new Nodo ("'{'", @3,$3, [] ); nodo4= new Nodo ("CuerpoSwitch", @4,$4, [] ); nodo5= new Nodo ("Default", @5,$5, [] ); 
      nodo = new Nodo("Switch",null,null,[nodo1,$2,nodo3,$4,$5]);  
      $$ = nodo; }
  ; 
Default:DEFAULT ':' Cuerpo1 '}'
     {nodo1= new Nodo ("DEFAULT", @1,$1, [] ); nodo2= new Nodo ("':'", @2,$2, [] ); nodo3= new Nodo ("Cuerpo1", @3,$3, [] ); nodo4= new Nodo ("'}'", @4,$4, [] ); 
      nodo = new Nodo("Default",null,null,[nodo1,nodo2,$3,nodo4]);  
      $$ = nodo; }
  | '}'
     {nodo1= new Nodo ("'}'", @1,$1, [] );
      nodo = new Nodo("Default",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
Cuerpo: '{' Cuerpo1 '}'
     {nodo1= new Nodo ("'{'", @1,$1, [] ); nodo2= new Nodo ("Cuerpo1", @2,$2, [] ); nodo3= new Nodo ("'}'", @3,$3, [] ); 
      nodo = new Nodo("Cuerpo",null,null,[nodo1,$2,nodo3]);  
      $$ = nodo; }
  | '{' '}'
     {nodo1= new Nodo ("'{'", @1,$1, [] ); nodo2= new Nodo ("'}'", @2,$2, [] );
      nodo = new Nodo("Cuerpo",null,null,[nodo1,nodo2]); 
      $$ = nodo; }
  ; 
Cuerpo1:Cuerpo1 CuerpoMetodo
     {nodo1= new Nodo ("Cuerpo1", @1,$1, [] ); nodo2= new Nodo ("CuerpoMetodo", @2,$2, [] ); 
      nodo = new Nodo("Cuerpo1",null,null,[$1,$2]);  
      $$ = nodo; }
  | CuerpoMetodo
     {nodo1= new Nodo ("CuerpoMetodo", @1,$1, [] );
      nodo = new Nodo("Cuerpo1",null,null,[$1]); 
      $$ = nodo; }
  ; 
CuerpoSwitch:CuerpoSwitch Caso
     {nodo1= new Nodo ("CuerpoSwitch", @1,$1, [] ); nodo2= new Nodo ("Caso", @2,$2, [] ); 
      nodo = new Nodo("CuerpoSwitch",null,null,[$1,$2]);  
      $$ = nodo; }
  | Caso
     {nodo1= new Nodo ("Caso", @1,$1, [] );
      nodo = new Nodo("CuerpoSwitch",null,null,[$1]); 
      $$ = nodo; }
  ; 
Caso:CASE e ':' Cuerpo1
     {nodo1= new Nodo ("CASE", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); nodo3= new Nodo ("':'", @3,$3, [] ); nodo4= new Nodo ("Cuerpo1", @4,$4, [] ); 
      nodo = new Nodo("Caso",null,null,[nodo1,$2,nodo3,$4]);  
      $$ = nodo; }
    |CASE e ':'
     {nodo1= new Nodo ("CASE", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); nodo3= new Nodo ("':'", @3,$3, [] ); 
      nodo = new Nodo("Caso",null,null,[nodo1,$2,nodo3]);  
      $$ = nodo; }
  ; 
Branching:BREAK
     {nodo1= new Nodo ("BREAK", @1,$1, [] ); 
      nodo = new Nodo("Branching",null,null,[nodo1]);  
      $$ = nodo; }
  | BREAK ID
     {nodo1= new Nodo ("BREAK", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] );
      nodo = new Nodo("Branching",null,null,[nodo1,nodo2]); 
      $$ = nodo; }
  | CONTINUE
     {nodo1= new Nodo ("CONTINUE", @1,$1, [] );
      nodo = new Nodo("Branching",null,null,[nodo1]); 
      $$ = nodo; }
  | RETURN
     {nodo1= new Nodo ("RETURN", @1,$1, [] );
      nodo = new Nodo("Branching",null,null,[nodo1]); 
      $$ = nodo; }
  | RETURN e
     {nodo1= new Nodo ("RETURN", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] );
      nodo = new Nodo("Branching",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | RETURN Nuevo 
     {nodo1= new Nodo ("RETURN", @1,$1, [] );
     nodo2= new Nodo ("Nuevo", @2,$2, [] ); ``
      nodo = new Nodo("Branching",null,null,[nodo1,$2]);
      $$ = nodo; }
  ; 
Expresion:'(' e ')'
     {nodo1= new Nodo ("'('", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); nodo3= new Nodo ("')'", @3,$3, [] ); 
      nodo = new Nodo("Expresion",null,null,[nodo1,$2,nodo3]);  
      $$ = nodo; }
  ; 
Do_While:DO Cuerpo WHILE Expresion ';'
     {nodo1= new Nodo ("DO", @1,$1, [] ); nodo2= new Nodo ("Cuerpo", @2,$2, [] ); nodo3= new Nodo ("WHILE", @3,$3, [] ); nodo4= new Nodo ("Expresion", @4,$4, [] ); 
      nodo = new Nodo("Do_While",null,null,[nodo1,$2,nodo3,$4]);  
      $$ = nodo; }
  ; 
Doble_Condicion:DOBLECONDICION '(' e ',' e ')' Cuerpo
     {nodo1= new Nodo ("DOBLECONDICION", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] ); nodo4= new Nodo ("','", @4,$4, [] ); nodo5= new Nodo ("e", @5,$5, [] ); nodo6= new Nodo ("')'", @6,$6, [] ); nodo7= new Nodo ("Cuerpo", @7,$7, [] ); 
      nodo = new Nodo("Doble_Condicion",null,null,[nodo1,nodo2,$3,nodo4,$5,nodo6,$7]);  
      $$ = nodo; }
  ; 
Repeat_Until:REAPEAT Cuerpo UNTIL Expresion ';'
     {nodo1= new Nodo ("REAPEAT", @1,$1, [] ); nodo2= new Nodo ("Cuerpo", @2,$2, [] ); nodo3= new Nodo ("UNTIL", @3,$3, [] ); nodo4= new Nodo ("Expresion", @4,$4, [] ); 
      nodo = new Nodo("Repeat_Until",null,null,[nodo1,$2,nodo3,$4]);  
      $$ = nodo; }
  ; 
For:FOR '(' VARIABLE ':' ID ';' DESDE ':' e ';' HASTA ':' e ')' Cuerpo
     {nodo1= new Nodo ("FOR", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("VARIABLE", @3,$3, [] ); nodo4= new Nodo ("':'", @4,$4, [] ); nodo5= new Nodo ("ID", @5,$5, [] ); nodo6= new Nodo ("';'", @6,$6, [] ); nodo7= new Nodo ("DESDE", @7,$7, [] ); nodo8= new Nodo ("':'", @8,$8, [] ); nodo9= new Nodo ("e", @9,$9, [] ); nodo10= new Nodo ("';'", @10,$10, [] ); nodo11= new Nodo ("HASTA", @11,$11, [] ); nodo12= new Nodo ("':'", @12,$12, [] ); nodo13= new Nodo ("e", @13,$13, [] ); nodo14= new Nodo ("')'", @14,$14, [] ); nodo15= new Nodo ("Cuerpo", @15,$15, [] ); 
      nodo = new Nodo("For",null,null,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,nodo7,nodo8,$9,nodo10,nodo11,nodo12,$13,nodo14,$15]);  
      $$ = nodo; }
  ; 


Loop:LOOP ID Cuerpo
     {nodo1= new Nodo ("LOOP", @1,$1, [] ); nodo2= new Nodo ("ID", @2,$2, [] ); nodo3= new Nodo ("Cuerpo", @3,$3, [] ); 
      nodo = new Nodo("Loop",null,null,[nodo1,nodo2,$3]);  
      $$ = nodo; }
  ; 
Count:COUNT Expresion Cuerpo
     {nodo1= new Nodo ("COUNT", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] ); nodo3= new Nodo ("Cuerpo", @3,$3, [] ); 
      nodo = new Nodo("Count",null,null,[nodo1,$2,$3]);  
      $$ = nodo; }
  ; 
Repetir:REPETIRMIENTRAS Expresion Cuerpo
     {nodo1= new Nodo ("REPETIRMIENTRAS", @1,$1, [] ); nodo2= new Nodo ("Expresion", @2,$2, [] ); nodo3= new Nodo ("Cuerpo", @3,$3, [] ); 
      nodo = new Nodo("Repetir",null,null,[nodo1,$2,$3]);  
      $$ = nodo; }
  ; 


Principal
    :PRINCIPAL '(' ')' '{'
     {nodo1= new Nodo ("PRINCIPAL", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("')'", @3,$3, [] ); nodo4= new Nodo ("Cuerpo", @4,$4, [] ); 
      nodo = new Nodo("Principal",null,null,[nodo1,nodo2,nodo3,$4]);  
      $$ = nodo; }
  ; 
getMetodoZ:Navegar getMetodo
     {nodo1= new Nodo ("Navegar", @1,$1, [] ); nodo2= new Nodo ("getMetodo", @2,$2, [] ); 
      nodo = new Nodo("getMetodoZ",null,null,[$1,$2]);  
      $$ = nodo; }
  | getMetodo
     {nodo1= new Nodo ("getMetodo", @1,$1, [] );
      nodo = new Nodo("getMetodoZ",null,null,[$1]); 
      $$ = nodo; }
  ; 
getMetodo:ID '(' getParametro
     {nodo1= new Nodo ("ID", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("getParametro", @3,$3, [] ); 
      nodo = new Nodo("getMetodo",null,null,[nodo1,nodo2,$3]);  
      $$ = nodo; }
  | Primitivas '(' getParametro
     {nodo1= new Nodo ("Primitivas", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("getParametro", @3,$3, [] );
      nodo = new Nodo("getMetodo",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | Tipo '(' getParametro
     {nodo1= new Nodo ("Tipo", @1,$1, [] ); nodo2= new Nodo ("'('", @2,$2, [] ); nodo3= new Nodo ("getParametro", @3,$3, [] );
      nodo = new Nodo("getMetodo",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  ; 
getParametro:ParametroM ')'
     {nodo1= new Nodo ("ParametroM", @1,$1, [] ); nodo2= new Nodo ("')'", @2,$2, [] ); 
      nodo = new Nodo("getParametro",null,null,[$1,nodo2]);  
      $$ = nodo; }
  | ')'
     {nodo1= new Nodo ("')'", @1,$1, [] );
      nodo = new Nodo("getParametro",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
ParametroM:ParametroM ',' e
     {nodo1= new Nodo ("ParametroM", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] ); 
      nodo = new Nodo("ParametroM",null,null,[$1,nodo2,$3]);  
      $$ = nodo; }
  | ParametroM ',' Tipo
     {nodo1= new Nodo ("ParametroM", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("Tipo", @3,$3, [] );
      nodo = new Nodo("ParametroM",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | ParametroM ',' Nuevo
     {nodo1= new Nodo ("ParametroM", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("Nuevo", @3,$3, [] );
      nodo = new Nodo("ParametroM",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e
     {nodo1= new Nodo ("e", @1,$1, [] );
      nodo = new Nodo("ParametroM",null,null,[$1]); 
      $$ = nodo; }
  | Tipo
     {nodo1= new Nodo ("Tipo", @1,$1, [] );
      nodo = new Nodo("ParametroM",null,null,[$1]); 
      $$ = nodo; }
  | Nuevo
     {nodo1= new Nodo ("Nuevo", @1,$1, [] );
      nodo = new Nodo("ParametroM",null,null,[$1]); 
      $$ = nodo; }
  ; 

Primitivas:IMPRIMIR
     {nodo1= new Nodo ("IMPRIMIR", @1,$1, [] ); 
      nodo = new Nodo("Primitivas",null,null,[nodo1]);  
      $$ = nodo; }
  | CONCATENAR
     {nodo1= new Nodo ("CONCATENAR", @1,$1, [] );
      nodo = new Nodo("Primitivas",null,null,[nodo1]); 
      $$ = nodo; }
  | CONVERTIRCADENA
     {nodo1= new Nodo ("CONVERTIRCADENA", @1,$1, [] );
      nodo = new Nodo("Primitivas",null,null,[nodo1]); 
      $$ = nodo; }
  | CONVERTIRENTERO
     {nodo1= new Nodo ("CONVERTIRENTERO", @1,$1, [] );
      nodo = new Nodo("Primitivas",null,null,[nodo1]); 
      $$ = nodo; }

  | TECLADO
     {nodo1= new Nodo ("TECLADO", @1,$1, [] );
      nodo = new Nodo("Primitivas",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
e:e '+' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'+'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] ); 
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]);  
      $$ = nodo; }
  | e '-' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'-'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '*' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'*'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '/' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'/'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '%' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'%'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '^' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'^'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | '-' e
     {nodo1= new Nodo ("'-'", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] );
      nodo = new Nodo("e",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | '(' e ')'
     {nodo1= new Nodo ("'('", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] ); nodo3= new Nodo ("')'", @3,$3, [] );
      nodo = new Nodo("e",null,null,[nodo1,$2,nodo3]); 
      $$ = nodo; }
  | e '<' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'<'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '>' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'>'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '<=' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'<='", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '>=' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'>='", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '==' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'=='", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '!=' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'!='", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '&&' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'&&'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '||' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'||'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | e '??' e
     {nodo1= new Nodo ("e", @1,$1, [] ); nodo2= new Nodo ("'??'", @2,$2, [] ); nodo3= new Nodo ("e", @3,$3, [] );
      nodo = new Nodo("e",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | '!' e
     {nodo1= new Nodo ("'!'", @1,$1, [] ); nodo2= new Nodo ("e", @2,$2, [] );
      nodo = new Nodo("e",null,null,[nodo1,$2]); 
      $$ = nodo; }
  | Datos
     {nodo1= new Nodo ("Datos", @1,$1, [] );
      nodo = new Nodo("e",null,null,[$1]); 
      $$ = nodo; }
  | NADA
     {nodo1= new Nodo ("NULL", @1,$1, [] );
      nodo = new Nodo("e",null,null,[nodo1]); 
      $$ = nodo; }
  ; 
Lista:List '}'
     {nodo1= new Nodo ("List", @1,$1, [] ); nodo2= new Nodo ("'}'", @2,$2, [] ); 
      nodo = new Nodo("Lista",null,null,[$1,nodo2]);  
      $$ = nodo; }
  ; 
List:'{' DefList
     {nodo1= new Nodo ("'{'", @1,$1, [] ); nodo2= new Nodo ("DefList", @2,$2, [] ); 
      nodo = new Nodo("List",null,null,[nodo1,$2]);  
      $$ = nodo; }
  | List ',' DefList
     {nodo1= new Nodo ("List", @1,$1, [] ); nodo2= new Nodo ("','", @2,$2, [] ); nodo3= new Nodo ("DefList", @3,$3, [] );
      nodo = new Nodo("List",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  ; 
DefList:e
     {nodo1= new Nodo ("e", @1,$1, [] ); 
      nodo = new Nodo("DefList",null,null,[$1]);  
      $$ = nodo; }
  | Lista
     {nodo1= new Nodo ("Lista", @1,$1, [] );
      nodo = new Nodo("DefList",null,null,[$1]); 
      $$ = nodo; }
  | Nuevo
     {nodo1= new Nodo ("Nuevo", @1,$1, [] );
      nodo = new Nodo("DefList",null,null,[$1]); 
      $$ = nodo; }
  ; 
  
Datos:NUMBERLIST
     {nodo1= new Nodo ("NUMBERLIST", @1,$1, [] ); 
      nodo = new Nodo("Datos",null,null,[nodo1]);  
      $$ = nodo; }
 | NUMBERLIST2
     {nodo1= new Nodo ("NUMBERLIST2", @1,$1, [] ); 
      nodo = new Nodo("Datos",null,null,[nodo1]);  
      $$ = nodo; }
  | Identi
     {nodo1= new Nodo ("Identi", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[$1]); 
      $$ = nodo; }
  | STRINGLIST
     {nodo1= new Nodo ("STRINGLIST", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1]); 
      $$ = nodo; }
  | TRUE
     {nodo1= new Nodo ("TRUE", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1]); 
      $$ = nodo; }
  | FALSE
     {nodo1= new Nodo ("FALSE", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1]); 
      $$ = nodo; }
| CARACTER
    {nodo1= new Nodo ("CARACTER", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1]); 
      $$ = nodo; }
| OBTERNERDIRECCION '(' e ')'
     {nodo1= new Nodo ("OBTERNERDIRECCION", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1,$3]); 
      $$ = nodo; }
| RESERVAMEMORIA '(' e ')'
     {nodo1= new Nodo ("RESERVAMEMORIA", @1,$1, [] );
      nodo = new Nodo("Datos",null,null,[nodo1,$3]); 
      $$ = nodo; }
| CONSULTARTAMANIO '(' ID ')'
     {nodo1= new Nodo ("CONSULTARTAMANIO", @1,$1, [] );
     nodo2= new Nodo ("ID", @3,$3, [] );
      nodo = new Nodo("Datos",null,null,[nodo1,nodo2]); 
      $$ = nodo; }
  ; 
Identi:var
     {nodo1= new Nodo ("var", @1,$1, [] ); 
      nodo = new Nodo("Identi",null,null,[$1]);  
      $$ = nodo; }
  | getMetodo
     {nodo1= new Nodo ("getMetodo", @1,$1, [] );
      nodo = new Nodo("Identi",null,null,[$1]); 
      $$ = nodo; }
  | Identi '->' var
     {nodo1= new Nodo ("Identi", @1,$1, [] ); nodo2= new Nodo ("'->'", @2,$2, [] ); nodo3= new Nodo ("var", @3,$3, [] );
      nodo = new Nodo("Identi",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | Identi '->' getMetodo
     {nodo1= new Nodo ("Identi", @1,$1, [] ); nodo2= new Nodo ("'->'", @2,$2, [] ); nodo3= new Nodo ("getMetodo", @3,$3, [] );
      nodo = new Nodo("Identi",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | Identi '.' var
     {nodo1= new Nodo ("Identi", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] ); nodo3= new Nodo ("var", @3,$3, [] );
      nodo = new Nodo("Identi",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | Identi '.' getMetodo
     {nodo1= new Nodo ("Identi", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] ); nodo3= new Nodo ("getMetodo", @3,$3, [] );
      nodo = new Nodo("Identi",null,null,[$1,nodo2,$3]); 
      $$ = nodo; }
  | ESTE '.' var
     {nodo1= new Nodo ("ESTE", @1,$1, [] ); nodo2= new Nodo ("'.'", @2,$2, [] ); nodo3= new Nodo ("var", @3,$3, [] );
      nodo = new Nodo("Identi",null,null,[nodo1,nodo2,$3]); 
      $$ = nodo; }
  ; 



%%


function Nodo ( term, location, token , childNode) {
  this.term =term;
  this.location = location;
  this.token = token;
  this.childNode = childNode;
} 

parser.treeparser  = {
 raiz : null
};

 parser.error ={
  error:[]

};