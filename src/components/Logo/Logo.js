import React from 'react';
import classes from './Logo.module.css';
import {NavLink} from 'react-router-dom';

const logo = () => (
    <div>
        <NavLink to='/' className={classes.Logo}>Happy<span>Cook</span></NavLink>
        <NavLink to='/' className={classes.LogoMobile}>H<span>C</span></NavLink>
    </div>
    
);

export default logo;