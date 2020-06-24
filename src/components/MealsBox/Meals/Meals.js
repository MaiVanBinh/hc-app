import React from 'react';
import classes from './Meals.module.css';
import Meal from './Meal/Meal';
import {Link} from 'react-router-dom';

class Meals extends React.Component {
    
    render() {
        let mealList = this.props.meals.map(meal => {
                return <Link to={'/meals/' + meal._id} key={meal._id}>
                                <Meal meal={meal}/>
                            </Link>
            });
        return(
            <div className={classes.Meals}>
                <div className={classes.ContainerContent}>
                    {mealList}
                </div>
            </div>
        );
    }
}

export default Meals;