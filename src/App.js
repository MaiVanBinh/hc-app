import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Logout from './Pages/Auth/Logout/Logout';

// import connect redux
import {connect} from 'react-redux';
import * as action from './store/actions/index'; 

// create laxy load
const asyncAuth = asyncComponent(() => {
  return import('./Pages/Auth/Auth');
})
const asyncAccountPage = asyncComponent(() => {
  return import('./Pages/AccountPage/AccountPage');
})
const asyncMealDetailPage = asyncComponent(() => {
  return import('./Pages/MealDetailPage/MealDetailPage');
})
const asyncMealPage = asyncComponent(() => {
  return import('./Pages/MealPage/MealPage');
})
const asyncResetPassword = asyncComponent(() => {
  return import('./Pages/Auth/ResetPassword/ResetPassword');
})
const asyncHomepage = asyncComponent(() => {
  return import('./Pages/HomePage/Homepage')
})
class App extends React.Component {
  componentWillMount() {
    this.props.onTryAutoSignUp();
  }
  componentDidMount() {
    this.props.onFetchMethod();
  }
  render() {
    let routes ;
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/login" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/meals/:id"  component={asyncMealDetailPage}/>
          <Route path="/meals"  component={asyncMealPage}/>
          <Route path="/account"  component={asyncAccountPage}/>
          <Route path="/reset-password" component={asyncResetPassword} />
          <Route path="/" exact component={asyncHomepage}/> 
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/reset-password" component={asyncResetPassword} />
          <Route path="/login" component={asyncAuth} />
          <Route path="/account"  component={asyncAccountPage}/>
          <Route path="/meals/:id"  component={asyncMealDetailPage}/>
          <Route path="/meals" component={asyncMealPage} />
          <Route path="/" exact component={asyncHomepage} /> 
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(action.authCheckState()),
    onFetchMethod: () => dispatch(action.fetchMethod())
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);
