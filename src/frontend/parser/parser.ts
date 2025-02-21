import {BinaryExpr, Expr, Identifer, NumericLiteral, Program, Stmt, VarDeclaration,} from "../ast/ast.ts";
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
            console.error(
                "Parser Error: \n",
                err,
                prev,
                " - Expecting: ",
                type,
            );
            Deno.exit();
        }
        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: [],
        };

        // Parse until end of file
        while (this.not_eof()) {
            program.body.push(this.parseStmt());
        }
        return <Program> program;
    }

    private parseStmt(): Stmt {
        switch (this.at().type) {
            case TokenType.MUGNA:
                return  this.parseVarDeclaration();
            default:
                return this.parseExpr();
        }
    }

    private parseVarDeclaration(): Stmt {
        const isMugna = this.eat().type === TokenType.MUGNA;
        const dataType = this.eat().type;

        if (![TokenType.NUMERO, TokenType.TINUOD, TokenType.LETRA, TokenType.HILO, TokenType.TIPIK].includes(dataType)) {
            console.error("Unexpected token found after 'MUGNA' or datatype keyword:", this.at());
            Deno.exit(1);
        }
        const identifier = this.expect(
            TokenType.IDENTIFIER,
            "Expected identifier after Data Type",
            ).value;

        if(this.at().type === TokenType.SEMICOLON){
            this.eat() // expect semicolon
            if(isMugna)
                throw "Must assign value to a MUGNA. No value provided"

            return  {kind: "VarDeclaration" , identifier, isMugna: isMugna, dataType: dataType } as VarDeclaration;
        }

        // if no semicolon expect an value
        this.expect(TokenType.EQUALS,"Expected equals token following identifier in var declaration." );

        //parse expression until semicolon
        const declaration: VarDeclaration = {
            kind: "VarDeclaration",
            isMugna : isMugna,
            identifier: identifier,
            dataType: dataType,
            value: this.parseExpr(),
        }

        //should end with a semicolon
        this.expect(TokenType.SEMICOLON, "Expected semicolon after variable declaration");

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
