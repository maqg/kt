import {EventEmitter} from "events";
export const GlobalEvent = new EventEmitter();
export const NAV_JUMP_EVENT = 'nav_jump';
export interface ValidateResult {
    isError: boolean,
    message: string
}
export interface Validator {
    doValidate: (...args: any[]) => ValidateResult,
    doValidateAsync?: (...args: any[]) => Promise<ValidateResult>
}