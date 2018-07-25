import * as React from "react";
import {Component, MouseEvent, RefObject} from "react";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";
import {ShowAllAccountApi, ShowAllAccountResponseData} from "../../util-tools/api/show-all-account-api";
import {RouteComponentProps, withRouter} from "react-router";
import {UButton} from "../../ui-libs";
import {UIcon} from "../../ui-libs/ui-icon";

export interface AccountViewStates {
    data: [ShowAllAccountResponseData],
    value: string
}
export class AccountView extends React.Component<any, AccountViewStates> {
    showAllAccountApi: ShowAllAccountApi;
    columns: UTableColumn[] = [];
    tableRef: RefObject<UTable> = React.createRef();

    constructor(props: RouteComponentProps<any>) {
        super(props);
        let userNameColumn: UTableColumn = {
            header: "名称",
            key: "username"
        };
        let statusColumn: UTableColumn = {
            header: "状态",
            key: "status"
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
        this.showAllAccountApi = new ShowAllAccountApi();
        this.state = {
            data: null,
            value: ""
        };
        this.getData();
    };

    async getData() {
        let ret: ShowAllAccountResponseData;
        try {
            ret = await this.showAllAccountApi.doShowAllAccount({start: 0, limit: 100});
            this.setState({data: ret.data});
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
                        withHead={true}
                        ref={this.tableRef}
                        withCheck={true}
                        withIndex={true}
                        multi={true}
                        onSelected={(ret: any[]) => {ret.length > 0 ? console.log(ret[0].username) : console.log("")}}
                    />
                </div>
                <div>

                </div>
            </div>
        )
    }
}
