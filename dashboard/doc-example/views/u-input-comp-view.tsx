import * as React from 'react';
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import {UTextInput} from "../../ui-libs/ui-text-input/u-text-input";
import {Route} from "react-router";
import '../../doc-example/static/style/doc-layout.scss';

export class UInputCompView extends React.Component {
    content_title = `
# 输入框组件 **UTextInput**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
label|string|输入框名称，可选属性
graph|any|按钮图标，可选属性
disabled|boolean|是否可用，可选属性
isPassword|boolean|是否为密码框
isError|boolean|验证是否通过
placeholder|string|提示信息
onChange|function|change事件处理器
className|string[]|css class name 列表
`;
    content_example = `
## 用例
`;
    content_e_input = `
### 创建输入框实例
\`\`\`jsx
<UTextInput label={'输入框'}/>
\`\`\`
`;
    content_e_input_graph= `
### 创建带图标输入框实例
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>}/>
\`\`\`
`;
    content_e_input_disabled= `
### 创建不可用输入框实例
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} disabled={true} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_isPassword= `
### 创建密码输入框实例
\`\`\`jsx
<UTextInput graph={<UIcon iconName={'edit'}/>} label={'星星'} isPassword={true} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_isError= `
### 创建验证输入框实例
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} isError={true} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_placeholder= `
### 创建提示信息输入框实例
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} placeholder={'这是输入框'} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_onChange= `
### 输入框实例change事件处理器实例
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} onChange={(v) => {console.log(v)}} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_css= `
### 设置输入框样式
\`\`\`jsx
<UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-red', 'u-input-width']}/>
\`\`\`
`;
    render() {
        return <div>
            <UDoc text={this.content_title}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_input}/>
            <UTextInput label={'输入框'} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_graph}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_disabled}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} disabled={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_isPassword}/>
            <UTextInput graph={<UIcon iconName={'edit'}/>} label={'输入框'} isPassword={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_isError}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} isError={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_placeholder}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} placeholder={'这是输入框'} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_onChange}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} onChange={(v) => {console.log(v)}} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_css}/>
            <UTextInput label={'输入框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-red', 'u-input-width']}/>
        </div>
    }
}