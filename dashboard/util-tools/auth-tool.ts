import {Base64} from "js-base64";
const AUTH_NAME: string = 'KT_AUTH';
export interface AuthUser {
    id: string,
    username: string,
    role: number,
    token: string
}
export class AuthTool {
    static setAuthInfo(user: AuthUser) {
        let jsonData = JSON.stringify(user);
        let base64Data = Base64.encode(jsonData);
        localStorage.setItem(AUTH_NAME, base64Data);
    }
    static getAuthInfo(): AuthUser {
        let base64Data = localStorage.getItem(AUTH_NAME);
        let jsonData = Base64.decode(base64Data);
        return JSON.parse(jsonData);
    }
    static clearAuthInfo() {
        localStorage.clear();
    }
    static hasAuth():boolean {
        return localStorage.getItem(AUTH_NAME) !== null
    }
}