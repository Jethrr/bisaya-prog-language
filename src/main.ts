import Parser from "./frontend/parser/parser.ts";
import {evaluate} from "./runtime/interpreter.ts";
import Environment from "./runtime/environment.ts";
import {MK_NUMBER, MK_TINUOD, MK_WALA} from "./runtime/values.ts";


repl();

//Read Evaluate Print Loop
function repl(){
    const parser =  new Parser();
    const env = new Environment()
    env.declareVar("x", MK_NUMBER(100));
    env.declareVar("true",MK_TINUOD(true));
    env.declareVar("false",MK_TINUOD(false));
    env.declareVar("null",MK_WALA());
    console.log("Repl v0.1")
    while (true){

        const input = prompt("> ");
        if(!input || input.includes("exit")){
           Deno.exit(1)
        }
            const program = parser.produceAST(input)
        console.log(program);

        const result = evaluate(program, env)
        // console.log(result)
    }

}
