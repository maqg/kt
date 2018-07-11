import {SignTool} from "../sign-tool";
import axios, {AxiosError, AxiosResponse} from 'axios';
export interface APIRequestParas {[key:string]: any}
export interface APIRequest{
    api: string,
    token: string,
    timestamp: number,
    sign: string
    paras: APIRequestParas
}
export class ErrorObj extends Error{
    errorLog: string;
    errorNo: number;
    errorMsg: string;
}
export interface APIResponseData {
    [key: string]: any
}
export interface APIResponse<T extends APIResponseData> {
    errorObj: ErrorObj,
    data: T
}
export class ApiTools implements APIRequest {
    api: string;
    paras: APIRequestParas;
    sign: string;
    timestamp: number;
    token: string;
    protected preRequest() {
        this.timestamp = (new Date()).getTime();
        this.sign = SignTool.createSign(this);
    }
    protected async doPost<T extends APIResponseData>(paras:APIRequestParas): Promise<APIResponse<T>> {
        this.paras = paras;
        this.preRequest();
        let ret: AxiosResponse;
        try{
            ret = await axios.post('api/', this);
        } catch (e) {
            let error = new ErrorObj();
            error.errorMsg = e.message;
            error.errorNo = e.response.status;
            error.errorLog = e.stack;
            throw error;
        }
        return ret.data;
    }
}



