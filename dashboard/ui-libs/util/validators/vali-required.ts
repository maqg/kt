import {ValidateResult, Validator} from "../common";

export class ValiRequired implements Validator{
    requiredName: string;
    constructor(requiredName: string) {
        this.requiredName = requiredName;
    }
    doValidate(value: string): ValidateResult {
        if (value && value.trim().length > 0) {
            return {
                isError: false,
                message: 'hello world'
            }
        } else {
            return {
                isError: true,
                message: this.requiredName + "不能为空！"
            }
        }
    };
}