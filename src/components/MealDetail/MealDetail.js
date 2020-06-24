import React from 'react';
import classes from './MealDetail.module.css';
import Video from './Video/Video';
import Ingredient from './Ingredient/Ingredient';
import Comment from './Comment/Comment';
import Recipe from './Recipe/Recipe';
import CheckMeal from './CheckMeal/CheckMeal';
import { connect } from 'react-redux';

class MainAccount extends React.Component {
  render() {
    let display = '';
    if (this.props.show === 1 && this.props.currentMeal) {
      display = (
        <Video
          ytId={this.props.currentMeal.ytId}
          mealId={this.props.currentMeal._id}
          title={this.props.currentMeal.title}
          commentClick={this.props.commentClick}
          like={this.props.currentMeal.isLike}
        />
      );
    } else if (this.props.show === 2) {
      display = <Ingredient ingredients={this.props.currentMeal.ingredients} />;
    } else if (this.props.show === 3) {
      display = <Recipe recipe={this.props.currentMeal.recipe} />;
    } else if (this.props.show === 4) {
      display = <Comment />;
    } else {
      display = <CheckMeal mealId={this.props.currentMeal ? this.props.currentMeal._id : null} />;
    }
    return <div className={classes.Main}>{display}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentMeal: state.meals.currentMeal,
  };
};

export default connect(mapStateToProps)(MainAccount);
