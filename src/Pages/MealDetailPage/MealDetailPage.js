import React from 'react';
import SideBarMeal from '../../components/SideBar/SidebarMeal/SidebarMeal';
import MealDetail from '../../components/MealDetail/MealDetail';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class AccountPage extends React.Component{
    state= {
        id: null,
        show: 1,
        page: 1,
        comments: []
    }
    componentDidMount() {
        let id = this.props.location.pathname.split('/')[2];
        this.props.onFetchOneMeal(id, this.props.userId);
        this.setState({id: id});
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
    recipeHandler = () => {
        this.setState({show: 4})
    }
    commentHandler = () => {
        this.props.onFetchComment(this.state.id);
        this.setState({show: 4});
    }
    checkMealHandler = () => {
        this.setState({show: 5})
    }
    render() {
        let content = <Spinner />;
        if(!this.props.loading) {
            content = (
                    <div>
                        <SideBarMeal 
                        showSpan={this.state.show}
                        mealsLikeClick={this.mealsLikeHandler}
                        addMealClick={this.addMealHandler}
                        yourMealClick={this.yourMealHandler}
                        recipeClick= {this.recipeHandler}
                        checkMeal={this.checkMealHandler}
                        />
                    <MealDetail 
                        show={this.state.show} 
                        commentClick={this.commentHandler} />
                    </div>
            );
        }
        return(
            <div>
                {content}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.meals.loading,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOneMeal: (id, userId) => dispatch(actionType.fetchOneMeal(id, userId)),
        onFetchComment: (mealId) => dispatch(actionType.fetchComments(mealId,1)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);