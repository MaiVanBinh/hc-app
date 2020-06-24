import React from 'react';
import searchIcon from '../../assets/search.png';
import classes from './Search.module.css';
import axios from '../../axiosInstance';
import {withRouter} from 'react-router-dom';

class Search extends React.Component {
    state = {
        items:  null ,
        suggestions: [],
        value: '',
    }
    componentDidMount() {
        axios.get('/meals/titles')
            .then(res => {
                const suggestions = res.data.map(i => i.title);
                this.setState({items: [...suggestions]});
            })
            .catch(e => console.log(e));
    }

    onChangeHandler = (event) => {
        const value = event.target.value; 
        let suggestions = [];
        if(value.length > 0) {
            const regex = new RegExp(`${value}`, 'i');
            if(this.state.items) {
                suggestions = this.state.items.sort().filter(i => regex.test(i));
            }
        }
        this.setState({suggestions: suggestions, value: value});
    }

    suggestionSelected = (value) => {
        this.setState({value: value, suggestions:[]});
        const queryParams = 'title=' + encodeURIComponent(value);
        this.props.history.push({
            pathname: '/meals',
            search: queryParams
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const queryParams = 'title=' + encodeURIComponent(this.state.value);
        this.suggestionSelected(this.state.value);
        this.props.history.push({
            pathname: '/meals',
            search: queryParams
        });

    }
    render() {
        let suggestions = null;
        if (this.state.suggestions.length > 0) {
            suggestions = (
                <ul>
                    {this.state.suggestions.map(i => <li key={i} onClick={(event) => this.suggestionSelected(i)}>{i}</li>)}
                </ul>
            );
        }
        return(
            <form onSubmit={this.onSubmitHandler}>
                <div className={classes.Search}>
                    <div className={classes.AutoCompleteText}>
                        <input type="text" value={this.state.value || ''} onChange={this.onChangeHandler} />
                        {suggestions}
                    </div>
                    <button type="submit"><img src={searchIcon} alt="searchIcon" /></button>
                </div>
            </form> 
        );
    }
}

export default withRouter(Search);