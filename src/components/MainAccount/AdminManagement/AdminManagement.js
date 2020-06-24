import React from 'react';
import classes from './AdminManagement.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import axios from '../../../axiosInstance';
import { connect } from 'react-redux';
import Modal from '../../UI/Modal/Model';
import DeleteAdmin from './DeteleAdmin/DeleteAdmin';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinner/Spinner';
import Heading from '../../UI/Heading/Heading';

class AdminManagement extends React.Component {
    state = {
        admins: null,
        currentAdmin: null,
        show: false,
        formValid: false,
        deleting: false,
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
            },
            role: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'ad', displayValue: 'admin'},
                        {value: 'sad', displayValue: 'super admin'}
                    ]
                },
                value: 'ad',
                validation: {},
                valid: true
            }
        },
        loading: false
    }
    componentDidMount() {
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.get('/admin/ad', config)
            .then(req => {
                this.setState({admins: req.data.admins})
            })
            .catch(e => {
                console.log(e);
            })
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
        let formIsInvalid = true;
        for(let inputId in updateControls){
            formIsInvalid = updateControls[inputId].valid && formIsInvalid;
        }
        this.setState({controls: updateControls, formValid: formIsInvalid});
    }
    showAddAdminBoxHandler = () =>  {
        const controlsUpdate = JSON.parse(JSON.stringify(this.state.controls));
        for(const inputElement in controlsUpdate) {
            controlsUpdate[inputElement].value =  '';
            controlsUpdate[inputElement].touched = false;
        }
        this.setState(prevState => ({show: !prevState.show, controls: controlsUpdate}));
    } 
    addAdminHandler = () => {
        const controlsUpdate = JSON.parse(JSON.stringify(this.state.controls));
        for(const inputElement in controlsUpdate) {
            controlsUpdate[inputElement].value =  '';
            controlsUpdate[inputElement].touched = false;
        }
    }
    onAddAdminHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const adminAdata = {
            name: this.state.controls.name.value,
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            passwordConfirmation: this.state.controls.passwordConfirmation.value,
            role: this.state.controls.role.value || 'ad'
        }
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.post('/admin/ad', adminAdata, config)
            .then(req => {
                const updateAdmins = [...this.state.admins];
                updateAdmins.push(req.data.admin);
                this.setState({admins: updateAdmins});
                alert('Create admin succes!');
                this.setState({loading: false, show: false});
            })
            .catch(e => {
                this.setState({loading: false, show: false});
            })
    }
    deletingHanlder = (adminId) => {
        const currentAdmin = this.state.admins.find(admin => (admin._id.toString() === adminId.toString()));
        this.setState({deleting: true, currentAdmin: currentAdmin});
    }
    deleteCancel = () => {
        this.setState({deleting: false});
    }
    deleteAdminHandler = (adminId) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.delete('/admin/ad/' + adminId, config)
            .then(() => {
                const admins = [...this.state.admins];
                const updateAdmins = admins.filter(admin => (admin._id.toString() !== adminId.toString()));
                this.setState({admins: updateAdmins, deleting: false});
                alert('Delete admin success');
            })
            .catch(e => {
                console.log(e);
            })
    }
    cancelAddAdminHandler = () => {
        this.setState({show: false});
    }
    render() {
        let formElementArray = [];
        for( let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
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
        let listAdmin = null;
        if(this.state.admins){
            listAdmin = this.state.admins.map(admin => {
                return(
                    <tr key={admin._id}>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role}</td>
                        <td>{admin.createdAt.split('T')[0]}</td>
                        <td>{admin.updatedAt.split('T')[0]}</td>
                        {admin.role === 'ad' ? 
                        <Aux>
                            <td><Button btnType='Success'>Update</Button></td>
                            <td><Button btnType='Danger' clicked={() => this.deletingHanlder(admin._id)}>Delete</Button></td>
                        </Aux>
                        : null}
                    </tr>
                );
            })
        }
        let spinner = null;
        if(this.state.loading === true) {
            spinner = <Spinner />;
        }
        return(
            <section className={classes.Section}>
                <Modal show={this.state.deleting} BackdropClicked={this.deleteCancel}>
                    <DeleteAdmin 
                        admin={this.state.currentAdmin ? this.state.currentAdmin : null}
                        deleteAdmin={() => this.deleteAdminHandler(this.state.currentAdmin._id)}
                        cancelDelete={this.deleteCancel}
                    />
                </Modal>
                <Heading>Quản lý admin</Heading>
                <div className={classes.Button}>
                    <Button btnType="Success" clicked={this.showAddAdminBoxHandler}>Tạo admin mới</Button>
                </div>
                {spinner}
                {this.state.show ? 
                    <form onSubmit={this.onAddAdminHandler}>
                        {form}
                        <Button type="submit" btnType="Success" clicked={this.addAdminHandler} disabled={!this.state.formValid}>Tạo</Button>
                        <Button btnType="Danger" clicked={this.cancelAddAdminHandler}>Hủy</Button>
                    </form>
                    : null}
                    <table className={classes.Table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created at</th>
                                <th>Update at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAdmin}
                        </tbody>
                    </table>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(AdminManagement);