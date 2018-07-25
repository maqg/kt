import * as React from "react";
import {UButton, UPager} from "../../ui-libs";
import {UTable, UTableColumn} from "../../ui-libs/ui-table/u-table";
import {UIcon} from "../../ui-libs/ui-icon";
import {ShowAllUserApi, ShowAllUserResponseData} from "../../util-tools/api/show-all-user-api";
import {ReactElement, RefObject} from "react";

export interface UserViewStates {
    data: [ShowAllUserResponseData],
    start: number,
    limit: number,
    total: number
}

export class UserView extends React.Component<any, UserViewStates> {
    showAllUserApi: ShowAllUserApi;
    columns: UTableColumn[] = [];
    tableRef: RefObject<UTable> = React.createRef();
    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            start: 0,
            limit: 10,
            total: 0
        };
        this.showAllUserApi = new ShowAllUserApi();
        let nickNameColumn: UTableColumn = {
            header: "名称",
            key: "nickname"
        };
        let typeColumn: UTableColumn = {
            header: "类型",
            key: "type",
            fill: value => {
                let ret: ReactElement<any> = <span>OTHER</span>;
                if(value) {
                    ret = <span>WX</span>;
                }
                return ret;
            }
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
            key: "phone"
        };
        let countryColumn: UTableColumn = {
            header: "注册地址",
            key: "country",
            primary: true,
            fill: (value, data) => {
                if(value) {
                    return <span>{data['country'] + " " + data['province'] + "省" + data['city'] + "市"}</span>;
                }
                return <span>{value}</span>;
            }
        };
        let couponsColumn: UTableColumn = {
            header: "优惠券数量",
            key: "coupons"
        };
        let cashColumn: UTableColumn = {
            header: "余额",
            key: "cash",
            fill: value => {
                let ret: ReactElement<any> = <span>0 元</span>;
                if(value) {
                    ret = <span>{value} 元</span>;
                }
                return ret;
            }
        };
        let timesColumn: UTableColumn = {
            header: "使用时间",
            key: "times",
            fill: value => {
                let ret: ReactElement<any> = <span>0 分钟</span>;
                if(value) {
                    ret = <span>{value} 分钟</span>;
                }
                return ret;
            }
        };
        let distanceColumn: UTableColumn = {
            header: "距离",
            key: "distance",
            fill: value => {
                return <span>{value} 米</span>
            }
        };
        let longitudeColumn: UTableColumn = {
            header: "经度",
            key: "longitude"
        };
        let latitudeColumn: UTableColumn = {
            header: "纬度",
            key: "latitude"
        };
        let createTimeStrColumn: UTableColumn = {
            header: "创建时间",
            key: "createTimeStr"
        };
        this.columns.push(nickNameColumn, typeColumn, statusColumn, phoneColumn, countryColumn, couponsColumn, cashColumn, timesColumn, distanceColumn, longitudeColumn, latitudeColumn, createTimeStrColumn);
        this.getData();
    }
    async getData() {
        let ret: ShowAllUserResponseData;
        try {
            ret = await this.showAllUserApi.doShowAllUser({start: this.state.start, limit: this.state.limit});
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
        return <div>
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
                    onChange={(p) => {this.setState({start: p*this.state.limit}, () => {this.getData()})}}
                />
            </div>
        </div>
    }
}