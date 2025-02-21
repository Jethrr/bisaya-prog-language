import {TokenType} from "../lexer/lexer.ts";

export type NodeType =
    | "Program"

    |"VarDeclaration"
    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr"


// | "CallExpr"
// | "UnaryExpr"
// | "FunctionalDeclaration";

export interface Stmt {
    kind: NodeType;
}
export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}


//let x == undefined
export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    isMugna: boolean;
    identifier : string;
    dataType : TokenType;
    value?: Expr
}

export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    left: Expr;
    right: Expr;
    operator: string;
}

export interface Identifer extends Expr {
    kind: "Identifier";
    symbol: "string";
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

