export interface AuthUser {
    id: string,
    username: string,
    role: number,
    token: string
}
export class AuthTool {
    _user: AuthUser
}