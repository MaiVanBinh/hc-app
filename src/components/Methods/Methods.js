import React from 'react';
import './Methods.css' 
import MethodItem from './MethodItem/MethodItem';
import axios from '../../axiosInstance';
import {withRouter} from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import Heading from '../UI/Heading/Heading';
import * as actionTypes from '../../store/actions/index';
import { connect } from 'react-redux';

class Methods extends React.Component {
  suggestionSelected = (value) => {
    const queryParams = 'method=' + encodeURIComponent(value.name);
    this.props.history.push({
        pathname: '/meals',
        search: queryParams
    });
  }
  render() {
    let listMethods = null;
    if(this.props.method) {
      listMethods = this.props.method.map(method => (<MethodItem clicked={this.suggestionSelected} data={method} key={method._id}/>));
    }
    let spinner = null;
    if(this.props.loading && !this.props.method) {
      spinner = <Spinner />;
    }
    return(
      <div className="container">
        <Heading>Phương pháp chế biến</Heading>
        {spinner}
        <div className="recommend-cuisine-box row10">
          {listMethods}
        </div>
    </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    method: state.method.method,
    loading: state.method.loading
  }
}
export default  connect(mapStateToProps)(withRouter(Methods));