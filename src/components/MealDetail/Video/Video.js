import React from 'react';
import classes from './Video.module.css';
import heart from '../../../assets/heart.png';
import unheart from '../../../assets/unheart.png';
import addList from '../../../assets/addList.png';
import comment from '../../../assets/comment.png';
import {connect} from 'react-redux';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import * as action from '../../../store/actions/index';

class Video extends React.Component {
    state = {
        like: false
    }
    componentDidMount() {
        console.log(this.props.adding)
        if(this.props.adding && this.props.token!==null){
            console.log('adding');
            this.props.onAddMealStart(this.props.token, this.props.mealId);
        }
        this.setState({like: this.props.like});
    }
    AddMealList = () => {
        if(!this.props.token){
            this.props.onSetAuthRedirectPath('/meals/' + this.props.mealId);
            this.props.onAddMeal();
            this.props.history.push('/login');
        } else {
            this.props.onAddMealStart(this.props.token, this.props.mealId);
        }
    }
    likeHandler = () => {
        if(this.props.token){
            const likeUpdate = !this.state.like;
            this.setState({like: likeUpdate});
            if(likeUpdate){
                this.props.onLikeMeal(this.props.token, this.props.mealId, 'like');
            } else {
                this.props.onLikeMeal(this.props.token, this.props.mealId, 'unLike');
            }
        } else {
            alert('Bạn cần đăng nhập để thực hiện chức năng này');
        }
    }

    render (){
        const url = 'https://www.youtube.com/embed/' + this.props.ytId + '?autoplay=1';
        return(
            <section className={classes.Section}>
                <div className={classes.VideoBox}>
                    <div className={classes.Video}>
                        <iframe 
                        src={url} title={this.props.title}>
                        </iframe>
                    </div>
                    <div className={classes.LikeBox}>
                        <div className={classes.Like} onClick={this.likeHandler}>
                            <img src={this.state.like ? heart : unheart} alt="" />
                            <p>Like</p>
                        </div>
                        <div className={classes.Like}onClick={this.AddMealList}>
                            <img src={addList} alt="" />
                            <p>Xem sau</p>
                        </div>
                        <div className={classes.Like}onClick={this.props.commentClick}>
                            <img src={comment} alt="" />
                            <p>Bình luận</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        adding: state.user.adding,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddMeal: () => dispatch(action.addMealIntoViewList()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
        onAddMealStart: (token, mealId) => dispatch(action.addMealIntoViewListStart(token, mealId)),
        onLikeMeal: (token, mealId, mode) => dispatch(action.likeMeal(token, mealId, mode))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(withRouter(Video), axios));