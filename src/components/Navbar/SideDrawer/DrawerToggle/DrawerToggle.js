import React from 'react';
import classes from './DrawerToggle.module.css';
import menuIcon from '../../../../assets/menu-of-three-lines.png';

const DrawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <img src={menuIcon} alt="menuIcon"></img>
    </div>
);

export default DrawerToggle;