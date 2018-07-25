import * as React from "react";
import '../static/style/style.scss';
import {HashRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import {render} from "react-dom";
import './static/style/doc-layout.scss';
import './static/style/doc-md.scss';

import {UIconCompView} from "./views/u-icon-comp-view";
import * as hljs from "highlight.js";
import {UIconMapView} from "./views/u-icon-map";
import {UComponentView} from "./views/u-component-view";
import {UButtonCompView} from "./views/u-button-comp-view";
import {UInputCompView} from "./views/u-input-comp-view";
import {UNavCompView} from "./views/u-nav-comp-view";
import {UNavItem} from "../ui-libs/ui-nav";
import {UNavView} from "./views/u-nav-view";
import {UCheckCompView} from "./views/u-check-comp-view";
import {UTableCompView} from "./views/u-table-comp-view";
import {UNumberCompView} from "./views/u-number-comp-view";
import {UPagerCompView} from "./views/u-pager-comp-view";

export class DocLayout extends React.Component<any>{
    constructor(props: any){
        super(props);
        hljs.initHighlightingOnLoad();
    }
    render() {
        return <div className={'doc-layout'}>
            <nav className={'doc-nav'}>
                <UNavView/>
            </nav>
            <main className={'doc-main'}>
                <Switch>
                    <Route path="/" exact replace component={UComponentView}/>
                    <Route path="/icon" exact render={() => {
                        return <Redirect to={'/icon/icon-component'}/>
                    }}/>
                    <Route path="/icon/icon-component" component={UIconCompView}/>
                    <Route path="/icon/icon-map" component={UIconMapView}/>
                    <Route path="/sysComponent/nav-component" component={UNavCompView}/>
                    <Route path="/sysComponent/button-component" component={UButtonCompView}/>
                    <Route path="/sysComponent/input-component" component={UInputCompView}/>
                    <Route path="/sysComponent/check-component" component={UCheckCompView}/>
                    <Route path="/sysComponent/table-component" component={UTableCompView}/>
                    <Route path="/sysComponent/number-component" component={UNumberCompView}/>
                    <Route path="/sysComponent/pager-component" component={UPagerCompView}/>
                    <Redirect to={'/'}/>
                </Switch>
            </main>
        </div>;
    }
}
render(<HashRouter>
    <DocLayout/>
</HashRouter>, document.getElementById('react-root'));