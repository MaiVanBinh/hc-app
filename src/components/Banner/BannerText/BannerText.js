import React from 'react';
import classes from './BannerText.module.css';

const bannerText = (props) => (
    <div className={classes.BannerText}>
        <h2>{props.content.h1}<br/>{props.content.h2}</h2>
        <p>{props.content.text}</p>
        <a href={props.content.link}>Read more</a>
    </div>
)

export default bannerText;