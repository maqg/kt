import * as React from "react";
import './login-view.scss';
import {UIcon} from "../../ui-libs/ui-icon";
import {UButton, UTextInput, ValidateResult} from "../../ui-libs";
import {RefObject} from "react";
import {ValidatePassword, ValidateUsername} from "../../ui-libs/util/validators";
import {RouteComponentProps, withRouter} from "react-router";
import {LoginApi, LoginResponseData} from "../../util-tools/api/login-api";
import {ErrorObj} from "../../util-tools/api/api-tools";
import {AuthTool} from "../../util-tools/auth-tool";

export interface LoginViewStates {
    usernameRet: ValidateResult;
    passwordRet: ValidateResult;
    formDisabled: boolean;
    loginError: ErrorObj;
}

class LoginView extends React.Component<RouteComponentProps<any>, LoginViewStates>{
    userNameInput: RefObject<UTextInput>;
    passwordInput: RefObject<UTextInput>;
    uValidator: ValidateUsername;
    pValidator: ValidatePassword;
    loginApi: LoginApi;
    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.userNameInput = React.createRef();
        this.passwordInput = React.createRef();
        this.uValidator = new ValidateUsername('账号');
        this.pValidator = new ValidatePassword();
        this.state = {
            usernameRet: this.uValidator.getAlter(),
            passwordRet: this.pValidator.getAlter(),
            formDisabled: false,
            loginError: null
        };
        this.loginApi = new LoginApi();
    }
    componentDidMount(){
        this.userNameInput.current.setFocus();
    }
    usernameEdit(value: string) {
        this.setState({
            usernameRet: this.uValidator.doValidate(value)
        })
    }
    passwordEdit(value: string) {
        this.setState({
            passwordRet: this.pValidator.doValidate(value)
        })
    }
    async doLogin() {
        let ret: LoginResponseData;
        this.setState({formDisabled: true}, async ()=>{
            try{
                ret = await this.loginApi.doLogin({username: this.userNameInput.current.state.value,password: this.passwordInput.current.state.value});
                AuthTool.setAuthInfo({
                    id: ret.cookie.id,
                    username: ret.cookie.username,
                    role: ret.cookie.role,
                    token: ret.token
                });
                this.props.history.push('/main')
            } catch (e) {
                console.error(e);
                this.setState({loginError: e, formDisabled: false})
            }
        })


    }
    render() {
        return <div className={'kt-login-view' + (this.state.loginError && this.state.loginError.errorNo !== 0 ? " error" : '')}>
            <div className={'panel-center'}>
                <div className={'login-error'}>
                    {this.state.loginError && this.state.loginError.errorNo !== 0 && this.state.loginError.errorMsg}
                </div>
                <div className={'panel-main'}>
                    <div className={'title'}>
                        <span className={'icon'}><UIcon iconName={'user-circle-o'}/></span>
                        <span className={'label'}>用户登录</span>
                    </div>
                    <div className={'login-form'}>
                        <div className={'username-input'}>
                            <UTextInput
                                disabled={this.state.formDisabled}
                                label={'账号'}
                                onChange={(v)=>this.usernameEdit(v)}
                                placeholder={'输入账号'}
                                isError={this.state.usernameRet.isError}
                                ref={this.userNameInput}/>
                            <div className={'error-msg' + (this.state.usernameRet.isError ? " error":"")}>
                                {this.state.usernameRet && this.state.usernameRet.message}
                            </div>
                        </div>
                        <div className={'password-input'}>
                            <UTextInput
                                label={'密码'}
                                isPassword={true}
                                disabled={this.state.formDisabled}
                                onChange={(v)=>this.passwordEdit(v)}
                                placeholder={'输入密码'}
                                isError={this.state.passwordRet.isError}
                                ref={this.passwordInput}/>
                            <div className={'error-msg' + (this.state.passwordRet.isError ? " error" : "")}>
                                {this.state.passwordRet && this.state.passwordRet.message}
                            </div>
                        </div>
                        <div className={'submit-button'}>
                            <UButton graph={<UIcon iconName={'sign-in'}/>}
                                     label={'登录'}
                                     onClick={()=>this.doLogin()}
                                     disabled={this.state.passwordRet.isError ||
                                     this.state.usernameRet.isError ||
                                     !this.state.passwordRet.start ||
                                     !this.state.usernameRet.start || this.state.formDisabled}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default withRouter(LoginView);