import { tokenize } from "./src/lexer"; // Replace 'yourLexerFile.js' with the actual file name

const sourceCode = "MUGNO NUMERO x = 15";

try {
  const tokens = tokenize(sourceCode);
  console.log(tokens);
} catch (error) {
  console.error("Lexer error: ", error);
}
