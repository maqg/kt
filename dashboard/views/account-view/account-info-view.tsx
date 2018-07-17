import * as React from "react";
import {ShowAccountApi, ShowAccountResponseData} from "../../util-tools/api/show-account-api";
import {ErrorObj} from "../../util-tools/api/api-tools";

export interface AccountInfoViewStates {
    error: ErrorObj;
    data: ShowAccountResponseData;
}

export class AccountInfoView extends React.Component<any>{
    showAccountApi: ShowAccountApi;
    constructor(props: any) {
        super(props);
        this.showAccountApi = new ShowAccountApi();

    }
    render(){
        return <div className={'account-info-view'}>
            <div className={'title'}>当前用户信息</div>
            <div className={'content'}>

            </div>
        </div>
    }
}