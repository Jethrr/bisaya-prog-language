import { BinaryExpr, NumericLiteral, Program, Stmt} from "../frontend/ast/ast.ts";
import {NullVal, NumberVal, RuntimeVal} from "./values.ts";

function evaluateProgram(program: Program): RuntimeVal {
    let lastEvaluated: RuntimeVal = { type: "WALA", value: "WALA" } as NullVal;
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement);
    }
    return lastEvaluated;
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
    if (operator == "+") {
        result = lhs.value + rhs.value;
    } else if (operator == "-") {
        result = (lhs.value - rhs.value) ;
    } else if (operator == "*") {
        result = lhs.value * rhs.value;
    } else if (operator == "/") {
        // TODO: Division by zero checks
        result = lhs.value / rhs.value;
    } else {
        result = lhs.value % rhs.value;
    }

    return { value: result, type: "number" };
}

/**
 * Evaulates expressions following the binary operation type.
 */
function evaluateBinaryExpression(binop: BinaryExpr): RuntimeVal {
    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);

    // Only currently support numeric operations
    if (lhs.type == "number" && rhs.type == "number") {
        return evaluateNumericBinaryExpression(
            lhs as NumberVal,
            rhs as NumberVal,
            binop.operator,
        );
    }

    // One or both are NULL
    return { type: "WALA", value: "WALA" } as NullVal;
}

export function evaluate(astNode: Stmt): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
              value: ((astNode as NumericLiteral).value),
              type: "number",
            } as unknown as NumberVal;
        case "NullLiteral":
            return { value: "WALA", type: "WALA" } as NullVal;
        case "BinaryExpr":
            return evaluateBinaryExpression(astNode as BinaryExpr);
        case "Program":
            return evaluateProgram(astNode as Program);

        // Handle unimplimented ast types as error.
        default:
            console.error(
                "This AST Node has not yet been setup for interpretation.",
                astNode,
            );
            Deno.exit(0);
    }
}