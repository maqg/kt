import {APIRequest, APIRequestParas, APIResponse, APIResponseData, ApiTools} from './api-tools';
import {AuthTool} from "../auth-tool";

export interface ShowAllUserParas extends APIRequestParas {
    id?: string,
    unionId?: string,
    openId?: string,
    phone?: number,
    sNickname?: string,
    startTime?: string,
    endTime?: string,
    start: number,
    limit: number
}
export interface ShowAllUserResponseData extends APIResponseData {
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
export class ShowAllUserApi extends ApiTools {
    api = "octlink.kt.v1.user.APIShowAllUser";

    async doShowAllUser(paras:ShowAllUserParas):Promise<ShowAllUserResponseData> {
        this.token = AuthTool.getAuthInfo().token;
        let response: APIResponse<ShowAllUserResponseData>;

        try {
            response = await this.doPost<ShowAllUserResponseData>(paras);
        } catch (e) {
            throw e;
        }
        if (response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}