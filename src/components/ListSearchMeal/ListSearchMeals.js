import React from 'react';
import './ListSearchMeals.css';
import Meal from './Meal/Meal';

const listSearchMeals = (props) => {
    let listMeals = <h1>Không có bất kỳ món ăn nào tìm được</h1>;
    if(props.meals && props.meals.length > 0 ){
        listMeals = props.meals.map(meal => <Meal key={meal._id} meal={meal} />);
    }
    return (
        <div className="MealsBx">
            {listMeals}
        </div>
    );
}

export default listSearchMeals;