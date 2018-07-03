import * as React from "react";
import {NavLink} from "react-router-dom";
import {UNavList} from "./u-nav-list";

export interface UNavItemProps {
    graph?: React.Component,
    label?: string,
    path?: string,
    className?: [string],
    onActive?: (isActive: boolean) => void
}
export class UNavItem extends React.Component<UNavItemProps>{
    isActive: boolean;
    constructor(props: UNavItemProps){
        super(props);
        this.isActive = false;
    }
    private makeClassName(): string {
        let names = ['u-nav-item'];
        if (this.isActive) {
            names.push('active');
        }
        if (this.props.className) {
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(" ");
    }
    bindOnActive(match:any): boolean{
        if(!match){
            this.isActive = false;
            return false;
        } else {
            this.isActive = true;
            return true;
        }
    }
    render() {
        return <li className={this.makeClassName()}>
            <NavLink to={this.props.path || ''} exact replace isActive={(m)=>{return this.bindOnActive(m)}}>
                {this.props.graph && <span className={'graph'}>{this.props.graph}</span>}
                {this.props.label && <span className={'label'}>{this.props.label}</span>}
            </NavLink>
            {
                this.props.children && <UNavList className={['sub-nav-list']}>
                    {this.props.children}
                </UNavList>
            }
        </li>
    }
}