import * as React from "react";
import {Component, FocusEvent, FormEvent, MouseEvent, RefObject} from "react";

export interface UTextInputProps {
    graph?: any,
    label?: string,
    isPassword?: boolean,
    isError?: boolean,
    disabled?: boolean,
    className?: string[],
    placeholder?: string,
    onChange?: (value: string) => void
}
export interface UTextInputStates {
    isFocus: boolean,
    isHover: boolean,
    value: string
}
export class UTextInput extends Component<UTextInputProps, UTextInputStates>{
    inputRef: RefObject<HTMLInputElement> = React.createRef();

    constructor(props: UTextInputProps) {
        super(props);
        this.state = {
            isFocus: false,
            isHover: false,
            value: ''
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
        this.setState({
            value: value
        }, ()=>{
            this.props.onChange && this.props.onChange(value);
        })
    }
    setFocus(){
        this.inputRef.current.focus();
    }
    setValue(value: string, notify: boolean) {
        this.setState({
            value: value
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
                   type={this.props.isPassword?"password":"text"}
                   value={this.state.value}
                   onInput={(e)=>{this.onInputChange(e)}}
                   onBlur={(e)=>this.onBlur(e)}
                   onFocus={(e)=>this.onFocus(e)}/>
        </div>
    }
}