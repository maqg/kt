import * as React from "react";

export class UNavListProps {
    className?: [string]
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
        return <ul className={this.makeClassNames()}>
            {this.props.children}
        </ul>
    }
}