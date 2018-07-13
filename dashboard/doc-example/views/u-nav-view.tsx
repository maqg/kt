import * as React from "react";
import {Route} from "react-router";
import {UNavItem} from "../../ui-libs/ui-nav";
import {UIcon} from "../../ui-libs/ui-icon";
import {RefObject} from "react";

export class UNavView extends React.Component{
    expandList: {[key: string]: RefObject<UNavItem>};
    location: string;
    constructor(props: any) {
        super(props);
        this.expandList = {
            sysIcon: React.createRef(),
            sysBtn: React.createRef()
        }
    }
    componentDidMount(){
        for(let navItem in this.expandList) {
            let item = this.expandList[navItem];
            if(this.location.indexOf(item.current.props.path) === 0) {
                item.current.setExpand();
            }
        }
    }
    componentDidUpdate(){
        for(let navItem in this.expandList) {
            let item = this.expandList[navItem];
            if(this.location.indexOf(item.current.props.path) === 0) {
                item.current.setExpand();
            }
        }
    }
    render() {
        return <Route render={(data:any) => {return <ul className={'u-nav-list'}>
            {(this.location = data.location.pathname) && false}
            <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'} exact={true}/>
            <UNavItem label={'系统图标'} ref={this.expandList.sysIcon} path={'/icon'} graph={<UIcon iconName={'fonticons'}/>} >
                <UNavItem label={'图标组件'} graph={<UIcon iconName={'modx'}/>} path={'/icon/icon-component'}/>
                <UNavItem label={'内部图标'} graph={<UIcon iconName={'braille'}/>} path={'/icon/icon-map'}/>
            </UNavItem>
            <UNavItem label={'系统按钮'} ref={this.expandList.sysBtn} path={'/btn'} graph={<UIcon iconName={'star'}/>} >
                <UNavItem label={'按钮组件'} graph={<UIcon iconName={'modx'}/>} path={'/btn/icon-component'}/>
            </UNavItem>
            <UNavItem label={'系统组件'} graph={<UIcon iconName={'gears'}/>} path={'/comp'}>
            </UNavItem>
        </ul>}}/>
    }
}