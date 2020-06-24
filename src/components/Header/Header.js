import React from 'react';
import Toolbar from '../Navbar/Toolbar/Toolbar';
import classes from './Header.module.css';
import SideDrawer from '../Navbar/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Header extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render() {
        return (
            <div className={classes.container}>
                <nav>
                    <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
                </nav>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} isAuth={this.props.isAuthenticated}/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
 export default connect(mapStateToProps)(Header);