import {APIRequest, APIRequestParas, APIResponse, APIResponseData, ApiTools} from './api-tools';
import {AuthTool} from "../auth-tool";

export interface ShowAllAccountParas extends APIRequestParas {
    sId?: string,
    sUsername?: string,
    start: number,
    limit: number
}
export interface ShowAllAccountResponseData extends APIResponseData {
    id: string,
    role: number,
    status: string,
    username: string,
    password: string,
    phone: string,
    lastLogin: number,
    createTime: number,
    updateTime: number,
    deleteTime: number,
    lastLoginStr: string,
    createTimeStr: string,
    updateTimeStr: string,
    deleteTimeStr: string
}
export class ShowAllAccountApi extends ApiTools {
    api = "octlink.kt.v1.account.APIShowAllAccounts";

    async doShowAllAccount(paras: ShowAllAccountParas): Promise<ShowAllAccountResponseData> {
        this.token = AuthTool.getAuthInfo().token;
        let response: APIResponse<ShowAllAccountResponseData>;

        try {
          response = await this.doPost<ShowAllAccountResponseData>(paras);
        } catch(e) {
            throw e;
        }
        if(response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}