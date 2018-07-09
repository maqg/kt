import * as React from 'react';
import {Component} from "react";
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton} from "../../ui-libs/ui-button/u-button";

export class UComponentView extends Component{
    render() {
        return <div className={'u-component-view'}>
            <div className={'name'}>UIcon</div>
            <div className={'view'}>
                <UIcon iconName={'star'}/>
            </div>
            <div className={'name'}>UButton</div>
            <div className={'view'}>
                <UButton graph={<UIcon iconName={'star'}/>} label={'星星'}/>
                <UButton graph={<UIcon iconName={'star'}/>} disabled={true} label={'星星'}/>
            </div>
        </div>
    }
}