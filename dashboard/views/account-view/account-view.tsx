import * as React from "react";
import {Component, MouseEvent, ReactElement, RefObject} from "react";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";
import {ShowAllAccountApi, ShowAllAccountResponseData} from "../../util-tools/api/show-all-account-api";
import {RouteComponentProps, withRouter} from "react-router";
import {UButton, UPager} from "../../ui-libs";
import {UIcon} from "../../ui-libs/ui-icon";

export interface AccountViewStates {
    data: [ShowAllAccountResponseData],
    total: number,
    start: number,
    limit: number
}
export class AccountView extends React.Component<any, AccountViewStates> {
    showAllAccountApi: ShowAllAccountApi;
    columns: UTableColumn[] = [];
    tableRef: RefObject<UTable> = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            total: 0,
            start: 0,
            limit: 10
        };
        this.showAllAccountApi = new ShowAllAccountApi();
        let userNameColumn: UTableColumn = {
            header: "名称",
            key: "username"
        };
        let statusColumn: UTableColumn = {
            header: "可用状态",
            key: "status",
            fill: (value) => {
                let ret: ReactElement<any> = <span>可用</span>;
                if(value !== "enabled") {
                    ret = <span>不可用</span>
                }
                return ret;
            }
        };
        let phoneColumn: UTableColumn = {
            header: "电话",
            key: "phone",
            unSelectable: true,
            primary: true
        };
        let idColumn: UTableColumn = {
            header: "UUID",
            key: "id"
        };
        let createTimeStrColumn: UTableColumn = {
            header: "创建时间",
            key: "createTimeStr"
        };
        this.columns.push(userNameColumn, statusColumn, phoneColumn, idColumn, createTimeStrColumn);
        this.getData();
    };

    async getData() {
        let ret: ShowAllAccountResponseData;
        try {
            ret = await this.showAllAccountApi.doShowAllAccount({start: this.state.start, limit: this.state.limit});
            this.setState({
                data: ret.data,
                total: ret.total
            });
            this.tableRef.current.setData(ret.data);
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <UButton 
                        label={'刷新'}
                        graph={<UIcon iconName={'refresh'}/>}
                        onClick={() => this.getData()}
                    />
                </div>
                <div>
                    <UTable
                        column={this.columns}
                        ref={this.tableRef}
                        withHead={true}
                        withCheck={true}
                        withIndex={true}
                        multi={true}
                        onSelected={(ret: any[]) => {ret.length > 0 ? console.log(ret[0].username) : console.log("")}}
                    />
                </div>
                <div>
                    <UPager
                        limit={this.state.limit}
                        total={this.state.total}
                        onChange={(p) => {this.setState({start: p*this.state.limit}, () => {this.getData()})}}/>
                </div>
            </div>
        )
    }
}
