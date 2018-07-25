import * as React from 'react';
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UCheck} from "../../ui-libs/ui-check/u-check";
import '../../doc-example/static/style/doc-layout.scss';

export class UCheckCompView extends React.Component {
    content_title = `
# 勾选框组件 **UCheck**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
label|string|勾选框名称，可选属性
disabled|boolean|是否可用，可选属性
checked|boolean|设置勾选框是否选中，可选属性
onCheck|function|勾选框事件处理器，可选属性
`;
    content_example = `
## 用例
`;
    content_e_check = `
### 创建勾选框实例
\`\`\`jsx
<UCheck label={'check'}/>
\`\`\`
`;
    content_e_check_disabled = `
### 创建不可用勾选框实例
\`\`\`jsx
<UCheck label={'check'} disabled={true}/>
\`\`\`
`;
    content_e_check_checked = `
### 设置选中勾选框实例
\`\`\`jsx
<UCheck label={'check'} checked={true}}/>
\`\`\`
`;
    content_e_check_change = `
### 勾选框事件处理器实例
\`\`\`jsx
<UCheck label={'check'} onCheck={() => alert("勾选框事件处理")}/>
\`\`\`
`;
    render() {
        return (
            <div>
                <UDoc text={this.content_title}/>
                <UDoc text={this.content_props}/>
                <UDoc text={this.content_example}/>
                <UDoc text={this.content_e_check}/>
                <UCheck label={'check'}/>
                <UDoc text={this.content_e_check_disabled}/>
                <UCheck label={'check'} disabled={true}/>
                <UDoc text={this.content_e_check_checked}/>
                <UCheck label={'check'} checked={true}/>
                <UDoc text={this.content_e_check_change}/>
                <UCheck label={'check'} onCheck={() => alert("勾选框事件处理")}/>
            </div>
        )
    }
}