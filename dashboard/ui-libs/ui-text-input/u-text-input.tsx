import * as React from "react";
import {ChangeEvent, Component, FocusEvent, MouseEvent, RefObject} from "react";

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
    updateValue(value: string){
        this.setState({
            value: value
        })
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
    private onInputChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        let value = e.target.value;
        this.props.onChange && this.props.onChange(value);
        this.setState({
            value: value
        })
    }
    setFocus(){
        this.inputRef.current.focus();
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
                   onChange={(e)=>{this.onInputChange(e)}}
                   onBlur={(e)=>this.onBlur(e)}
                   onFocus={(e)=>this.onFocus(e)}/>
        </div>
    }
}