import * as React from 'react';
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import {UNavItem} from "../../ui-libs/ui-nav/index";
import {Route} from "react-router";
import '../../doc-example/static/style/doc-layout.scss';

export class UNavCompView extends React.Component {
    content_title_item = `
# 导航组件 **UNavItem**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
label|string|导航名称，可选属性
graph|any|导航图标，可选属性
path|string|导航路径，可选属性
exact|boolean|是否是绝对路径，可选属性
className|string[]|css class name 列表
`;
    content_example = `
## 用例
`;
    content_e_nav = `
### 创建导航实例
\`\`\`jsx
<UNavItem label={'KT 管理平台2'} path={'/'} exact={true}/>
\`\`\`
`;
    content_e_nav_icon = `
### 创建有图标的导航标签
\`\`\`jsx
<UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'} exact={true}/>
\`\`\`
`;
    content_e_nav_expand = `
### 创建层级导航标签
\`\`\`jsx
<UNavItem label={'系统图标'} ref={this.expandList.sysIcon} path={'/icon'} graph={<UIcon iconName={'fonticons'}/>} >
   <UNavItem label={'图标组件'} graph={<UIcon iconName={'modx'}/>} path={'/icon/icon-component'}/>
   <UNavItem label={'内部图标'} graph={<UIcon iconName={'braille'}/>} path={'/icon/icon-map'}/>
</UNavItem>
\`\`\`
`;
    content_e_nav_css = `
### 设置导航样式
\`\`\`jsx
<nav className={'doc-nav'} style={{width: 200}}>
     <Route render={()=>{return <UNavList>
         <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'} className={['u-nav-red']}/>
      </UNavList>}}/>
</nav>
\`\`\`
`;

    render() {
        return <div>
            <UDoc text={this.content_title_item}/>
            <UDoc text={this.content_props}/>
            <UDoc text={this.content_example}/>
            <UDoc text={this.content_e_nav}/>
            <nav className={'doc-nav'} style={{width: 200}}>
                <Route render={(data:any) => {return <ul className={'u-nav-list'}>
                    <UNavItem label={'KT 管理平台'} path={'/'} exact={true}/>
                </ul>}}/>
            </nav>
            <UDoc text={this.content_e_nav_icon}/>
            <nav className={'doc-nav'} style={{width: 200}}>
                <Route render={(data:any) => {return <ul className={'u-nav-list'}>
                    <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'} exact={true}/>
                </ul>}}/>
            </nav>
            <UDoc text={this.content_e_nav_expand}/>
            <nav className={'doc-nav'} style={{width: 200}}>
                <Route render={(data:any) => {return <ul className={'u-nav-list'}>
                    <UNavItem label={'系统图标'} path={'/icon'} graph={<UIcon iconName={'fonticons'}/>} >
                        <UNavItem label={'图标组件'} graph={<UIcon iconName={'modx'}/>} path={'/icon/icon-component'}/>
                        <UNavItem label={'内部图标'} graph={<UIcon iconName={'braille'}/>} path={'/icon/icon-map'}/>
                    </UNavItem>
                </ul>}}/>
            </nav>
            <UDoc text={this.content_e_nav_css}/>
            <nav className={'doc-nav'} style={{width: 200}}>
                <Route render={(data:any) => {return <ul className={'u-nav-list'}>
                    <UNavItem label={'KT 管理平台'} graph={<UIcon iconName={'star'}/>} path={'/'} className={['u-nav-red']} exact={true}/>
                </ul>}}/>
            </nav>
        </div>
    }
}