import * as React from "react";
import {UNavItem} from "../../ui-libs/ui-nav";
import {RefObject} from "react";
import {Route} from "react-router";
import {UIcon} from "../../ui-libs/ui-icon";
import './nav-view.scss';

export class NavView extends React.Component{
    expandList: {[key: string]: RefObject<UNavItem>};
    location: string;
    constructor(props: any) {
        super(props);
        this.expandList = {
            devNav: React.createRef(),
            logNav: React.createRef()
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
            <UNavItem label={'用户管理'} graph={<UIcon iconName={'vcard-o'}/>} path={'/main/user'}/>
            <UNavItem label={'计费管理'} graph={<UIcon iconName={'calculator'}/>} path={'/main/rent'}/>
            <UNavItem label={'设备管理'} ref={this.expandList.devNav} path={'/main/dev'} graph={<UIcon iconName={'microchip'}/>} >
                <UNavItem label={'单车管理'} graph={<UIcon iconName={'bicycle'}/>} path={'/main/dev/bike'}/>
                <UNavItem label={'单车模型'} graph={<UIcon iconName={'object-group'}/>} path={'/main/dev/bike-model'}/>
                <UNavItem label={'电池管理'} graph={<UIcon iconName={'battery-3'}/>} path={'/main/dev/battery'}/>
            </UNavItem>
            <UNavItem label={'订单管理'} graph={<UIcon iconName={'qrcode'}/>} path={'/main/order'}/>
            <UNavItem label={'记录管理'} graph={<UIcon iconName={'file-text-o'}/>} path={'/main/log'} ref={this.expandList.logNav}>
                <UNavItem label={'订单记录'} graph={<UIcon iconName={'object-group'}/>} path={'/main/log/order'}/>
                <UNavItem label={'单车记录'} graph={<UIcon iconName={'battery-3'}/>} path={'/main/log/bike'}/>
                <UNavItem label={'骑行记录'} graph={<UIcon iconName={'battery-3'}/>} path={'/main/log/ride'}/>
            </UNavItem>
        </ul>}}/>
    }
}