export type ValueTypes = "WALA" | "number";


export interface RuntimeVal{
    type : ValueTypes;
}

export interface NullVal extends RunTimeVal{
    type : "WALA"
    value : "WALA"
}
export interface NumberVal extends RunTimeVal{
    type : "number"
    value : "number"
}
