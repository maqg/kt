import {APIRequestParas, APIResponse, APIResponseData, ApiTools} from "./api-tools";
import {AuthTool} from "../auth-tool";

export interface ShowAccountParas extends APIRequestParas{
    id: string
}
export interface ShowAccountResponseData extends APIResponseData{
    id: string,
    role: number,
    status: string,
    username: string,
    phone: string,
    lastLogin: number,
    createTime: number,
    updateTime: number
}
export class ShowAccountApi extends ApiTools{
    api="octlink.kt.v1.account.APIShowAccount";
    async doShowAccount(paras: ShowAccountParas): Promise<ShowAccountResponseData> {
        this.token = AuthTool.getAuthInfo().token;
        let response: APIResponse<ShowAccountResponseData>;
        try {
            response = await  this.doPost<ShowAccountResponseData>(paras);
        } catch (e) {
            throw e;
        }
        if(response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}