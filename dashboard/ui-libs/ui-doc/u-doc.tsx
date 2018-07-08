import * as hljs from "highlight.js";
import * as marked from "marked";
import 'highlight.js/styles/tomorrow-night-eighties.css';
import * as React from "react";

export interface UDocProps {
    text: string
}
export class UDoc extends React.Component<UDocProps>{
    constructor(props: UDocProps){
        super(props);
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        })
    }
    render() {
        return <div className={'u-doc-container'} dangerouslySetInnerHTML={{__html: marked(this.props.text)}}>
        </div>
    }
}