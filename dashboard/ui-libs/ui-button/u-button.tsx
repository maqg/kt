import * as React from 'react';
import {Component, FocusEvent, MouseEvent, RefObject} from "react";

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
    buttonRef: RefObject<HTMLButtonElement>;
    constructor(props: UButtonProps) {
        super(props);
        this.state = {
            isHover: false,
            isDown: false,
            isFocus: false
        };
        this.buttonRef = React.createRef();
    }
    private onMouseEnter(e:MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isHover: true
        })
    }
    private onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isHover: false,
            isDown: false
        })
    }
    private onMouseDown(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isDown: true
        })
    }
    private onMouseUp(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isDown: false
        })
    }
    private onFocus(e: FocusEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isFocus: true
        })
    }
    private onBlur(e: FocusEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            isFocus: false
        })
    };
    private onClick(e: MouseEvent) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.buttonRef.current.focus();
        this.props.onClick && this.props.onClick(e);
    }
    private makeClassName() {
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
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(' ');
    }
    render() {
        return <button className={this.makeClassName()}
                       ref={this.buttonRef}
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