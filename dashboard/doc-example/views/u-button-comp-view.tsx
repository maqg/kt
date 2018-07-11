import * as React from 'react';
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import {UButton} from "../../ui-libs/ui-button/u-button";
import {Route} from "react-router";
import '../../doc-example/static/style/doc-layout.scss';

export class UButtonCompView extends React.Component {
    content_title = `
# 按钮组件 **UButton**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
label|string|按钮名称，可选属性
graph|any|按钮图标，可选属性
disabled|boolean|是否可用，可选属性
className|string[]|css class name 列表
onClick|function|click事件处理器，可选属性
`;
    content_example = `
## 用例
`;
    content_e_button = `
### 创建按钮实例
\`\`\`jsx
<UButton label="按钮"/>
\`\`\`
`;
    content_e_button_graph = `
### 创建带图标按钮实例
\`\`\`jsx
<UButton label="按钮" graph={<UIcon iconName={'star'}/>}/>
\`\`\`
`;
    content_e_button_disabled = `
### 创建不可用按钮实例
\`\`\`jsx
<UButton label="按钮" graph={<UIcon iconName={'star'}/>} disabled={true}/>
\`\`\`
`;
    content_e_button_click = `
### 按钮事件处理器实例
\`\`\`jsx
<UButton label="按钮" graph={<UIcon iconName={'star'}/>} click={() => alert('这是事件处理器');}/>
\`\`\`
`;
    content_e_button_css = `
### 设置按钮样式
\`\`\`jsx
<UButton label="按钮" graph={<UIcon iconName={'star'}/>} className={['u-button-red']}/>
\`\`\`
`;
    render() {
        return <div>
            <UDoc text={this.content_title}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_button}/>
            <UButton label="按钮"/>
            <UDoc text={this.content_e_button_graph}/>
            <UButton label="按钮" graph={<UIcon iconName={'star'}/>}/>
            <UDoc text={this.content_e_button_disabled}/>
            <UButton label="按钮" graph={<UIcon iconName={'star'}/>} disabled={true}/>
            <UDoc text={this.content_e_button_click}/>
            <UButton label="按钮" graph={<UIcon iconName={'star'}/>} onClick={() => {alert("这是事件处理器");}}/>
            <UDoc text={this.content_e_button_css}/>
            <UButton label="按钮" graph={<UIcon iconName={'star'}/>} className={['u-button-red']}/>
        </div>
    }
}