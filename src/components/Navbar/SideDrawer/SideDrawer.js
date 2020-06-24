import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'; 

const sideDrawer = (props) => {
    let attackedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attackedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attackedClasses.join(' ')}>
                <NavigationItems isAuthenticated={props.isAuth}  />
            </div>
        </Aux>
        
    );
}

export default sideDrawer;