import {APIRequest, APIRequestParas, APIResponse, APIResponseData, ApiTools} from './api-tools';
import {AuthTool} from "../auth-tool";

export interface ShowUserParas extends APIRequestParas {
    id: string
}
export interface ShowUserResponseData extends APIResponseData {
    avatar: string,
    cash: number,
    coupons: number,
    createTime: number,
    createTimeStr: string,
    deleteTime: number,
    deleteTimeStr: string,
    gender: number,
    id: string,
    lastLogin: string,
    lastLoginStr: string,
    lastRent: number,
    lastRentStr: string,
    nickname: string,
    openId: string,
    phone: string,
    registerLatitude: number,
    registerLongitude: number,
    status: string,
    type: number,
    unionId: string,
    unpaied: number,
    updateTime: number,
    updateTimeStr: string
}

export class ShowUserApi extends ApiTools {
    api = "octlink.kt.v1.user.APIShowUser";

    async doShowUser(paras:ShowUserParas):Promise<ShowUserResponseData> {
        this.token = AuthTool.getAuthInfo().token;
        let response: APIResponse<ShowUserResponseData>;

        try {
            response = await this.doPost<ShowUserResponseData>(paras);
        } catch (e) {
            throw e;
        }
        if(response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}