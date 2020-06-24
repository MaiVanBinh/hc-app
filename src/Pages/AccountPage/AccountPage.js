import React from 'react';
import SideBar from '../../components/SideBar/SideBarAccount/SideBarAccount';
import MainAccount from '../../components/MainAccount/MainAccount';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class AccountPage extends React.Component{
    state= {
        show: 1
    }
    purchaseHandler = () => {
        this.setState({show: 2});
    }
    mealsLikeHandler = () => {
        this.setState({show: 1})
    }
    addMealHandler = () => {
        this.setState({show: 3})
    }
    yourMealHandler = () => {
        this.setState({show: 2})
    }
    settingHandler = () => {
        this.setState({show: 4});
    }
    createAdminHandler = () => {
        this.setState({show: 5});
    }
    NotificationHandler = () => {
        this.setState({show: 6});
    }
    componentDidMount(){
        if(this.props.token){
            this.props.onFetchUser(this.props.token);
        }
    }
    render() {
        let content = <Spinner />
        if(!this.props.loading){
            content = <h1>No User</h1>
        }
        if(this.props.user){
            content = (
                <div>
                    <SideBar 
                        showSpan={this.state.show}
                        mealsLikeClick={this.mealsLikeHandler}
                        addMealClick={this.addMealHandler}
                        yourMealClick={this.yourMealHandler}
                        setting={this.settingHandler}
                        createAdmin={this.createAdminHandler}
                        notification={this.NotificationHandler}
                        email={this.props.user.email}
                        name={this.props.user.name}
                        role={this.props.user.role}
                        id={this.props.user._id}
                        imageUrl={this.props.user.imageUrl}
                        />
                    <MainAccount user={this.props.user} show={this.state.show}/>
                </div>
            );
        }
        let redirect = null;
        if(!this.props.token){
            redirect= <Redirect to='/' />
        }
        return(
            <div>
                {redirect}
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.auth.loading,
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: (token) => dispatch(action.fetchUser(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);