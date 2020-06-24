import React from 'react';
import classes from './MainAccount.module.css';
import MealsLike from './MealsLike/MealsLike';
import CrawlerMeal from './CrawlerMeal/CrawlerMeal';
import AdminManagement from './AdminManagement/AdminManagement';
import Notification from './Notification/Notification';
import Setting from "./Setting/Setting";

class MainAccount extends React.Component {
  render() {
    let display = '';
    if (this.props.show === 1) {
      display = <MealsLike list={this.props.user.viewsMeal} viewsMeal={true} />;
    } else if (this.props.show === 2) {
      display = <MealsLike list={this.props.user.ownerMeal} />;
    } else if (this.props.show === 3) {
      display = <CrawlerMeal />;
    } else if (this.props.show === 4) {
      display = <Setting /> ;
    } else if (this.props.show === 5) {
      display = <AdminManagement />;
    } else if(this.props.show === 6) {
      display = <Notification />;
    }
    return <div className={classes.Main}>{display}</div>;
  }
}

export default MainAccount;
