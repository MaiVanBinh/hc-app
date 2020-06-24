import React from 'react';
import * as action from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends React.Component {
    componentDidMount() {
        this.props.onLogout();
        this.props.deleteUserWhenLogout();
    }
    render() {
        return (
            <Redirect to='/' />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(action.logout()),
        deleteUserWhenLogout: () => {action.deleteUserWhenLogout()}
    }
}

export default connect(null, mapDispatchToProps)(Logout);