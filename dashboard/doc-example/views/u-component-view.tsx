import * as React from 'react';
import {Component, MouseEvent, RefObject} from "react";
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton, UCheck} from "../../ui-libs";
import {UTextInput} from "../../ui-libs";
import {LoginApi} from "../../util-tools/api/login-api";
import {withRouter} from "react-router";
import {NavLink} from "react-router-dom";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";

export class UComponentView extends Component{
    ref:RefObject<UButton> = React.createRef();
    columns: UTableColumn[] = [];
    constructor(props: any){
        super(props);
        let c1: UTableColumn = {
            label: "Column1",
            key: 'name'
        };
        let c2: UTableColumn = {
            label: 'Column2',
            key: 'age',
            graph: <UIcon iconName={'star'}/>,
            fill:(value)=>{
                return <span className={'new-file'}>{value}</span>
            }
        };
        this.columns.push(c1, c2);
    }
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
            <div className={'view'}>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} isPassword={true} placeholder={'请输入文字信息'}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} disabled={true}/>
                <UTextInput graph={<UIcon iconName={'star'}/>} label={'星星'} placeholder={'请输入文字信息'} isError={true}/>
            </div>
            <NavLink to={'/icon/icon-map'}>123123123123</NavLink>
            <div className={'name'}>UCheck</div>
            <div className={'view'}>
                <UCheck label={'check'} onCheck={(c)=>{console.log('isCheck:' + c)}}/>
                <UCheck label={'disabled'} disabled={true} onCheck={(c)=>{console.log('isCheck:' + c)}}/>
            </div>
            <div className={'name'}>UTable</div>
            <div className={'view'}>
                <UTable data={null} column={this.columns}/>
            </div>
        </div>
    }
}