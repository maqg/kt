import {APIRequest, APIRequestParas, APIResponse, APIResponseData, ApiTools} from './api-tools';
import {AuthTool} from "../auth-tool";

export interface UpdateUserStatusParas extends APIRequestParas{
    id:string,
    status:string
}
export interface UpdateUserStatusResponseData extends APIResponseData{

}
export class UpdateUserStatusApi extends ApiTools {
    api = "octlink.kt.v1.user.APIUpdateUserStatus";

    async doUpdateUserStatus(paras:UpdateUserStatusParas):Promise<UpdateUserStatusResponseData>{
        this.token = AuthTool.getAuthInfo().token;
        let response:APIResponse<UpdateUserStatusResponseData>;

        try {
            response = await this.doPost(paras);
        } catch (e) {
            throw e;
        }
        if(response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}