export type ValueTypes = "WALA" | "number" | "TINUOD";


export interface RuntimeVal{
    type : ValueTypes;
}

export interface NullVal extends RuntimeVal{
    type : "WALA"
    value : null
}
export function MK_WALA ( n = 0){
    return {type: "WALA", value : null} as NullVal
}

export  interface  BooleanVal extends RuntimeVal{
    type : "TINUOD"
    value : boolean

}

export function MK_TINUOD ( bool = true){
    return {type: "TINUOD", value : bool} as BooleanVal;
}

export interface NumberVal extends RuntimeVal{
    type : "number"
    value : number
}

export function MK_NUMBER ( n = 0){
    return {type: "number", value : n} as NumberVal
}
