import * as React from "react";
const INNER_ICON_FAMILY: string = 'fa';
const SPIN_CLASS: string ='icon-spin';
const PULSE_CLASS: string = 'icon-pulse';

export interface UIconProps {
    fontFamily?: string,
    iconName: string,
    spin?:boolean,
    pulse?: boolean,
    rotate?: 90 | 180 | 270,
    flip?: "horizontal" | "vertical",
    className?: [string],

}
export class UIcon extends React.Component<UIconProps>{
    constructor(props: UIconProps) {
        super(props);
    }
    private makeClassNames(): string {
        let names = ['u-icon'];
        let iconName = (this.props.fontFamily || INNER_ICON_FAMILY) + '-' + this.props.iconName;
        names.push(iconName);
        if(this.props.rotate) {
            names.push('rotate-'+this.props.rotate);
        }
        if (this.props.flip) {
            names.push("flip-" + this.props.flip);
        }
        if (this.props.spin) {
            names.push(SPIN_CLASS);
        }
        if (this.props.pulse) {
            names.push(PULSE_CLASS);
        }
        if (this.props.className) {
            let uniqueNames = Array.from(new Set(this.props.className));
            names.push(...uniqueNames);
        }
        return names.join(" ");
    }
    render() {
        let familyStyle = {
            fontFamily: this.props.fontFamily || INNER_ICON_FAMILY
        };
        return <i className={this.makeClassNames()} style={familyStyle}/>
    }
}