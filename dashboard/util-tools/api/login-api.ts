import {APIRequest, APIRequestParas, APIResponse, APIResponseData, ApiTools} from "./api-tools";
import axios from 'axios';
import {Base64} from "js-base64";
export interface LoginParas extends APIRequestParas{
    username: string
    password: string
}
export interface LoginResponseData extends APIResponseData{
    cookie: {
        id: string,
        username: string,
        role: number
    },
    token: string,
    userId: string,
    role: number,
    username: string
}
export class LoginApi extends ApiTools {
    api = "octlink.kt.v1.account.APILoginByAccount";
    paras: LoginParas;
    sign: string;
    timestamp: number;
    token: "";

    async doLogin(loginParas: LoginParas):Promise<LoginResponseData>  {
        let paras = loginParas;
        paras.password = Base64.encode(paras.password);
        let response: APIResponse<LoginResponseData>;
        try{
            response = await this.doPost<LoginResponseData>(paras);
        } catch (e) {
            throw e;
        }
        if (response.errorObj.errorNo !== 0) {
            throw response.errorObj;
        }
        return response.data;
    }
}