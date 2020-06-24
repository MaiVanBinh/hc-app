import React from 'react';
import './Auth.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Model';
import axios from '../../axiosInstance';
import FacebookLogin from 'react-facebook-login';
import Button from '../../components/UI/Button/Button';

class Auth extends React.Component {
    state = {
        emailReset: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            messageError: 'Hãy nhập một email hợp lệ',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        error: false,
        isSummit: false,
        isSignup: false,
        showReset: false,
        controls: {
            name: {
                isSignup: true,
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Nhập tên'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
                messageError: 'Tên chưa ít nhất 2 ký tự'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                messageError: 'Hãy nhập một email hợp lệ',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Mật khẩu'
                },
                value: '',
                validation: {
                    minLength: 5
                },
                valid: false,
                touched: false,
                messageError: "Password chứa ít nhất 5 ký tự, không bao gồm ký tự đặc biệt"
            },
            passwordConfirmation: {
                isSignup: true,
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Nhập lại mật khẩu'
                },
                value: '',
                validation: {
                    confirm: true
                },
                valid: false,
                touched: false,
                messageError: 'Nhập lại mật khẩu chưa chính xác'
            }
        }
    }

    switch = (name) => {
        if((name === 'login' && !this.state.isSignup) || (name === 'signup' && this.state.isSignup)){
            const inputControlsCopy = JSON.stringify(this.state.controls);
            const updateInput = JSON.parse(inputControlsCopy);
            for (const element in updateInput){
                updateInput[element].value = '';
                updateInput[element].touched = false;
            }
            this.setState(prevState => ({
                isSignup: !prevState.isSignup,
                controls: updateInput
            }));
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.name.value, this.state.controls.email.value, this.state.controls.password.value, this.state.controls.passwordConfirmation.value, this.state.isSignup);
        this.setState({isSummit: true});
    }

    checkValidity ( value, rules, password = null ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
        if(rules.confirm) {
            isValid = password  === value;
        }
        return isValid;
    }
    
    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName] : { 
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation, this.state.controls.password.value),
                touched: true
            }
        };
        this.setState({controls: updateControls});
    }
    errorComfirmedHandler  = () => {
        this.props.onDeleteError();
    }
    componentDidUpdate(prevProps) {
        if(this.props.caSuccess&&prevProps.caSuccess !== this.props.caSuccess){
            this.setState({isSignup: false});
        }
    }
    responseFacebook = (response) => {
        axios.get('auth/facebook/token?access_token=' +response.accessToken)
            .then(res => this.props.onLoginFacebook(res.data))
            .catch(e => console.log(e));
      }
    resetShowHandler = () => {
        this.setState(prevState => ({showReset: !prevState.showReset}));
    } 
    changePassword = () => {
        this.setState({showReset: true})
    }
    emailResetChangeHanlder = (event) => {
        const updateEmailReset = {
            ...this.state.emailReset,
            value: event.target.value,
            touched: true,
            valid: this.checkValidity(event.target.value, this.state.emailReset.validation),
        }
        this.setState({emailReset: updateEmailReset});
    } 
    requestResetPassword = (event) => {
        event.preventDefault();
        axios.post('auth/reset-password', {email: this.state.emailReset.value})
            .then(res => alert(res.data.message))
            .catch(err => alert(err.response.data.message))
    }
    render() {
        let style = {left: '0px'};
        if(this.state.isSignup) {
            style = {left: '110px'};
        }

        let formElementArray = [];
        for( let key in this.state.controls) {
            if(this.state.isSignup){
                formElementArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            } else {
                if(!this.state.controls[key].isSignup) {
                    formElementArray.push({
                        id: key,
                        config: this.state.controls[key]
                    })
                }
            }
        }
        let form = formElementArray.map(formElement => (
            <Input
                inputRegister
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                key={formElement.id}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                messageError={formElement.config.messageError}
                />
        ));
        let errorMessage = null;
        if(this.props.error && Array.isArray(this.props.error)){
            errorMessage = this.props.error.map(e => <p style={{textAlign: 'center'}} key={e}>{e}</p>)
        }
        
        let authRedirect = null;
        if(this.props.isAuthenticated && !this.state.isSignup) {
            authRedirect = <Redirect to={this.props.redirectPath} />;
        }

        return(
            <div className="hero">
                {authRedirect}
                <Modal show={this.state.showReset} BackdropClicked={this.resetShowHandler}>
                    <div>
                        <form onSubmit={this.requestResetPassword}>
                            <label>Nhập Email để change password:</label>
                            <Input
                                elementType={this.state.emailReset.elementType}
                                elementConfig={this.state.emailReset.elementConfig}
                                value={this.state.emailReset.value}
                                touched={this.state.emailReset.touched}
                                changed={this.emailResetChangeHanlder}
                                invalid={!this.state.emailReset.valid}
                                shouldValidate={this.state.emailReset.validation}
                                messageError={this.state.emailReset.messageError}
                                />
                            <Button 
                                btnType="Success" 
                                type="submit" 
                                disabled={!this.state.emailReset.valid} >Gửi</Button>
                        </form>
                    </div>
                </Modal>
                <Modal show={this.props.error || this.props.caSuccess}  BackdropClicked={this.errorComfirmedHandler}>
                    {errorMessage || 'Tạo tài khoản thành công'}
                </Modal>
                <div className="form-box">
                    <div className="button-box">
                        <div id="btn" style={style}></div>
                        <button type="button" className="toggle-btn" onClick={() => this.switch('signup')}>Đăng nhập</button>
                        <button type="button" className="toggle-btn" onClick={() => this.switch('login')}>Đăng ký</button>
                    </div>
                    <form id="login" className="input-group" onSubmit={this.submitHandler}>
                        {form}
                        {this.state.isSignup ? null : <p className="reset-pw-btn" onClick={this.changePassword}>Quên mật khẩu</p>}
                        <div className="login-button">
                        <button type="submit" className="submit-btn">
                            {!this.state.isSignup ? 'Đăng nhập' : 'Đăng ký'}
                        </button>
                        <p style={{textAlign: 'center', color: "#fff", fontWeight: "bold", marginTop: "7px"}}>Hoặc</p>
                        <FacebookLogin
                            appId="687080142132030"
                            autoLoad={false}
                            fields="name, email, picture"
                            scope="public_profile"
                            cssClass="submit-btn-social"
                            callback={this.responseFacebook}
                            textButton="Đăng nhập với facebook"
                            />
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        caSuccess: state.auth.caSuccess,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password, passwordConfirmation, isSignup) => dispatch(actions.auth(name, email, password, passwordConfirmation, isSignup)),
        onDeleteError: () => dispatch(actions.deleteError()),
        onLoginFacebook: (payload) =>dispatch(actions.authLoginSocialNetwork(payload)) 
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);