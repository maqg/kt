import * as React from "react";
import {ErrorObj} from "../../util-tools/api/api-tools";
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton} from "../../ui-libs";
import {GlobalErrorEvent} from "../../util-tools/event-tool";

import './error-slider.scss';

export interface ErrorSliderStates {
    errors: ErrorObj[],
    newErrors: ErrorObj[],
    show: boolean
}

export class ErrorSlider extends React.Component<any, ErrorSliderStates>{

    constructor(props: any) {
        super(props);
        this.state = {
            errors: [],
            newErrors: [],
            show: false
        }
    }
    componentDidMount(){
        this.handelError = this.handelError.bind(this);
        GlobalErrorEvent.handelError(this.handelError);
    }
    private handelError(err: ErrorObj) {
        this.setState((pre)=>{
            pre.errors.unshift(err);
            pre.newErrors.unshift(err);
            return pre;
        })
    }
    private makeClassName = ():string => {
        let names = ['c-error-slider'];
        if( this.state.show) {
            names.push('show');
        }
        return names.join(' ');
    };

    render() {
        return <div className={this.makeClassName()}>
            <div className={'title'}>
                <span className={'left'}>
                    <UIcon iconName={'bell'}/>
                    <span className={'label'}>错误提醒</span>
                </span>
                <span className={'right'}>
                    <UButton graph={<UIcon iconName={'close'}/>}/>
                </span>
            </div>
            <div className={'list'}>
                {this.state.errors.map(err => {
                    return <div className={'error-item'} key={err.time}>
                        <div className={'info'}>{err.errorMsg}</div>
                        <div  className={'error-title'}>
                            <span className={'no-part'}>
                                <span className={'error-title-label'}>No.</span>
                                <span className={'error-title-no'}>{(10000 + err.errorNo).toString().substr(1)}</span>
                            </span>
                            <span className={'time-part'}>
                                <span className={'time'}>{(new Date(err.time)).toLocaleTimeString()}</span>
                            </span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }
}