import * as React from "react";
import '../static/style/style.scss';
import {HashRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import {render} from "react-dom";
import {UNavItem, UNavList} from "../ui-libs";
import {UIcon} from "../ui-libs/ui-icon";
import './static/style/doc-layout.scss';
import './static/style/doc-md.scss';

import {UIconCompView} from "./views/u-icon-comp-view";
import {UNavCompView} from "./views/u-nav-comp-view";
import * as hljs from "highlight.js";
import {UIconMapView} from "./views/u-icon-map";
import {UComponentView} from "./views/u-component-view";
import {UButtonCompView} from "./views/u-button-comp-view";
import {UInputCompView} from "./views/u-input-comp-view";

export class DocLayout extends React.Component<any>{
    constructor(props: any){
        super(props);
        hljs.initHighlightingOnLoad();
    }
    render() {
        return <div className={'doc-layout'}>
            <nav className={'doc-nav'}>

                <Route render={(data:any)=>{return <UNavList>
                    <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'}/>
                    <UNavItem label={'系统图标'} graph={<UIcon iconName={'fonticons'}/>} expand={data.location.pathname.split('/')[1]==='icon'}>
                        <UNavItem label={'图标组件'} graph={<UIcon iconName={'modx'}/>} path={'/icon/icon-component'}/>
                        <UNavItem label={'内部图标'} graph={<UIcon iconName={'braille'}/>} path={'/icon/icon-map'}/>
                    </UNavItem>
                    <UNavItem label={'系统组件'} graph={<UIcon iconName={'gears'}/>} expand={data.location.pathname.split('/')[1] === 'system'}>
                        <UNavItem label={'导航组件'} graph={<UIcon iconName={'navicon'}/>} path={'/system/nav-component'}/>
                        <UNavItem label={'按钮组件'} graph={<UIcon iconName={'hand-stop-o'}/>} path={'/system/button-component'}/>
                        <UNavItem label={'输入框组件'} graph={<UIcon iconName={'edit'}/>} path={'/system/input-component'}/>
                    </UNavItem>
                </UNavList>}}/>

            </nav>
            <main className={'doc-main'}>
                <Switch>
                    <Route path="/" exact replace component={UComponentView}/>
                    <Route path="/icon" exact render={()=>{return <Redirect to={'/icon/icon-component'}/>}} />
                    <Route path="/icon/icon-component"  component={UIconCompView} />
                    <Route path="/icon/icon-map"  component={UIconMapView} />
                    <Route path="/system/nav-component" component={UNavCompView}/>
                    <Route path="/system/button-component" component={UButtonCompView}/>
                    <Route path="/system/input-component" component={UInputCompView}/>
                    <Redirect to={'/'}/>
                </Switch>
            </main>
        </div>
    }
}
render(<HashRouter>
    <DocLayout/>
</HashRouter>, document.getElementById('react-root'));