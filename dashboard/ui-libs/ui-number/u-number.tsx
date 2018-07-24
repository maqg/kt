import * as React from "react";
import {FormEvent, RefObject} from "react";
import {MouseEvent} from "react";
import {FocusEvent} from "react";

export interface UNumberProps {
    graph?: any,
    label?: string,
    withMinus?: boolean,
    isFloat?: boolean,
    isError?: boolean,
    disabled?: boolean,
    className?: string[],
    placeholder?: string,
    onChange?: (value: number) => void
}
export interface UNumberStates {
    isFocus: boolean,
    isHover: boolean,
    value: string
}

export class UNumber extends React.Component<UNumberProps, UNumberStates>{
    inputRef: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: UNumberProps) {
        super(props);
        this.state = {
            isFocus: false,
            isHover: false,
            value: ""
        }
    }
    private makeClassName() {
        let names = ['u-text-input'];
        if (this.props.disabled) {
            names.push('disabled');
        } else {
            if(this.props.isError) {
                names.push('error');
            }
            if(this.state.isFocus) {
                names.push('focus');
            }
            if(this.state.isHover) {
                names.push('hover');
            }
        }
        if (this.props.className) {
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(" ");
    }
    private onMouseEnter(e: MouseEvent){
        e.preventDefault();
        this.setState({
            isHover:true
        })
    }
    private onMouseLeave(e: MouseEvent){
        e.preventDefault();
        this.setState({
            isHover: false
        })
    }
    private onFocus(e: FocusEvent) {
        e.preventDefault();
        this.setState({
            isFocus: true
        })
    }
    private onBlur(e: FocusEvent) {
        e.preventDefault();
        this.setState({
            isFocus: false
        })
    }
    private onInputChange(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();
        let value = e.currentTarget.value;
        if(value.length === 0) {
            this.setState({
                value: value
            }, ()=>{
                if(this.props.isFloat){
                    this.props.onChange && this.props.onChange(Number.parseFloat(value));
                } else {
                    this.props.onChange && this.props.onChange(Number.parseInt(value));
                }
            });
            return;
        }
        let reg: RegExp;
        if(this.props.isFloat) {
            if(this.props.withMinus) {
                reg = /^(-?\d+)(\.\d+)?$/;
            } else {
                reg = /^(\d+)(\.\d+)?$/;
            }
        } else {
            if(this.props.withMinus) {
                reg = /^-?\d+$/;
            } else {
                reg = /^\d+$/;
            }
        }
        if(reg.test(value)) {
            this.setState({
                value: value
            }, ()=>{
                if(this.props.isFloat){
                    this.props.onChange && this.props.onChange(Number.parseFloat(value));
                } else {
                    this.props.onChange && this.props.onChange(Number.parseInt(value));
                }
            })
        }

    }
    setFocus(){
        this.inputRef.current.focus();
    }
    setValue(value: number, notify: boolean) {
        this.setState({
            value: value+""
        }, ()=>{
            if(this.props.onChange && notify) {
                this.props.onChange(value)
            }
        })
    }
    render() {

        return <div className={this.makeClassName()}
                    onMouseEnter={(e)=>this.onMouseEnter(e)}
                    onMouseLeave={(e)=>this.onMouseLeave(e)}>
            {this.props.graph && <span className={'graph'} onClick={()=>this.setFocus()}>{this.props.graph}</span>}
            {this.props.label && <span className={'label'} onClick={()=>this.setFocus()}>{this.props.label}</span>}
            <input ref={this.inputRef}
                   className={'input'}
                   placeholder={this.props.placeholder}
                   disabled={this.props.disabled}
                   value={this.state.value}
                   onInput={(e)=>{this.onInputChange(e)}}
                   onBlur={(e)=>this.onBlur(e)}
                   onFocus={(e)=>this.onFocus(e)}/>
        </div>
    }
}