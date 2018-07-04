import * as React from "react";
import {NavLink} from "react-router-dom";
import {UNavList} from "./u-nav-list";
import {UIcon} from "../ui-icon";
import {EventEmitter} from "events";

export interface UNavItemProps {
    graph?: any,
    label?: string,
    path?: string,
    className?: [string],
    onActive?: (isActive: boolean) => void
}
export interface UNavItemStates {
    isExpand: boolean;
    isHover: boolean;
    isDown: boolean;
    title: string;
}
export class UNavItem extends React.Component<UNavItemProps, UNavItemStates>{
    emitter: EventEmitter;
    constructor(props: UNavItemProps){
        super(props);
        this.state = {
            isExpand: false,
            isHover: false,
            isDown: false,
            title: this.props.children?"展开":""
        }
    }
    private makeClassName(): string {
        let names = ['u-nav-item'];
        if (this.state.isExpand) {
            names.push('expand');
        }
        if (this.state.isHover){
            names.push('hover');
        }
        if(this.state.isDown){
            names.push('down');
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
               title: "展开"
            });
        } else {
            this.setState({
                isExpand: true,
                title: "收起"
            })
        }
    }

    render() {
        if (this.props.children) {
            return <li className={'nav-item-li'}>
                <a className={this.makeClassName()}
                   onMouseDown={()=>{this.onMouseDown()}}
                   onClick={()=>{this.onNavClick()}}
                   onMouseUp={()=>{this.onMouseUp()}}
                   onMouseEnter={()=>{this.onMouseEnter()}}
                   onMouseLeave={()=>{this.onMouseLeave()}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                    <UIcon iconName={'angle-right'}/>
                </a>
                <UNavList className={['sub-nav-list']}>
                    {this.props.children}
                </UNavList>
            </li>
        } else {
            return <li className={'nav-item-li'}>
                <NavLink className={this.makeClassName()}
                         to={this.props.path || ''} replace
                         onClick={()=>{this.onNavClick()}}
                         onMouseUp={()=>{this.onMouseUp()}}
                         onMouseEnter={()=>{this.onMouseEnter()}}
                         onMouseLeave={()=>{this.onMouseLeave()}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                </NavLink>
            </li>
        }
        // return <li className={this.makeClassName()}>
        //     <NavLink to={this.props.path || "#"} replace isActive={(m)=>{return this.bindOnActive(m)}}>
        //         {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
        //         {this.props.label && <span className={'label'}>{this.props.label}</span>}
        //         {this.props.children && <UIcon iconName={'angle-right'}/>}
        //     </NavLink>
        //     {
        //         this.props.children && <UNavList className={['sub-nav-list']}>
        //             {this.props.children}
        //         </UNavList>
        //     }
        // </li>
    }
}