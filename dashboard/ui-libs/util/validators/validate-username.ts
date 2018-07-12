import {ValidateResult, Validator} from "../common";

export class ValidateUsername implements Validator{
    pattern: RegExp = /^[a-zA-Z0-9_]{6,18}$/;
    useFor: string;
    constructor(userFor: string) {
        this.useFor = userFor;
    }
    doValidate (name:string): ValidateResult{
        let isRight = this.pattern.test(name);
        if (isRight) {
            return {
                start: true,
                isError: false,
                message: this.useFor + "应为6到18位 [ 字母 | 数字 | 下划线 ] !"
            }
        } else {
            return {
                start: true,
                isError: true,
                message: this.useFor + "应为6到18位 [ 字母 | 数字 | 下划线 ] !"
            }
        }
    };

    getAlter(): ValidateResult {
        return {
            start: false,
            isError: false,
            message: this.useFor + "应为6到18位 [ 字母 | 数字 | 下划线 ] !"
        }
    };

}