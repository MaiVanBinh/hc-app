import React from 'react';
import './MealPage.css';
import ListSearchMeal from '../../components/ListSearchMeal/ListSearchMeals';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Pagination from '../../components/Paginator/Paginator';
import Methods from '../../components/Methods/Methods';
import Heading from '../../components/UI/Heading/Heading';

class MealPage extends React.Component {
    state= {
        page: 1,
        title:  null,
        role: 'user',
        method: null,
    }
    componentDidMount() {
        let updateSearch={};
        const query = new URLSearchParams(this.props.location.search);
        for(let param of query.entries()) {
            updateSearch[param[0]] = param[1];
        }
        const method = updateSearch['method'];
        const title = updateSearch['title'];
        this.setState({title: title, method: method, role: this.props.role});
        this.props.onFetchMeals(this.state.page, title, method, this.props.role);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search!==this.props.location.search){
            let updateSearch={};
            const query = new URLSearchParams(this.props.location.search);
            for(let param of query.entries()) {
                updateSearch[param[0]] = param[1];
            }
            const method = updateSearch['method'];
            const title = updateSearch['title'];
            this.setState({title: title, method: method, role: this.props.role});
            this.props.onFetchMeals(this.state.page, title, method, this.props.role);
        }
    }
    
    nextPageHandler = () => {
        const updatePage = this.state.page + 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage, this.state.title,this.state.method,  this.props.role);
    }
    prevPageHandler = () => {
        const updatePage = this.state.page - 1;
        this.setState({page: updatePage});
        this.props.onFetchMeals(updatePage, this.state.title,  this.state.method, this.props.role);
    }
    render() {
        return(
            <div>
                <Methods />
                <Heading>Có {this.props.totalResult} kết quả được tìm thấy</Heading>
                <section className="sec work">
                    <ListSearchMeal meals={this.props.meals}/>
                </section>
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
        totalResult: state.meals.total,
        hasPrevPage: state.meals.hasPrevPage,
        currentPage: state.meals.currentPage,
        role: state.auth.role
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onFetchMeals: (page, search, method, role) => dispatch(actionTypes.fetchMeals(page, search,method, role))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MealPage);