import * as React from "react";
import {IconNameList, UIcon, UIconProps} from "../../ui-libs/ui-icon";
import {Component, FormEvent} from "react";
import '../static/style/icon-map.scss';

export interface IconItemProps {
    iconProp: UIconProps,
    search: string
}

export class IconItem extends Component<IconItemProps, any>{
    makeIconName(){
        let start = this.props.iconProp.iconName.indexOf(this.props.search);
        if (start < 0) return <span><span className={'noKey'}>{this.props.iconProp.iconName}</span></span> ;
        if (start === 0) {
            let end = this.props.search.length;
            return <span><span className={'isKey'}>{this.props.search}</span><span className={'noKey'}>{this.props.iconProp.iconName.substr(end)}</span></span>;
        }
        let end = start + this.props.search.length;
        return <span>
            <span className={'noKey'}>{this.props.iconProp.iconName.substr(0, start)}</span>
            <span className={'isKey'}>{this.props.search}</span>
            <span className={'noKey'}>{this.props.iconProp.iconName.substr(end)}</span>
        </span>;
    }
    render() {
        return <div className={'u-icon-item'}>
            <UIcon {...this.props.iconProp}/>
            <div className={'u-icon-name'}>
                {this.makeIconName()}
            </div>
        </div>
    }
}
export interface UIconMapStates {
    search: string
}
export class UIconMapView extends Component<any, UIconMapStates>{
    iconList: string[] = IconNameList;
    constructor(props: any) {
        super(props);
        this.state = {
            search: ''
        }
    }

    onSearChange(e: FormEvent<HTMLInputElement>) {
        this.setState({
            search: e.currentTarget.value
        })
    }
    isMatchSearch(iconName: string){
        return iconName.indexOf(this.state.search || '') >= 0
    }
    render() {
        return <div className={'u-icon-map-view'}>
            <input className={'search-input'} onInput={(e)=>{this.onSearChange(e)}} />
            <div className={'match-icon-map'}>
                {this.iconList.map((name: string, index:number)=>{
                    let iconName = name.substr(3);
                    if (this.isMatchSearch(iconName)) {
                        return <IconItem key={index} iconProp={{iconName: iconName}} search={this.state.search||""}/>
                    }
                })}
            </div>
        </div>
    }
}