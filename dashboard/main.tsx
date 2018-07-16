import * as React from "react";
import {HashRouter} from "react-router-dom";
import {render} from "react-dom";
import {Redirect, Route, Switch} from "react-router";
import {AuthTool} from "./util-tools/auth-tool";
import LoginView from "./views/login-view/login-view";
import MainView from "./views/main-view/main-view";
import './static/style/style.scss';

export class KTDashboard extends React.Component<any>{
    constructor(props: any){
        super(props);
    }
    render() {
        return <Switch>
            <Route path={'/auth'} exact render={()=> {return <Redirect to={"/auth/login"}/>}}/>
            <Route path={'/auth/login'} exact render={()=>{
                if (AuthTool.hasAuth()) {
                    return <Redirect to={'/main'}/>
                } else {
                    return <LoginView/>
                }
            }}/>
            <Route path={"/main"} replace render={()=>{
                if (!AuthTool.hasAuth()) {
                    return <Redirect to={'/auth'}/>
                } else {
                    return <MainView/>
                }
            }}/>
            <Route render={()=>{return <Redirect to={'/main'}/>}}/>
            </Switch>
    }
}
render(<HashRouter>
    <KTDashboard/>
</HashRouter>, document.getElementById('react-root'));