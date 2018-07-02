import * as React from "react";
import {IconNameList, UIcon} from "../ui-libs/ui-icon";
import '../static/style/style.scss';
export class IconMapComponent extends React.Component<any, any> {
    render(){
        return IconNameList.map((name: string, index: number)=>{
            let pureName = name.substr(name.indexOf('-') + 1);
            return <UIcon key={index} iconName={pureName}/>
        });

    }
}