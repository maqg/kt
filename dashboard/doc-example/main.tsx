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
import * as hljs from "highlight.js";
import {UIconMapView} from "./views/u-icon-map";
import {UComponentView} from "./views/u-component-view";

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
                    <UNavItem label={'系统按钮'} graph={<UIcon iconName={'star'}/>} expand={data.location.pathname.split('/')[1] === 'button'}>
                        <UNavItem label={'按钮组件'} graph={<UIcon iconName={'modx'}/>} path={'/icon/icon-component'}/>
                    </UNavItem>
                    <UNavItem label={'系统组件'} graph={<UIcon iconName={'gears'}/>}>
                        
                    </UNavItem>
                </UNavList>}}/>

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