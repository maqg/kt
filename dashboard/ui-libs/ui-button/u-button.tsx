import * as React from 'react';
import {Component, FocusEvent, MouseEvent} from "react";

export interface UButtonProps {
    graph?: any,
    label?: string,
    className?: string[],
    disabled?: boolean,
    onClick?: (e: MouseEvent) => void
}

export interface UButtonStates {
    isHover:boolean,
    isDown: boolean,
    isFocus: boolean
}
export class UButton extends Component<UButtonProps, UButtonStates>{
    constructor(props: UButtonProps) {
        super(props);
        this.state = {
            isHover: false,
            isDown: false,
            isFocus: false
        }
    }
    onMouseEnter(e:MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isHover: true
        })
    }
    onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isHover: false,
            isDown: false
        })
    }
    onMouseDown(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isDown: true
        })
    }
    onMouseUp(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isDown: false
        })
    }
    onFocus(e: FocusEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isFocus: true
        })
    }
    onBlur(e: FocusEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isFocus: false
        })
    };
    onClick(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.props.onClick && this.props.onClick(e);
    }
    makeClassName() {
        let names = ['u-button'];
        if(this.props.disabled) {
            names.push('disabled');
        } else {
            if (this.state.isDown) {
                names.push('down');
            }
            if(this.state.isFocus) {
                names.push('focus');
            }
            if(this.state.isHover) {
                names.push('hover')
            }
        }
        if (this.props.className) {
            let uniqueNmaes = Array.from(new Set(this.props.className));
            names.push(...uniqueNmaes);
        }
        return names.join(' ');
    }
    render() {
        return <button className={this.makeClassName()}
                       disabled={this.props.disabled}
                       onFocus={(e)=>this.onFocus(e)}
                       onBlur={(e)=>this.onBlur(e)}
                       onClick={(e)=>this.onClick(e)}
                       onMouseLeave={(e)=>{this.onMouseLeave(e)}}
                       onMouseDown={(e)=>this.onMouseDown(e)}
                       onMouseUp={(e)=>this.onMouseUp(e)}
                       onMouseEnter={(e)=>{this.onMouseEnter(e)}} >
            {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
            {this.props.label && <span className={'label'}>{this.props.label}</span>}
        </button>
    }
}