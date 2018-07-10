import * as React from "react";
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import '../../doc-example/static/style/doc-layout.scss';

export class UIconCompView extends React.Component{
    content_title = `
# 图标组件 **UIcon**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
fontFamily|string|字体名称，参考\`@font-face\`，可选属性，默认\`fa\`(系统字体)
iconName|string|字符名称，必须属性，详情参考\`内部图标\`列表
spin|boolean|是否旋转，可选属性
pulse|boolean|是否渐动旋转，可选属性，不可与\`spin\`属性同时生效
rotate|\`90\` \`180\` \`270\`|顺时针角度变换，可选属性
flip|\`horizontal\` \`vertical\`|镜像变换，可选属性
className|string[]|css class name 列表
`;
    content_example = `
## 用例
`;
    content_e_icon = `
### 创建图标实例
\`\`\`jsx
<UIcon iconName={'star'}/>
\`\`\`
`;
    content_e_spin = `
### 旋转图标
\`\`\`jsx
<UIcon iconName={'spinner'} spin={true}/>
\`\`\`    
    `;
    content_e_pulse = `
### 渐动旋转
\`\`\`jsx
<UIcon iconName={'repeat'} pulse={true}/>
\`\`\`    
    `;
    content_e_rotate = `
### 顺时针角度变换
\`\`\`jsx
<UIcon iconName={'repeat'} rotate={90}/>
<UIcon iconName={'repeat'} rotate={180}/>
<UIcon iconName={'repeat'} rotate={270}/>
\`\`\`    
    `;
    content_e_flip = `
### 镜像变换
\`\`\`jsx
<UIcon iconName={'bar-chart'} flip={'horizontal'}/>
<UIcon iconName={'bar-chart'} flip={'vertical'}/>
\`\`\`    
    `;
    content_e_className = `
### 添加样式
\`\`\`jsx
<UIcon iconName={'heart'} className={['u-icon-red']}></UIcon>
\`\`\`    
    `;
    render() {
        return <div className={'u-icon-comp-view'}>
            <UDoc text={this.content_title}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_icon}/>
            <UIcon iconName={'star'}/>
            <UDoc text={this.content_e_spin}/>
            <UIcon iconName={'spinner'} spin={true}/>
            <UDoc text={this.content_e_pulse}/>
            <UIcon iconName={'repeat'} pulse={true}/>
            <UDoc text={this.content_e_rotate}/>
            <UIcon iconName={'repeat'} rotate={90}/>&nbsp;&nbsp;
            <UIcon iconName={'repeat'} rotate={180}/>&nbsp;&nbsp;
            <UIcon iconName={'repeat'} rotate={270}/>
            <UDoc text={this.content_e_flip}/>
            <UIcon iconName={'bar-chart'} flip={'horizontal'}/>&nbsp;&nbsp;
            <UIcon iconName={'bar-chart'} flip={'vertical'}/>
            <UDoc text={this.content_e_className}/>
            <UIcon iconName={'heart'} className={['u-icon-red']}></UIcon>
        </div>
    }
}