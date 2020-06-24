import React from 'react';
import Meals from './Meals/Meals';
import Spinner from '../UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Pagination from '../Paginator/Paginator';
import openSocket from 'socket.io-client';
import {BASE_URL_SOCKET} from '../../Base_URL';
import Heading from '../UI/Heading/Heading';

class MealsBox extends React.Component {
    state= {
        page: 1
    }
    componentDidMount() {
        this.props.onFetchMeals(this.state.page);
        const socket = openSocket(BASE_URL_SOCKET);
        socket.on('meal', data => {
            if(data.action === 'update' || data.action === "delete" || data.action === "comfirm"){
                this.props.onFetchMeals(this.state.page);
            }
        });
    }
    nextPageHandler = () => {
        const updatePage = this.state.page + 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage);
    }
    prevPageHandler = () => {
        const updatePage = this.state.page - 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage);
    }
    render() {
        let meals = <Spinner />;
        if(!this.props.loading) {
            meals = <Meals meals={this.props.meals}/>;
        }
        return(
            <div>
                <Heading>Món ăn được ưa thích</Heading>
                {meals}
                <Pagination 
                    next={this.props.hasNextPage}
                    prev={this.props.hasPrevPage}
                    nextClicked={this.nextPageHandler}
                    prevClicked={this.prevPageHandler}
                    />
            </div>
        );
    }
}
const mapStateToProps  = state => {
    return {
        meals: state.meals.meals,
        loading: state.meals.loading,
        hasNextPage: state.meals.hasNextPage,
        hasPrevPage: state.meals.hasPrevPage,
        currentPage: state.meals.currentPage
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onFetchMeals: (page) => dispatch(actionTypes.fetchMeals(page))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MealsBox);