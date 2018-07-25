import * as React from 'react';
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UPager} from "../../ui-libs/ui-pager/u-pager";

export class UPagerCompView extends React.Component {
    content_title = `
# 分页组件 **UPager**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
page|number|当前页数，可选属性
limit|number|每页显示条数
total|number|总条数
onChange|function|页数改变事件
`;
    content_example = `
## 用例
`;
    content_e_pager = `
### 创建分页实例
\`\`\`jsx
<UPager limit={4} total={40} onChange={(p)=>{console.log(p)}}/>
\`\`\`
`;
    render() {
        return <div>
            <UDoc text={this.content_title}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_pager}/>
            <UPager limit={4} total={40} onChange={(p)=>{console.log(p)}}/>
        </div>
    }
}