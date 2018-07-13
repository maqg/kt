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
import {UNavItem} from "../ui-libs/ui-nav";
import {UNavView} from "./views/u-nav-view";

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
                    <Route path="/icon" exact render={()=>{return <Redirect to={'/icon/icon-component'}/>}} />
                    <Route path="/icon/icon-component"  component={UIconCompView} />
                    <Route path="/icon/icon-map"  component={UIconMapView} />
                    <Redirect to={'/'}/>
                </Switch>
            </main>
        </div>
    }
}
render(<HashRouter>
    <DocLayout/>
</HashRouter>, document.getElementById('react-root'));