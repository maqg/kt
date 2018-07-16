import {APIRequest} from "./api/api-tools";
const sha1 = require('js-sha1');

export class SignTool {

    static createSign(paras: APIRequest): string {

        let parasStr = "";
        let params: string[] = [];

        parasStr += "api=" + paras["api"];
        parasStr += "timestamp=" + paras["timestamp"];

        if (paras.hasOwnProperty("token")) {
            parasStr += "token=" + paras["token"];
        }

        for (let key in paras["paras"]) {
            params.push(key);
        }
        params.sort();

        for (let key of params) {
            parasStr += key + "=" + paras["paras"][key];
        }
        // console.log("got sign " + sign + " of " + parasStr);

        return sha1(parasStr);
    }
}






