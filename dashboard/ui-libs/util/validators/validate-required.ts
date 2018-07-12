import {ValidateResult, Validator} from "../common";

export class ValidateRequired implements Validator{
    requiredName: string;
    constructor(requiredName: string) {
        this.requiredName = requiredName;
    }
    doValidate(value: string): ValidateResult {
        if (value && value.trim().length > 0) {
            return {
                start: true,
                isError: false,
                message: 'hello world'
            }
        } else {
            return {
                start: false,
                isError: true,
                message: this.requiredName + "不能为空！"
            }
        }
    }

    getAlter (): ValidateResult{
        return {
            start: false,
            isError: false,
            message: 'hello world'
        }
    }

}