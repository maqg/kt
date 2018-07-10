import * as React from "react";
import {Component} from "react";

export interface UTextInputProps {
    graph?: any,
    label?: string,
    isPassword: boolean,
    isError: boolean,
    disabled?: boolean,
    className: string[],
}
export interface UTextInputStates {
    isFocus: boolean,
    isHover: boolean,
}
export class UTextInput extends Component<UTextInputProps, UTextInputStates>{
    
}