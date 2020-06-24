import React from 'react';
import classes from './Recipe.module.css';
import Heading from '../../UI/Heading/Heading';

const ingredient = (props) => {
    return (
        <section className={classes.Section}>
            <Heading>Công thức</Heading>
            <div className={classes.Text} dangerouslySetInnerHTML={{__html: props.recipe}}></div>
        </section>
    );
}

export default ingredient;