// Add the necessary imports and enums
export enum TokenType {
  // Data types
  NUMBER, // number
  NUMERO, // int
  LETRA, // char
  TIPIK, // float
  HILO, // string
  KAMATUORAN, // boolean

  // Keywords
  MUGNO, // let or var
  TINUOD, // true
  DILI_TINUOD, // false
  WALA, // undefined
  TIGPAILA, // identifier

  // Symbols
  OPEN_PAREN, // (
  CLOSE_PAREN, // )
  BINARY_OPERATOR, // Operations
  EQUALS, // assignment

  // Control structures
  KUNG, // if
  KUNG_DILI, // else
  KUNG_DILI_KAY, // else if

  // Loops
  SAMTANG, // while
  BUHAT, // do
  PARA_SA, // for
}

const KEYWORDS: Record<string, TokenType> = {
  // Data types
  MUGNO: TokenType.MUGNO,
  NUMERO: TokenType.NUMERO,
  LETRA: TokenType.LETRA,
  TIPIK: TokenType.TIPIK,
  HILO: TokenType.HILO,
  KAMATUORAN: TokenType.KAMATUORAN,
};

export interface Token {
  value: string;
  type: TokenType;
}

function token(value = "", type: TokenType): Token {
  return { value, type };
}

// Updated function to check for alphanumeric characters
function isAlpha(src: string) {
  return /[a-zA-Z]/.test(src); // Check if it's an alphabet character
}

// Skip spaces, newlines, and tabs
function isSkippable(src: string) {
  return src === " " || src === "\n" || src === "\t";
}

// Check if the character is an integer
function isInt(src: string) {
  return /^[0-9]$/.test(src);
}

export function tokenize(sourceCode: string): Token[] {
  const tokens: Token[] = [];
  const src = sourceCode.split("");

  while (src.length > 0) {
    // Handle spaces, newlines, and tabs (skip them)
    if (isSkippable(src[0])) {
      src.shift(); // Skip spaces
    }

    // Handle symbols (parens, operators)
    else if (src[0] === "(") {
      tokens.push(token(src.shift()!, TokenType.OPEN_PAREN));
    } else if (src[0] === ")") {
      tokens.push(token(src.shift()!, TokenType.CLOSE_PAREN));
    } else if (["+", "-", "*", "/"].includes(src[0])) {
      tokens.push(token(src.shift()!, TokenType.BINARY_OPERATOR));
    } else if (src[0] === "=") {
      tokens.push(token(src.shift()!, TokenType.EQUALS));
    }

    // MULTICHARACTER TOKENS

    // Collect integers
    else if (isInt(src[0])) {
      let num = "";

      while (src.length > 0 && isInt(src[0])) {
        num += src.shift();
      }
      tokens.push(token(num, TokenType.NUMBER));

      // Collect identifiers or keywords
    } else if (isAlpha(src[0])) {
      let ident = "";

      while (src.length > 0 && (isAlpha(src[0]) || isInt(src[0]))) {
        ident += src.shift();
      }

      const reserved = KEYWORDS[ident];
      if (reserved === undefined) {
        tokens.push(token(ident, TokenType.TIGPAILA)); // Identifier
      } else {
        tokens.push(token(ident, reserved)); // Reserved keyword
      }

      // Handle unrecognized characters
    } else {
      console.error("Unrecognized character found in source:", src[0]);
      throw new Error("Unrecognized character found in source");
    }
  }

  return tokens;
}
