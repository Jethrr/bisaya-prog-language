export type NodeType =
    | "Program"
    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr"
    | "NullLiteral";
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

export interface NullLiteral extends Expr{
    kind : "NullLiteral",
    value : "WALA";
}
