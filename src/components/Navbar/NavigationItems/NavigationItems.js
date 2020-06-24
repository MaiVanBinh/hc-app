import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact onClick={props.clickedClose}>Trang chủ</NavigationItem>
        <NavigationItem link='/meals'>Món Ăn</NavigationItem>
        {!props.isAuthenticated ?  null : <NavigationItem link='/account' exact>Tài Khoản</NavigationItem>}
        {!props.isAuthenticated ?  <NavigationItem link='/login' >Đăng Nhập</NavigationItem>
        :<NavigationItem link='/logout' exact>Đăng Xuất</NavigationItem>}
    </ul>
)

export default navigationItems;