import React from 'react';
import classes from './Ingredient.module.css';
import Heading from '../../UI/Heading/Heading';

const ingredient = (props) => {
    return (
        <section className={classes.Section} id="singlePage">
            <Heading>Thành phần</Heading>
            <div className={classes.Text} dangerouslySetInnerHTML={{__html: props.ingredients}}>
            </div>
        </section>
    );
}

export default ingredient;