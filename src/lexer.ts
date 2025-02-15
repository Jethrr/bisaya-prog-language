//MUGNO NUMERO x = 15
export enum TokenType {
    //data types
    NUMBER,// number
    NUMERO, // int
    LETRA, //char
    TIPIK, // float
    HILO, //string
    KAMATUORAN, //boolean

    //keywords
    MUGNO, // let or var
    TINUOD, // true
    DILI_TINUOD, // false
    WALA,  //undefined
    TIGPAILA, //IDENTIFIER

    //symbols
    OPEN_PAREN, // (
    CLOSE_PAREN, // )
    BINARY_OPERATOR,   //Operations
    EQUALS, //assignment


    //control structures
    KUNG, //if
    KUNG_DILI, //else
    KUNG_DILI_KAY, //else if


    //loops
    SAMTANG,//while
    BUHAT, //do
    PARA_SA,//for
}

const KEYWORDS: Record<string, TokenType> = {
    //data types
    "NUMERO": TokenType.NUMERO,
    "LETRA": TokenType.LETRA,
    "TIPIK": TokenType.TIPIK,
    "HILO": TokenType.HILO,
    "KAMATUORAN": TokenType.KAMATUORAN,
    //keywords
    "MUGNO": TokenType.MUGNO,
    "TINUOD": TokenType.TINUOD,
    "DILI_TINUOD": TokenType.DILI_TINUOD,
    "WALA": TokenType.WALA,
    //control structures
    "KUNG": TokenType.KUNG,
    "KUNG_DILI": TokenType.KUNG_DILI,
    "KUNG_DILI_KAY": TokenType.KUNG_DILI_KAY,
    //loops
    "SAMTANG" : TokenType.SAMTANG,
    "BUHAT" : TokenType.BUHAT,
    "PARA_SA" : TokenType.PARA_SA,
};

export interface Token {
    value: string,
    type: TokenType,
}

function token(value = "", type: TokenType): Token {
    return {value, type};
}

function isAlpha(src: string) {
    return src.toUpperCase() !== src.toLowerCase();
}

function isSkippable(src: string) {
    return src === ' ' || src == '\n' || src ==='\t';
}

function isInt(src: string) {
    const c = src.charCodeAt(0)
    // get the unicode value of 0 to 9 which gets all numeric value, is then used to check if its lower or higher than 0 and 9 which means its not a number
    const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)]
    return c >= bounds[0] && c <= bounds[1];
}


export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");
    // delete all blank spaces

    while (src.length > 0) {
        if (src[0] === "(") {
            tokens.push(token(src.shift(), TokenType.OPEN_PAREN));
        } else if (src[0] === ")") {
            tokens.push(token(src.shift(), TokenType.CLOSE_PAREN))
        } else if (src[0] === "+" || src[0] === "-" || src[0] === "*" || src[0] === "/") {
            tokens.push(token(src.shift(), TokenType.BINARY_OPERATOR))
        } else if (src[0] === "=") {
            tokens.push(token(src.shift(), TokenType.EQUALS))
        } else {
            //MULTICHARACTER TOKENS
            //collects all integers
            if (isInt(src[0])) {
                let num = "";

                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
                tokens.push(token(num, TokenType.NUMBER))
                //collects all alphabet
            } else if (isAlpha(src[0])) {
                let ident = ""
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }

                const reserved = KEYWORDS[ident]
                if (reserved === undefined) {
                    tokens.push(token(ident, TokenType.TIGPAILA))
                } else {
                    tokens.push(token(ident, reserved))
                }


            }else if(isSkippable(src[0])){
                src.shift(); // Skip characters
            } else{
                console.error("Unrecognized character found in source: ", src[0]);
                Deno.exit()
            }




        }


    }


    return tokens;
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)){
    console.log(token);
}




