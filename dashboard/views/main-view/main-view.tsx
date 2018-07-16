import * as React from "react";
import {Route, RouteComponentProps, withRouter} from "react-router";
import {NavView} from "../nav-view/nav-view";
import './main-view.scss';
const logoImg = require('../../static/img/logo.png');

class MainView extends React.Component<RouteComponentProps<any>>{
    render() {
        return <div className={'kt-main-view'}>
            <div className={'kt-side'}>
                <div className={'kt-title'}>
                    <img src={logoImg} className={'logo'}/>
                    <div className={'kt-name'}>KT 单车管理平台</div>
                </div>
                <NavView/>
            </div>
        </div>
    }
}

export default withRouter(MainView);