import * as React from "react";
import {CSSProperties} from "react";

export class UNavListProps {
    className?: string[];
    style?: CSSProperties
}

export class UNavList extends React.Component<UNavListProps> {
    makeClassNames(): string {
        let names = ['u-nav-list'];
        if(this.props.className) {
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(" ");
    }
    render() {
        return <ul className={this.makeClassNames()} style={this.props.style}>
            {this.props.children}
        </ul>
    }
}