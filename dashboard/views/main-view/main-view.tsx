import * as React from "react";
import {Route, RouteComponentProps, withRouter} from "react-router";
import {NavView} from "../nav-view/nav-view";
import './main-view.scss';
import {AccountAction} from "../../components/account-action/account-action";
import {UNavItem} from "../../ui-libs/ui-nav";
import {UIcon} from "../../ui-libs/ui-icon";
import {RefObject} from "react";
import {AccountView} from "../account-view/account-view";
import {UserView} from "../user-view/user-view";
const logoImg = require('../../static/img/logo.png');

class MainView extends React.Component<RouteComponentProps<any>>{
    accountRef: RefObject<AccountAction>;
    location: string;
    constructor(props: any) {
        super(props);
        this.accountRef = React.createRef();
    }
    componentDidMount(){
        if(this.location.indexOf('/main/account') === 0) {
            this.accountRef.current.setExpand(true);
        }
    }
    componentDidUpdate(){
        if(this.location.indexOf('/main/account') === 0) {
            this.accountRef.current.setExpand(true);
        } else {
            this.accountRef.current.setExpand(false);
        }
    }
    render() {
        return <div className={'kt-main-view'}>
            <div className={'kt-side'}>
                <div className={'kt-title'}>
                    <img src={logoImg} className={'logo'}/>
                    <div className={'kt-name'}>KT 单车管理平台</div>
                </div>
                <NavView/>
                <div className={'cpy'}>
                    All rights copy to octopuslink 2017 - 2019
                </div>
            </div>
            <div className={'kt-main-range'}>
                <div className={'kt-top-range'}>
                    <Route render={(data:any)=>{
                        this.location = data.location.pathname;
                        return <AccountAction ref={this.accountRef}>
                        <UNavItem path={'/main/account/info'} label={'用户信息'} graph={<UIcon iconName={'info'}/>}/>
                        <UNavItem path={'/main/account/cpwd'} label={'修改密码'} graph={<UIcon iconName={'unlock-alt'}/>}/>
                        <UNavItem path={'/main/account/logout'} label={'退出登录'} graph={<UIcon iconName={'sign-out'}/>}/>
                    </AccountAction>}}/>

                </div>
                <div className={'kt-main-frame'}>
                    <Route path='/main/user/admin' component={AccountView}/>
                    <Route path='/main/user/rider' component={UserView}/>
                </div>
            </div>
        </div>
    }
}

export default withRouter(MainView);