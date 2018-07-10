import * as hljs from "highlight.js";
import * as React from "react";
import {HashRouter} from "react-router-dom";
import {render} from "react-dom";
import {Route} from "react-router";

export class KTDashboard extends React.Component<any>{
    constructor(props: any){
        super(props);
        hljs.initHighlightingOnLoad();
    }
    render() {
        return <div className={'kt-layout'}>
            <Route/>
        </div>
    }
}
render(<HashRouter>
    <KTDashboard/>
</HashRouter>, document.getElementById('react-root'));