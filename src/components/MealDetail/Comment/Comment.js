import React from 'react';
import classes from './Comment.module.css';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import Input from '../../UI/Input/Input';
import * as action from '../../../store/actions/index';
import openSocket from 'socket.io-client';
import {BASE_URL_SOCKET} from '../../../Base_URL';

class Comment extends React.Component {
    state = {
        content: {
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
        show: false,
        page: 1
    }
    inputChangeHandler = (event) => {
        const content = {...this.state.content};
        content.value = event.target.value;
        this.setState({content: content})
    } 
    showCommentBoxHandler = () =>  {
        const content = {...this.state.content};
        content.value = '';
        this.setState(prevState => ({show: !prevState.show, content: content}));
    } 
    onSubmitHandler = (event) => {
        event.preventDefault(this.props.currentMeal._id, this.state.page);
    }
    onClickDeleteCommentHandler = (commentId) => {
        this.props.onDeleteComment(this.props.token, commentId);
    }
    addCommentHandler = () => {
        this.props.onAddComment(this.props.token, this.props.currentMeal._id, this.state.content.value);
        const content = {...this.state.content};
        content.value = '';
        this.setState(prevState => ({show: !prevState.show, content: content}));
    }
    showMoreHandler = () => {
        let updatePage = this.state.page + 1;
        this.setState({page: updatePage});
        this.props.onFetchComment(this.props.currentMeal._id, updatePage);
    }
    componentDidMount(){
        const socket = openSocket(BASE_URL_SOCKET);
        socket.on('comment', data => {
            if(data.action === 'create'){
                this.props.onAddCommentSocket(data.comment);
            }
            if(data.action === 'delete'){
                this.props.onDeleteCommentSocket(data.commentId);
            }
        });
    }
    render() {
        let commentList = <h5 style={{textAlign: 'center'}}>Hiện không có bình luận nào. Hãy là người đầu tiên đánh giá món ăn.</h5>;
        
        if(this.props.currentComments && this.props.currentComments.length > 0){
            commentList = this.props.currentComments.map(c => (
                <div className = {classes.CommentBox} key={c._id}>
                    <h4>{c.creator.name}</h4>
                    <p>{c.createAt.split('T')[0]}</p>
                    <p>{c.content}</p>
                    {this.props.userId && this.props.userId.toString() === c.creator._id.toString() ?(
                    <div>
                        <Button btnType="Danger" clicked={(event) => this.onClickDeleteCommentHandler(c._id)}>Xóa</Button>
                    </div>) : null
                    }
                </div> 
            ));
        }
        return (
            <section className={classes.Section}>
                {this.props.token ? 
                    <div className={classes.Button}>
                        <Button btnType="Success" clicked={this.showCommentBoxHandler}>Thêm bình luận</Button>
                    </div> : null
                }
                {this.props.token && this.state.show ? 
                <form className = {classes.CommentBox} onSubmit={this.onSubmitHandler}>
                    <Input
                        elementType={"textarea"}
                        elementConfig={this.state.content.elementConfig}
                        value={this.state.content.value}
                        touched={this.state.content.touched}
                        changed={this.inputChangeHandler}
                        invalid={!this.state.content.valid}
                        shouldValidate={this.state.content.validation}
                    />
                    <Button btnType="Success" type="submit" clicked={this.addCommentHandler} disabled={this.state.content.value === ''}>Gửi</Button>
                    <Button btnType="Danger" type="button" clicked={this.showCommentBoxHandler}>Hủy</Button>
                </form> : null }
                {commentList}
                {this.props.haveMoreComment ?
                <div className={classes.Button}>
                        <Button btnType="Success" clicked={this.showMoreHandler}>Xem nhiều hơn</Button>
                </div> : null
                }
            </section>
        );
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token,
        currentMeal: state.meals.currentMeal,
        currentComments: state.meals.currentComments,
        userId: state.auth.userId,
        haveMoreComment: state.meals.haveMoreComment
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteCommentSocket: (commentId) =>dispatch(action.deleteCommentSuccess(commentId)), 
        onAddCommentSocket: (comment) => dispatch(action.addCommentSuccess(comment)),
        onDeleteComment: (token, commentId) => dispatch(action.deleteComment(token, commentId)),
        onAddComment: (token, mealId, content) => dispatch(action.addComment(token, mealId, content)),
        onFetchComment: (mealId, page) => dispatch(action.fetchComments(mealId, page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);