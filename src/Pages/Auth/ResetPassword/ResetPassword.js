import React from 'react';
import Input from '../../../components/UI//Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ResetPassword.module.css';
import {Redirect} from 'react-router-dom';
import axios from '../../../axiosInstance';

class ResetPassword extends React.Component {
    state = {
        isSuccess: false,
        errorMessage: null,
        token: null,
        userId: null,
        controls : {
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Mật khẩu'
                },
                value: '',
                validation: {
                    minLength: 5,
                    required: true,
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
                    confirm: true,
                    required: true
                },
                valid: false,
                touched: false,
                messageError: 'Nhập lại mật khẩu chưa chính xác'
            }
        }
    }
    checkValidity ( value, rules,  password = null ) {
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
    
    submitHandler = (event) => {
        event.preventDefault();
        axios.post('auth/new-password', {
            password: this.state.controls.password.value,
            passwordConfirmation: this.state.controls.passwordConfirmation.value,
            token: this.state.token,
            userId: this.state.userId
        })
        .then(res => {
            alert(res.data.message);
            return this.setState({isSuccess: true});
        })
        .catch(err =>{
            if(err.response.data.error){
                this.setState({errorMessage: err.response.data.error[0].msg})
            } else{
                this.setState({errorMessage: err.response.data.message})
            }
        });
    }
    componentDidMount() {
        let updateSearch=null;
        const query = new URLSearchParams(this.props.location.search);
        for(let param of query.entries()) {
            updateSearch = param[1];
        }
        const token = this.props.location.pathname.split('/')[2];
        this.setState({token: token, userId: updateSearch});
    }
    render () {
        let formElementArray = [];
        for( let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement => (
            <Input
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
        if(this.state.errorMessage){
            errorMessage = (
                <p>{this.state.errorMessage}</p>
            );
        }
        let authRedirect = null;
        if(this.state.isSuccess) {
            authRedirect = <Redirect to='/login' />;
        }
        return (
            <div className={classes.ContactData}>
                <h1>Thay đổi password</h1>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button 
                        btnType="Success" 
                        clicked={this.orderHandler} 
                        disabled={!(this.state.controls.password.valid && this.state.controls.passwordConfirmation.valid)} >Gửi</Button>
                </form>
            </div>
        );
    }
}
export default ResetPassword;