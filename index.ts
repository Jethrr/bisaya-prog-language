import { tokenize } from "./src/frontend/lexer/lexer";

const sourceCode = "MUGNO NUMERO x = 15";

try {
  const tokens = tokenize(sourceCode);
  console.log(tokens);
} catch (error) {
  console.error("Lexer error: ", error);
}
