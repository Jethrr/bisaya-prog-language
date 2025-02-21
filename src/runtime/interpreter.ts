import {
    BinaryExpr, Identifer,
    NumericLiteral,
    Program,
    Stmt,
} from "../frontend/ast/ast.ts";
import {MK_WALA, NumberVal, RuntimeVal} from "./values.ts";
import Environment from "./environment.ts";

function evaluateProgram(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal =MK_WALA();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }
    return lastEvaluated;
}

function  evaluateIdentifier(ident : Identifer, env : Environment){
    const value = env.lookupVar(ident.symbol);
    return value;
}
/**
 * Evaulate pure numeric operations with binary operators.
 */
function evaluateNumericBinaryExpression(
    lhs: NumberVal,
    rhs: NumberVal,
    operator: string,
): NumberVal {
    let result: number;

    switch (operator) {
        case "+":
            result = lhs.value + rhs.value;
            break;
        case "-":
            result = lhs.value - rhs.value;
            break;
        case "*":
            result = lhs.value * rhs.value;
            break;
        case "/":
            if (rhs.value === 0) {
                throw new Error("Division by 0 is not allowed");
            }
            result = lhs.value / rhs.value;
            break;
        case "%":
            result = lhs.value % rhs.value;
            break;
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
    return { value: result, type: "number" };
}

/**
 * Evaulates expressions following the binary operation type.
 */
function evaluateBinaryExpression(
    binop: BinaryExpr,
    env: Environment,
): RuntimeVal {
    const lhs = evaluate(binop.left, env);
    const rhs = evaluate(binop.right, env);

    // Only currently support numeric operations
    if (lhs.type == "number" && rhs.type == "number") {
        return evaluateNumericBinaryExpression(
            lhs as NumberVal,
            rhs as NumberVal,
            binop.operator,
        );
    }

    // One or both are NULL
    return MK_WALA()
}

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number",
            } as unknown as NumberVal;

        case "Identifier":
            return evaluateIdentifier(astNode as Identifer, env);
        case "BinaryExpr":
            return evaluateBinaryExpression(astNode as BinaryExpr, env);
        case "Program":
            return evaluateProgram(astNode as Program, env);

        // Handle unimplimented ast types as error.
        default:
            console.error(
                "This AST Node has not yet been setup for interpretation.",
                astNode,
            );
            Deno.exit(0);
    }
}