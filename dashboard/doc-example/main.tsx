import * as React from "react";
import '../static/style/style.scss';
import {HashRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import {render} from "react-dom";
import {UNavItem, UNavList} from "../ui-libs";
export class DocLayout extends React.Component{
    render() {
        return <div className={'doc-layout'}>
            <nav className={'doc-nav'}>
                <UNavList>
                    <UNavItem label={'系统图标'} path={"/icon"}>
                        <UNavItem label={'图标组件'} path={'/icon/icon-component'}>
                            <UNavItem label={'内部图标'} path={'/icon/icon-map'}/>
                        </UNavItem>
                    </UNavItem>
                </UNavList>
            </nav>
            <main className={'doc-main'}>
                <Switch>
                    <Route path="/" exact replace render={()=>{return <div>123</div>}}/>
                    <Route path="/icon/" exact render={ () => <div>icon</div>} />
                    <Route path="/icon/icon-component"  render={ () => <div>icon component</div>} />
                    <Route path="/icon/icon-map"  render={ () => <div>icon map</div>} />
                </Switch>
            </main>
        </div>
    }
}
render(<HashRouter>
    <DocLayout/>
</HashRouter>, document.getElementById('react-root'));