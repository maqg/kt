import * as React from "react";
import {NavLink} from "react-router-dom";
import {UIcon} from "../ui-icon";
import {MouseEvent} from "react";

export interface UNavItemProps {
    graph?: any,
    label?: string,
    path: string,
    location?: string,
    exact?: boolean,
    className?: string[],
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
            title: "展开",
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
    private onMouseEnter(e: MouseEvent) {
        e.preventDefault();
        this.setState({isHover: true});
    }
    private onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        this.setState({isHover: false, isDown: false});
    }
    private onMouseDown(e: MouseEvent) {
        e.preventDefault();
        this.setState({isDown: true});
    }
    private onMouseUp(e: MouseEvent) {
        e.preventDefault();
        this.setState({isDown: false});
    }
    setExpand(){
        this.setState({
            isExpand: true,
            title: "收起",
        })
    }
    private onNavClick(e: MouseEvent) {
        e.preventDefault();
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
            return <li className={this.makeLiClassName()} title={this.state.title}>
                <a className={this.makeAClassName()}
                   onClick={(e)=>{this.onNavClick(e)}}
                   onMouseDown={(e)=>{this.onMouseDown(e)}}
                   onMouseUp={(e)=>{this.onMouseUp(e)}}
                   onMouseEnter={(e)=>{this.onMouseEnter(e)}}
                   onMouseLeave={(e)=>{this.onMouseLeave(e)}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                    <span className={'tail'}>
                        <UIcon iconName={'angle-right'}/>
                    </span>
                </a>
                <ul className={'sub-nav-list'}  style={{maxHeight: (this.subContainer&&this.state.isExpand)?this.subContainer.offsetHeight+"px":0}}>
                    <div className={'sub-list-container'} ref={(ref)=>{this.subContainer = ref}}>
                        {this.props.children}
                    </div>
                </ul>
            </li>
        } else {
            return <li className={this.makeLiClassName()}>
                <NavLink className={this.makeAClassName()}
                         to={this.props.path || ''} replace exact={this.props.exact}
                         onMouseDown={(e)=>{this.onMouseDown(e)}}
                         onMouseUp={(e)=>{this.onMouseUp(e)}}
                         onMouseEnter={(e)=>{this.onMouseEnter(e)}}
                         onMouseLeave={(e)=>{this.onMouseLeave(e)}}>
                    {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                    {this.props.label && <span className={'label'}>{this.props.label}</span>}
                </NavLink>
            </li>
        }
    }
}
