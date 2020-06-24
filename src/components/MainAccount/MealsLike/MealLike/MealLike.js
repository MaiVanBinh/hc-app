import React from 'react';
import classes from './MealLike.module.css';
import Button from '../../../UI/Button/Button';
import {connect} from 'react-redux';
import * as action from '../../../../store/actions/index';
import {Link} from 'react-router-dom';

class MealLike extends React.Component{
    deleteClick = () => {
        const viewsLike = this.props.mode ? true : false;
        this.props.onDeleteIntoViewsLike(this.props.token, this.props.meal._id, viewsLike);
    }
    render(){
        let imageUrl = null;
        if(this.props.meal.imageUrl) {
            imageUrl = this.props.meal.imageUrl;
        }
        return(
            <div className={classes.Meal}>
                <Link to={'/meals/' + this.props.meal._id}>
                    <img src={imageUrl} width="200px" alt="" />
                    <p>{this.props.meal.title}</p>
                </Link>
                <div className={classes.Grid}>                
                    <Button clicked={this.deleteClick} btnType='Danger'>Xóa khỏi danh sách</Button>
                    {this.props.show ? <Button btnType="Success" clicked={this.props.updateClick}>Cập nhập mới</Button> : null}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onDeleteIntoViewsLike: (token ,mealId, viewsLike) => dispatch(action.deleteMealIntoViewList(token, mealId, viewsLike)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealLike);