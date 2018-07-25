import * as React from 'react';
import {UNumber} from "../../ui-libs/ui-number/u-number";
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import '../../doc-example/static/style/doc-layout.scss';

export class UNumberCompView extends React.Component {
    content_title = `
# 数字输入框组件 **UNumber**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
label|string|输入框名称，可选属性
placeholder|string|提示输入信息，可选属性
graph|any|输入框图标，可选属性
withMinus|boolean|是否允许负数，可选属性
isFloat|boolean|是否允许单精度浮点数，可选属性
isError|boolean|是否出错，可选属性
disabled|boolean|是否可用，可选属性
onChange|function|改变事件
className|string[]|css class name 列表
`;
    content_example = `
## 用例
`;
    content_e_input = `
### 创建数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'}/>
\`\`\`
`;
    content_e_input_graph= `
### 创建带图标数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>}/>
\`\`\`
`;
    content_e_input_withMinus= `
### 创建允许负数数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} withMinus={true}/>
\`\`\`
`;
    content_e_input_isFloat= `
### 创建允许浮点数数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} isFloat={true}/>
\`\`\`
`;
    content_e_input_disabled= `
### 创建不可用数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} disabled={true} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_isError= `
### 创建验证数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} isError={true} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_placeholder= `
### 创建提示信息数字输入框实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} placeholder={'这是输入框'} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_onChange= `
### 数字输入框实例change事件处理器实例
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} onChange={(v) => {console.log(v)}} className={['u-input-width']}/>
\`\`\`
`;
    content_e_input_css= `
### 设置数字输入框样式
\`\`\`jsx
<UNumber label={'数字输入框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-red', 'u-input-width']}/>
\`\`\`
`;
    render() {
        return <div>
            <UDoc text={this.content_title}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_input}/>
            <UNumber label={'数字框'} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_graph}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_withMinus}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} withMinus={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_isFloat}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} isFloat={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_disabled}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} disabled={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_isError}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} isError={true} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_placeholder}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} placeholder={'这是输入框'} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_onChange}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} onChange={(v) => {console.log(v)}} className={['u-input-width']}/>
            <UDoc text={this.content_e_input_css}/>
            <UNumber label={'数字框'} graph={<UIcon iconName={'edit'}/>} className={['u-input-red', 'u-input-width']}/>
        </div>
    }
}