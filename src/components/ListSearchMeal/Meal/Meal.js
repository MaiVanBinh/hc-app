import React from 'react';
import {Link} from 'react-router-dom';
import './Meal.css';

const meal = (props) => {
    return (
        <div className="Meal">
            <div className="imgbox">
                <img src={props.meal.imageUrl} alt="" /> 
            </div>
            <div className="details">
                <h2>{props.meal.title}</h2>
                <Link to={"/meals/" + props.meal._id}>Xem</Link>
            </div>
        </div>
    );
}
export default meal;