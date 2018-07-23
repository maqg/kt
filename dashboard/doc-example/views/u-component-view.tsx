import * as React from 'react';
import {Component, MouseEvent, RefObject} from "react";
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton, UCheck} from "../../ui-libs";
import {UTextInput} from "../../ui-libs";
import {LoginApi} from "../../util-tools/api/login-api";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";
import {Base64} from "js-base64";

export interface SubCompBaseValueProps {
    fullData: any,
    data: any
}
export interface SubCompBaseValueStates {
    showBase: boolean
}
export class SubCompBaseValue extends React.Component<SubCompBaseValueProps, SubCompBaseValueStates>{
    constructor(props: SubCompBaseValueProps){
        super(props);
        this.state = {
            showBase: false
        }
    }
    getShowValue(){
        if(this.state.showBase){
            return Base64.encode(this.props.data);
        } else {
            return this.props.data;
        }
    }
    trigger(){
        this.setState((pre)=>{
            console.log(this.props.fullData);
            return {
                showBase: !pre.showBase
            }
        })
    }
    render() {
        return <div className={'sub-base-value'}>
            <span className={'value'}>{this.getShowValue()}</span>
            <UButton label={this.state.showBase? "显示明文" :"显示Base"} onClick={()=>this.trigger()}/>
        </div>
    }
}
export interface UComponentViewStates {
    tableCheck: boolean,
    tableHead: boolean,
    tableMulti: boolean,
    tableIndex: boolean,
}
export class UComponentView extends Component<any, UComponentViewStates>{
    ref:RefObject<UButton> = React.createRef();
    columns: UTableColumn[] = [];
    tableRef: RefObject<UTable> = React.createRef();
    controlledCheck: RefObject<UCheck> = React.createRef();
    controlledInput: RefObject<UTextInput> = React.createRef();
    data = [
        {name: 'hello', age: 123},
        {name: 'world', age: 222},
        {name: 'still', age: 250},
        {name: 'fucked', age: 20}
        ];
    constructor(props: any) {
        super(props);
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
        this.state = {
            tableCheck: false,
            tableHead: false,
            tableMulti: false,
            tableIndex: false,

        }
    }
    shiftDataItem() {
        let data = this.tableRef.current.getData();
        let newData = [...data];
        newData.shift();
        this.tableRef.current.setData(newData);
    }
    componentDidMount(){
        this.tableRef.current.setData(this.data);
    }
    triggerCheck = ()=>{
        let oldValue = this.controlledCheck.current.getCheck();
        this.controlledCheck.current.setCheck(!oldValue, true);
    };
    async click(e: MouseEvent) {
        let api: LoginApi = new LoginApi();
        let resp;
        try{
            resp = await  api.doLogin({
                username: "ktadmin",
                password: "ktadmin"
            });
        } catch (e) {
            console.error(e.errorMsg);
        }
        console.log(resp);
    }
    render() {
        return <div className={'u-component-view'}>
            <div className={'name'}>UIcon</div>
            <div className={'view'}>
                <UIcon iconName={'star'}/>
            </div>
            <div className={'name'}>UButton</div>
            <div className={'view'}>
                <UButton graph={<UIcon iconName={'star'}/>} label={'星星'} ref={this.ref} onClick={(e)=>{this.click(e)}}/>
                <UButton graph={<UIcon iconName={'star'}/>} disabled={true} label={'星星'}/>
            </div>
            <div className={'name'}>UTextInput</div>
            <UButton label={'set-value-to: AAA'} onClick={()=>{
                this.controlledInput.current.setValue("AAA", true);
            }}/>
            <div className={'view'}>
                <UTextInput graph={<UIcon iconName={'star'}/>} ref={this.controlledInput}
                            onChange={(e)=>{console.log('set value:',e)}}
                            label={'星星'}
                            placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} isPassword={true} placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} disabled={true}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} isError={true}/>
            </div>
            <NavLink to={'/icon/icon-map'}>123123123123</NavLink>
            <div className={'name'}>UCheck</div>
            <div className={'view'}>
                <UCheck label={'check'} onCheck={(c)=>{console.log('isCheck:' + c)}}/>
                <UCheck label={'disabled'} disabled={true} onCheck={(c)=>{console.log('isCheck:' + c)}}/>
                <UCheck label={'checked'} ref={this.controlledCheck}  onCheck={(c)=>{console.log('isCheck:' + c);}}/>
                <UButton label={'trigger'} onClick={this.triggerCheck}/>
            </div>
            <div className={'name'}>UTable</div>
            <div className={'view'}>
                <div className={'props-check'} style={{display: 'flex'}}>
                    <UCheck label={'check'}  onCheck={(check)=>{this.setState({tableCheck: check})}}/>
                    <UCheck label={'head'}  onCheck={(check)=>{this.setState({tableHead: check})}}/>
                    <UCheck label={'multi'}  onCheck={(check)=>{this.setState({tableMulti: check})}}/>
                    <UCheck label={'index'} onCheck={(check)=>{this.setState({tableIndex: check})}}/>
                    <UButton label={'remove-data'} onClick={()=>this.shiftDataItem()}/>
                    <UButton label={'print-selected'} onClick={()=>{
                        let data = this.tableRef.current.getSelectedData();
                        console.log(JSON.stringify(data));
                    }}/>
                </div>
                <UTable column={this.columns}
                        ref = {this.tableRef}
                        multi={this.state.tableMulti}
                        withIndex={this.state.tableIndex}
                        withCheck={this.state.tableCheck}
                        withHead={this.state.tableHead} onSelected={(ret:any[])=>{
                    console.dir(JSON.stringify(ret));
                }}/>
            </div>
        </div>
    }
}