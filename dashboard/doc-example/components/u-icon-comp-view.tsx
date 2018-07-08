import * as React from "react";
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon";

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
rotate|\`90\` \`180\` \`270\`|顺时针角度变换，可选属性
flip|\`horizontal\` \`vertical\`|镜像变换，可选属性
className|[string]|css class name 列表

## 用例
### 创建图标实例
\`\`\`jsx
<UIcon iconName={'star'}/>
\`\`\`
    `;
    e_spin = `
### 旋转图标
\`\`\`jsx
<UIcon iconName={'spinner'} spin={true}/>
\`\`\`    
    `;
    render() {
        return <div className={'u-icon-comp-view'}>
            <UDoc text={this.content}/>
            <UIcon iconName={'star'}/>
            <UDoc text={this.e_spin}/>
            <UIcon iconName={'spinner'} spin={true}/>
        </div>
    }
}