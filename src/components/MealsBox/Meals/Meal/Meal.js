import React from 'react';
import classes from './Meal.module.css';
import heart from '../../../../assets/star.png';
import eyes from '../../../../assets/eye.png';

const meal = (props) => {
    let imageUrl = "http://localhost:8080/meals/" + props.meal._id + "/image";
    if(props.meal.imageUrl) {
        imageUrl = props.meal.imageUrl;
    }
    return (<div className={classes.Card}>
        <div className={classes.ImgBx}>
            <img src={ imageUrl } alt="" />
        </div>
        <div className={classes.Content}>
            <div>
                <h4>{props.meal.title}</h4>
                <span>
                    <img src={eyes} alt="" />{props.meal.viewsCount} 
                    &nbsp;
                    <img src={heart} alt="" />{props.meal.likes.total}
                </span>
                <p style={{opacity: 0.6}}>Nguồn: {props.meal.src} - youtube</p>
            </div>
        </div>
    </div>);
};
export default meal;