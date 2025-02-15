import {BinaryExpr, Expr, Identifer, NumericLiteral, Program, Stmt,} from "../ast/ast.ts";
import {Token, tokenize, TokenType} from "../lexer/lexer.ts";

export default class Parser {
    private tokens: Token[] = [];

    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private eat() {
        return this.tokens.shift() as Token;
    }
    private expect(type: TokenType, err: string) {
        const prev = this.tokens.shift();
        if (!prev || prev.type != type) {
            console.error("Parser Error: \n", err, prev, " - Expecting: ", type);
            Deno.exit();
        }
        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program :Program  = {
            kind: "Program",
            body:[],
        };

        // Parse until end of file
        while (this.not_eof()) {
            program.body.push(this.parseStmt());
        }
        return <Program> program;
    }

    private parseStmt(): Stmt {
        return this.parseExpr();
    }
    private parseExpr(): Expr {
        return this.parseAdditiveExpression();
    }

    //10 + 5 - 5
    private parseAdditiveExpression(): Expr {
        let left = this.parseMultiplicativeExpr();

        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parseMultiplicativeExpr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    private parseMultiplicativeExpr(): Expr {
        let left = this.parsePrimaryExpression();
        while (
            this.at().value == "*" || this.at().value == "/" ||
            this.at().value == "%"
        ) {
            const operator = this.eat().value;
            const right = this.parsePrimaryExpression();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    //Order of Precedence
    //Assignment Expr
    //MemberExpr
    //Function Call
    //Logical Expr
    //ComparisonExpr
    //AdditiveExpr
    //Muliplicative Expr
    //UnaryExpr
    //PrimaryExpr

    private parsePrimaryExpression(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.IDENTIFIER:
                return {
                    kind: "Identifier",
                    symbol: this.eat().value,
                } as Identifer;
            case TokenType.NUMBER:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;
            case TokenType.OPEN_PAREN: {
                this.eat();
                const value = this.parseExpr();
                this.expect(
                    TokenType.CLOSE_PAREN,
                    "Unexpected Token found inside parenthesized expression, Expected closing parenthesis",
                );
                return value;
            }

            default:
                console.error(
                    "Unexpected token found during parsing",
                    this.at(),
                );
                Deno.exit(1);
        }
    }
}
