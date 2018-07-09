import * as React from 'react';
import {Component} from "react";

export interface UButtonProps {

}
export interface UButtonStates {

}
export class UButton extends Component<UButtonProps, UButtonStates>{
    constructor(props: UButtonProps) {
        super(props);
    }
    render() {
        return <button></button>
    }
}