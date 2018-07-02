import * as React from "react";
import {render} from "react-dom";
import './static/style/style.scss'
export class App extends React.Component {
    render() {
        return <div>
            Hello world<br/>
            anynew wwwt
        </div>
    }
}
render(<App/>, document.getElementById('react-root'));