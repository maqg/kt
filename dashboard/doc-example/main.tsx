import * as React from "react";
import '../static/style/style.scss';
import {HashRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import {render} from "react-dom";
import {UNavItem, UNavList} from "../ui-libs";
import {UIcon} from "../ui-libs/ui-icon";
import {GlobalEvent, NAV_JUMP_EVENT} from "../ui-libs/util/common";
import {EventEmitter} from "events";
export class DocLayout extends React.Component{
    private global_event_emitter: EventEmitter;
    constructor(props: any){
        super(props);
        this.global_event_emitter = GlobalEvent;
        this.global_event_emitter.on(NAV_JUMP_EVENT, ()=>{
            console.log('emit item!');
        })
    }

    componentWillUnmount(){
        this.global_event_emitter.removeAllListeners(NAV_JUMP_EVENT);
    }
    render() {
        return <div className={'doc-layout'}>
            <nav className={'doc-nav'}>
                <UNavList>
                    <UNavItem label={'系统图标'} graph={<UIcon iconName={'glass'}/>}>
                        <UNavItem label={'图标组件'} path={'/icon/icon-component'}>
                            <UNavItem label={'内部图标'} path={'/icon/icon-map'}/>
                        </UNavItem>
                    </UNavItem>
                </UNavList>
            </nav>
            <main className={'doc-main'}>
                <Switch>
                    <Route path="/" exact replace render={()=>{return <Redirect to={'/icon'}/>}}/>
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