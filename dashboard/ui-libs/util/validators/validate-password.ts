import {ValidateResult, Validator} from "../common";

export class ValidatePassword implements Validator{
    doValidate (pwd: string): ValidateResult {
        if(pwd.length > 5 && pwd.length < 19) {
            return {
                start: true,
                isError: false,
                message: '密码应为 6到18位 任意可输入字符!'
            } ;
        } else {
            return {
                start: true,
                isError: true,
                message: "密码应为 6到18位 任意可输入字符!"
            }
        }
    }

    getAlter (): ValidateResult {
        return {
            start: false,
            isError: false,
            message: '密码应为 6到18位 任意可输入字符!'
        } ;
    };

}