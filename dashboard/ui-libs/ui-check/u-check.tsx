import * as React from "react";
import {FormEvent, MouseEvent, RefObject} from "react";
import {UIcon} from "../ui-icon";

export interface UCheckProps {
    label?: string,
    disabled?: boolean
    onCheck?: (check: boolean) => void
}

export interface UCheckStates {
    check: boolean,
    hover: boolean,
    down: boolean,
    focus: boolean
}
export class UCheck extends React.Component<UCheckProps, UCheckStates>{
    inputRef: RefObject<HTMLInputElement>;
    constructor(props: UCheckProps) {
        super(props);
        this.state ={
            check:false,
            hover: false,
            down: false,
            focus: false
        };
        this.inputRef = React.createRef();
    }
    makeClassName(): string {
        let names = ['u-check'];
        if(this.props.disabled) {
            names.push('disabled');
        } else {
            if(this.state.hover) {
                names.push('hover');
            }
            if(this.state.down) {
                names.push('down');
            }
            if(this.state.focus) {
                names.push('focus');
            }
        }
        if(this.state.check) {
            names.push('check');
        }

        return names.join(' ');
    }
    onMouseEnter(e: MouseEvent) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            hover: true
        })
    }
    onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            hover: false,
            down: false
        })
    }
    onMouseDown(e: MouseEvent) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            down: true
        })
    }
    onMouseUp(e: MouseEvent) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            down: false,
            hover: true
        })
    }
    onFocus(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            focus: true
        })
    }
    onBlur(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.setState({
            focus: false
        })
    }
    onCheckClick(e: MouseEvent) {
        e.preventDefault();
        if(this.props.disabled) return;
        this.inputRef.current.focus();
        this.setState((pre)=>{
            return {
                check: !pre.check
            }
        }, ()=>{
            if(this.props.onCheck){
                this.props.onCheck(this.state.check)
            }
        })
    }
    onCheckChange(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();
        this.setState({
            check: e.currentTarget.checked
        }, ()=>{
            if(this.props.onCheck){
                this.props.onCheck(this.state.check)
            }
        })
    }
    render() {
        return <div className={this.makeClassName()} onMouseEnter={(e)=>this.onMouseEnter(e)} onMouseLeave={(e)=>this.onMouseLeave(e)} onMouseDown={(e)=>this.onMouseDown(e)} onMouseUp={(e)=>this.onMouseUp(e)}>
            <input type={'checkbox'}
                   disabled={this.props.disabled}
                   ref={this.inputRef}
                   style={{width:0,height:0, opacity: 0, margin:0}}
                   onFocus={(e)=>this.onFocus(e)}
                   onBlur={(e)=>this.onBlur(e)}
                   onChange={(e)=>{this.onCheckChange(e)}}
                   checked={this.state.check}
            />
            {this.props.label && <span className={'label'} onClick={(e)=>this.onCheckClick(e)}>{this.props.label}</span>}
            <div className={'check-box'} onClick={(e)=>this.onCheckClick(e)}>
                <UIcon iconName={'check'} className={['check']}/>
            </div>
        </div>
    }
}