import React from 'react';
import classes from './Notification.module.css';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import axios from '../../../axiosInstance';

class Notification extends React.Component {
    componentDidMount() {
        let config = {
            headers: {
                Authorization: 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
            }
          }
        axios.patch('/meals/meal-comfirm',{},config)
          .then(res => {
              
          })
          .catch(e => {
              console.log(e);
          })
    }
    render() {
        let notificationsList = <p>Không có thông báo mới</p>
        if(this.props.notifications && this.props.notifications.length > 0){
            notificationsList = this.props.notifications.map(n => (
                <div className = {classes.CommentBox} key={n._id}>
                    <h4>{n.title}</h4>
                    <p>{n.createdAt.split('T')[0]}</p>
                    <p>{n.content}</p>
                </div> 
            ));
        }
        return (
            <section className={classes.Section}>
                <h1>Thông báo mới</h1>
                {notificationsList}
                <div className={classes.Button}>
                        <Button btnType="Success" clicked={this.showMoreHandler}>Xem nhiều hơn</Button>
                </div>
            </section>
        );
    }
}
const mapStateToProps = state => {
    return{
        notifications: state.user.user.notifications,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Notification);