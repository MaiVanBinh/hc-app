import React from 'react';
import classes from './BannerImage.module.css';

const bannerImage = (props) => {
    let imageLink = props.image;
    return <div  className={classes.BannerImg} id="slides-show">
        <img src={require('../../../assets/'+imageLink)} alt="searchIcon"/>
    </div>
};

export default bannerImage;
