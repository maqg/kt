import * as React from "react";
import {UDoc} from "../../ui-libs/ui-doc/u-doc";

export class UIconCompView extends React.Component{
    content: string = `
# 图标组件 **UIcon**
## Props

属性|类型|描述
-|-|-
fontFamily|string|字体名称，参考\`@font-face\`，可选属性，默认\`fa\`(系统字体)
iconName|string|字符名称，必须属性，详情参考\`内部图标\`列表
spin|boolean|是否旋转，可选属性
pulse|boolean|是否渐动旋转，可选属性，不可与\`spin\`属性同时生效
rotate|90\|180\|270\|顺时针角度变换，可选属性
flip|\"horizontal\"\|\"vertical\"|
    `;    
    render() {
        return <div className={'u-icon-comp-view'}>
            <UDoc text={this.content}/>
        </div>
    }
}