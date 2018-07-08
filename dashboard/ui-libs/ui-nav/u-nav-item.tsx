import * as React from "react";
import {NavLink} from "react-router-dom";
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
            title: "展开",
        }
    }
    componentDidMount(){
        this.setState({
            isExpand: this.props.expand,
            title: this.props.expand ?"收起":"展开"
        })
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
            return <li className={this.makeLiClassName()} title={this.state.title}>
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
                <ul className={'sub-nav-list'}  style={{maxHeight: (this.subContainer&&this.state.isExpand)?this.subContainer.offsetHeight+"px":0}}>
                    <div className={'sub-list-container'} ref={(ref)=>{this.subContainer = ref}}>
                        {this.props.children}
                    </div>

                </ul>
            </li>
        } else {
            return <li className={this.makeLiClassName()}>
                <NavLink className={this.makeAClassName()}
                         to={this.props.path || ''} replace exact
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