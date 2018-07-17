import * as React from "react";
import {UIcon} from "../../ui-libs/ui-icon";
import {AuthTool, AuthUser} from "../../util-tools/auth-tool";
import {MouseEvent, RefObject} from "react";
import './account-action.scss';

export interface AccountActionStates {
    currentUser: AuthUser,
    expand: boolean,
    title:string,
    isHover: boolean,
    isDown: boolean
}

export class AccountAction extends React.Component<any, AccountActionStates>{
    containerRef: RefObject<HTMLDivElement>;
    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: AuthTool.getAuthInfo(),
            expand: false,
            title: '展开',
            isHover: false,
            isDown: false
        };
        this.containerRef = React.createRef();
    }
    setExpand(isExpand: boolean) {
        if (isExpand) {
            this.setState({
                expand: true,
                title: "收起"
            })
        } else {
            this.setState({
                expand: false,
                title: "展开"
            })
        }
    }
    makeClassName(): string {
        let names = ['c-account-action'];
        if (this.state.isHover) {
            names.push('hover');
        }
        if(this.state.isDown) {
            names.push('down');
        }
        if(this.state.expand) {
            names.push('expand')
        }
        return names.join(' ');
    }
    onMouseEnter(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            isHover: true
        });
    }
    onMouseLeave(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            isHover: false,
            isDown: false
        })
    }
    onMouseDown(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            isDown: true
        })
    }
    onMouseUp(e: MouseEvent) {
        e.preventDefault();
        this.setState({
            isDown: false
        })
    }
    onExpandClick(e:MouseEvent) {
        e.preventDefault();
        if(this.state.expand) {
            this.setExpand(false);
        } else {
            this.setExpand(true);
        }
    }
    render() {
        return <div className={this.makeClassName()}>
            <div className={'account-action-view'}
                 title={this.state.title}
                 onMouseLeave={(e)=>this.onMouseLeave(e)}
                 onMouseDown={(e)=>this.onMouseDown(e)}
                 onMouseUp={(e)=>this.onMouseUp(e)}
                 onClick={(e)=>{this.onExpandClick(e)}}
                 onMouseEnter={(e)=>this.onMouseEnter(e)}>
                <UIcon iconName={'user'}/>
                <div className={'account-name'}>
                    <span className={'label'}>当前用户</span>
                    <span className={'name'}>
                        {
                            this.state.currentUser && this.state.currentUser.username
                        }
                    </span>
                </div>
                <div className={'user-action-tail'}>
                    <UIcon iconName={'angle-right'}/>
                </div>
            </div>
            <div className={'account-actions'} style={{
                maxWidth: (this.state.expand && this.containerRef.current)?this.containerRef.current.offsetWidth+"px":0
            }}>
                <div className={'account-action-container'} ref={this.containerRef}>
                    {this.props.children}
                </div>
            </div>
        </div>
    }
}