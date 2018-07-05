import * as React from "react";
import '../static/style/style.scss';
import {HashRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import {render} from "react-dom";
import {UNavItem, UNavList} from "../ui-libs";
import {UIcon} from "../ui-libs/ui-icon";
import './static/style/doc-layout.scss';

export class DocLayout extends React.Component<any>{
    constructor(props: any){
        super(props);
    }
    render() {
        return <div className={'doc-layout'}>
            <nav className={'doc-nav'}>

                <Route render={(data:any)=>{return <UNavList>
                    <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'}/>
                    <UNavItem label={'系统图标'} graph={<UIcon iconName={'fonticons'}/>} expand={data.location.pathname.split('/')[1]==='icon'}>
                        <UNavItem label={'图标组件'} path={'/icon'}/>
                        <UNavItem label={'内部图标'} path={'/icon-map'}/>
                    </UNavItem>
                </UNavList>}}/>

            </nav>
            <main className={'doc-main'}>
                <Switch>
                    <Route path="/" exact replace render={()=>{return <div>Hello World</div>}}/>
                    <Route path="/icon/" exact render={()=>{return <div>123</div>}} />
                    <Route path="/icon/icon-component"  render={()=>{return <div>123</div>}} />
                    <Route path="/icon/icon-map"  render={()=>{return <div>123</div>}} />
                    <Redirect to={'/'}/>
                </Switch>
            </main>
        </div>
    }
}
render(<HashRouter>
    <DocLayout/>
</HashRouter>, document.getElementById('react-root'));