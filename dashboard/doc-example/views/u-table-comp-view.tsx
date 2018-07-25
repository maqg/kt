import * as React from 'react';
import {Component, MouseEvent, RefObject} from "react";
import {UDoc} from "../../ui-libs/ui-doc/u-doc";
import {UIcon} from "../../ui-libs/ui-icon/index";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";
import {Route} from "react-router";
import '../../doc-example/static/style/doc-layout.scss';

export class UTableCompView extends React.Component {
    data = [
        {name: 'hello', age: 123},
        {name: 'world', age: 222},
    ];
    tableRef: RefObject<UTable> = React.createRef();
    tableRef1: RefObject<UTable> = React.createRef();
    tableRef2: RefObject<UTable> = React.createRef();
    tableRef3: RefObject<UTable> = React.createRef();
    tableRef4: RefObject<UTable> = React.createRef();
    column: UTableColumn[] = [];
    column1: UTableColumn[] = [];
    constructor(props: any) {
        super(props);
        let c1: UTableColumn = {
            header: (c: UTableColumn) => {return <div><UIcon iconName={'glass'}/>{c.key}</div>},
            key: "name"
        };
        let c2: UTableColumn = {
            header: (c: UTableColumn) => {return <div><UIcon iconName={'star'}/> With Star!</div>},
            key: "age"
        };
        this.column.push(c1,c2);
        this.column1.push(c1,c2);
    }
    componentDidMount() {
        this.tableRef.current.setData(this.data);
        this.tableRef1.current.setData(this.data);
        this.tableRef2.current.setData(this.data);
        this.tableRef3.current.setData(this.data);
        this.tableRef4.current.setData(this.data);
    }
    content_row_title = `
# 表格组件 **UTableColumn**
`;
    content_row_props =`
## Props
属性|类型|描述
-|-|-
header|any|设置列头信息
key|string|数据key
primary|boolean|可选属性
unSelectable|boolean|可选属性
fill|boolean|可选属性
`;
    content_title = `
# 表格组件 **UTable**
`;
    content_props =`
## Props
属性|类型|描述
-|-|-
ref|RefObject&lt;UTable&gt;|表格数据，通过setData设置
column|UTableColumn[]|表格列
withHead|boolean|是否显示表头，可选属性
withCheck|boolean|是否显示勾选框，可选属性
withIndex|boolean|是否显示行数，可选属性
multi|boolean|是否显示全选，在withHead和withCheck为true时可用
onSelected|function|选中事件
`;
    content_example = `
## 用例
`;
    content_e_table = `
### 创建表格实例
\`\`\`jsx
let c1: UTableColumn = {
            header: (c: UTableColumn) => {return <div><UIcon iconName={'glass'}/>{c.key}</div>},
            key: 'name'
        };
let c2: UTableColumn = {
            header: <span><UIcon iconName={'star'}/> With Star!</span>,
            key: 'age',
            unSelectable: true,
            primary: true
        };
this.columns.push(c1, c2);
tableRef: RefObject<UTable> = React.createRef();
this.tableRef.current.setData(this.data);
<UTable column={this.column} ref={this.tableRef}/>
\`\`\`
`;
    content_e_table_withHead = `
### 设置表格表头实例
\`\`\`jsx
<UTable column={this.column} ref={this.tableRef} withHead={true}/>
\`\`\`
`;
    content_e_table_withCheck = `
### 设置表格勾选框实例
\`\`\`jsx
<UTable column={this.column} ref={this.tableRef} withCheck={true}/>
\`\`\`
`;
    content_e_table_withIndex = `
### 设置表格行数实例
\`\`\`jsx
<UTable column={this.column} ref={this.tableRef} withIndex={true}/>
\`\`\`
`;
    content_e_table_multi = `
### 设置表格行数实例
\`\`\`jsx
<UTable column={this.column} ref={this.tableRef} multi={true} withHead={true} withCheck={true}/>
\`\`\`
`;
    render() {
        return (
            <div>
                <UDoc text={this.content_row_title}/>
                <UDoc text={this.content_row_props}/>
                <UDoc text={this.content_title}/>
                <UDoc text={this.content_props}/>
                <UDoc text={this.content_example}/>
                <UDoc text={this.content_e_table}/>
                <UTable column={this.column} ref={this.tableRef}/>
                <UDoc text={this.content_e_table_withHead}/>
                <UTable column={this.column} ref={this.tableRef1} withHead={true}/>
                <UDoc text={this.content_e_table_withCheck}/>
                <UTable column={this.column} ref={this.tableRef2} withCheck={true}/>
                <UDoc text={this.content_e_table_withIndex}/>
                <UTable column={this.column} ref={this.tableRef3} withIndex={true}/>
                <UDoc text={this.content_e_table_multi}/>
                <UTable column={this.column} ref={this.tableRef4} multi={true} withHead={true} withCheck={true}/>
            </div>
        )
    }
}