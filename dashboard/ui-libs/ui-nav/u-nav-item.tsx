import * as React from "react";
import {NavLink} from "react-router-dom";
import {UNavList} from "./u-nav-list";
import {UIcon} from "../ui-icon";

export interface UNavItemProps {
    graph?: any,
    label?: string,
    path?: string,
    className?: [string],
    expand?:boolean
}
export interface UNavItemStates {
    isExpand: boolean,
    isHover: boolean,
    isDown: boolean,
    title: string,
}
export class UNavItem extends React.Component<UNavItemProps, UNavItemStates>{
    subContainer: HTMLElement;
    constructor(props: UNavItemProps){
        super(props);
        this.state = {
            isExpand: false,
            isHover: false,
            isDown: false,
            title: this.props.children?"展开":"",
        }
    }
    componentDidMount(){
        if(this.subContainer){
            this.setState({
                isExpand: this.props.expand
            })
        }
    }
    private getContainerHeight():number{
        if(this.state.isExpand && this.subContainer) {
            return this.subContainer.offsetHeight;
        } else {
            return 0;
        }
    }
    private makeAClassName(): string {
        let names = ['u-nav-link'];
        if (this.state.isHover){
            names.push('hover');
        }
        if(this.state.isDown){
            names.push('down');
        }
        return names.join(" ");
    }
    private makeLiClassName(): string {
        let names = ['u-nav-item'];
        if (this.state.isExpand) {
            names.push('expand');
        }
        if (this.props.className) {
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(" ");
    }
    private onMouseEnter() {
        this.setState({isHover: true});
    }
    private onMouseLeave() {
        this.setState({isHover: false, isDown: false});
    }
    private onMouseDown() {
        this.setState({isDown: true});
    }
    private onMouseUp() {
        this.setState({isDown: false});
    }
    private onNavClick() {
        if (this.state.isExpand) {
            this.setState({
               isExpand: false,
               title: "展开",
            });
        } else {
            this.setState({
                isExpand: true,
                title: "收起",
            })
        }
    }

    render() {
        if (this.props.children) {
            return <li className={this.makeLiClassName()}>
                <a className={this.makeAClassName()}
                   onClick={()=>{this.onNavClick()}}
                   onMouseDown={()=>{this.onMouseDown()}}
                   onMouseUp={()=>{this.onMouseUp()}}
                   onMouseEnter={()=>{this.onMouseEnter()}}
                   onMouseLeave={()=>{this.onMouseLeave()}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                    <span className={'tail'}>
                        <UIcon iconName={'angle-right'}/>
                    </span>
                </a>
                <UNavList className={['sub-nav-list']} style={{height: this.getContainerHeight() + "px"}}>
                    <span className={'sub-nav-container'} ref={(ref)=>{this.subContainer = ref}} >
                        {this.props.children}
                    </span>
                </UNavList>
            </li>
        } else {
            return <li className={this.makeLiClassName()}>
                <NavLink className={this.makeAClassName()}
                         to={this.props.path || ''} replace
                         onMouseDown={()=>{this.onMouseDown()}}
                         onMouseUp={()=>{this.onMouseUp()}}
                         onMouseEnter={()=>{this.onMouseEnter()}}
                         onMouseLeave={()=>{this.onMouseLeave()}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                </NavLink>
            </li>
        }
    }
}