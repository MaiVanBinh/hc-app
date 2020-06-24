import React from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './CheckMeal.module.css';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import Heading from '../../UI/Heading/Heading';

class CheckMeal extends React.Component {
    _isMounted = false;
    state = {
        content: {
            mode: true,
            isSignup: true,
            elementType: 'input',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Nhập bình luận'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        method: {
            elementType: 'select',
            elementConfig: {
                options: []
            },
            value: '',
            validation: {},
            valid: true
        },
        show: false,
        page: 1
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get('methods')
          .then(res => {
              const options = res.data.map((method) => ({value: method.name, displayValue: method.name}));
              const method = {...this.state.method};
              method.elementConfig.options = options;
              method.value = options[0].value;
              if(this._isMounted){
                this.setState({method: method});
              }
          })
          .catch(e => console.log(e));
      }
    componentWillUnmount() {
    this._isMounted = false;
    }
    inputChangeHandler = (event, mode) => {
        if(mode === 'textarea'){
            const content = {...this.state.content};
            content.value = event.target.value;
            this.setState({content: content})
        } else if(mode === 'select') {
            const method = {...this.state.method};
            method.value = event.target.value;
            this.setState({method: method})
        }
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.patch('/meals/' + this.props.mealId+'/meal-comfirm', {
            content: this.state.content.value,
            method: this.state.method.value,
            mode: this.state.mode
        }, config)
        .then(res => {
            const content = {...this.state.content};
            content.value = '';
            this.setState({content: content});
            alert('Comfirm Success');
        })
        .catch(e => {
            console.log(e);
        })
    }

    render() {
        return(
            <section className={classes.Section}>
                <Heading>Xác nhận món ăn</Heading>
                <form className = {classes.CommentBox} onSubmit={this.onSubmitHandler}>
                    <h4>Tin nhắn xác nhận</h4>
                    <Input
                        elementType={"textarea"}
                        elementConfig={this.state.content.elementConfig}
                        value={this.state.content.value}
                        touched={this.state.content.touched}
                        changed={(event) => this.inputChangeHandler(event, 'textarea')}
                        invalid={!this.state.content.valid}
                        shouldValidate={this.state.content.validation}
                    />
                    <h4>Phân loại phương pháp nấu</h4>
                    <Input
                        elementType={"select"}
                        elementConfig={this.state.method.elementConfig}
                        value={this.state.method.value}
                        touched={this.state.method.touched}
                        changed={(event) => this.inputChangeHandler(event, 'select')}
                        invalid={!this.state.method.valid}
                        shouldValidate={this.state.method.validation}
                    />
                    <Button btnType="Success" type="submit" clicked={() => (this.setState({mode: true}))} disabled={this.state.content.value === ''}>Thông qua</Button>
                    <Button btnType="Danger" type="submit" clicked={() => (this.setState({mode: false}))} disabled={this.state.content.value === ''}>Không thông qua</Button>
                </form>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(CheckMeal);