import * as React from 'react';
import {Component, MouseEvent, Ref, RefObject} from "react";
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton} from "../../ui-libs/ui-button/u-button";
import {UTextInput} from "../../ui-libs/ui-text-input/u-text-input";

export class UComponentView extends Component{
    ref:RefObject<UButton> = React.createRef();
    click(e: MouseEvent) {
        console.log(this.ref);
    }

    render() {
        return <div className={'u-component-view'}>
            <div className={'name'}>UIcon</div>
            <div className={'view'}>
                <UIcon iconName={'star'}/>
            </div>
            <div className={'name'}>UButton</div>
            <div className={'view'}>
                <UButton graph={<UIcon iconName={'star'}/>} label={'星星'} ref={this.ref} onClick={(e)=>{this.click(e)}}/>
                <UButton graph={<UIcon iconName={'star'}/>} disabled={true} label={'星星'}/>
            </div>
            <div className={'name'}>UTextInput</div>
            <div className={'view'}>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} isPassword={true} placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} disabled={true}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} isError={true}/>
            </div>
        </div>
    }
}