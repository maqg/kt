import * as hljs from "highlight.js";
import * as React from "react";
import {HashRouter} from "react-router-dom";
import {render} from "react-dom";
import {Redirect, Route, Switch} from "react-router";
import {AuthTool} from "./util-tools/auth-tool";
import {LoginView} from "./views/login-view";
import {MainView} from "./views/main-view";

export class KTDashboard extends React.Component<any>{
    constructor(props: any){
        super(props);
        hljs.initHighlightingOnLoad();
    }
    render() {
        return <div className={'kt-layout'}>
            <Switch>
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
        </div>
    }
}
render(<HashRouter>
    <KTDashboard/>
</HashRouter>, document.getElementById('react-root'));