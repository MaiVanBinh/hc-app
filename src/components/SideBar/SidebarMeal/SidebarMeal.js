import React from 'react';
import classes from './SidebarMeal.module.css';
import multiplication from '../../../assets/multiplication.png';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import moreIcon from '../../../assets/more.png';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {connect} from 'react-redux';


class SideBar extends React.Component{
    state = {
        show: false
    }
    addShow = () => {
        this.setState({show: true})
    }
    removeShow = () => {
        this.setState({show: false})
    }
    render() {
        let classAside = [classes.Aside];
        if(this.state.show) {
            classAside = [classes.Aside, classes.Show];
        }
        let title = '';
        let src = '';
        let imageUrl = '';
        if(this.props.currentMeal) {
            title = this.props.currentMeal.title;
            src = this.props.currentMeal.src;
            imageUrl = "http://localhost:8080/meals/" + this.props.currentMeal._id + "/image";
            if(this.props.currentMeal.imageUrl) {
                imageUrl = this.props.currentMeal.imageUrl;
            }
        }
        return(
            <Aux>
                <Backdrop show={this.state.show} clicked={this.removeShow}/>
                <div className={classes.MBar} onClick={this.addShow}>
                    <span><img src={moreIcon} alt="" /></span>
                </div>
                <aside className={classAside.join(' ')}>
                    <h1>{title} <span className={classes.Close}><img src={multiplication} alt="" onClick={this.removeShow}/></span></h1>
                    <div className={classes.UserSide}>
                        <div className={classes.UserPic}>
                            <img src={imageUrl} width="100px" alt="" />
                        </div>
                        <div className={classes.UserInfo}>
                            <p>
                                <span className={classes.Name}>{src}</span>
                            </p>
                            <span className={classes.Mail}>{this.props.currentMeal ? this.props.currentMeal.likes.total : null} Likes </span>
                            <span className={classes.Mail}>{this.props.currentMeal ? this.props.currentMeal.viewsCount : null} Views</span>
                        </div>
                    </div>
                    <div className={classes.SideNav}>
                        <h2>Thông tin</h2>
                        <nav>
                            <ul>
                                <li className={classes.active} onClick={this.props.mealsLikeClick}>
                                    {this.props.showSpan === 1 ? <span></span> : null}
                                    <h3>Video</h3>
                                </li>
                                <li onClick={this.props.yourMealClick}>
                                    {this.props.showSpan === 2 ? <span></span> : null}
                                    <h3>Nguyên liệu</h3>
                                </li>
                                <li onClick={this.props.addMealClick}>
                                    {this.props.showSpan === 3 ? <span></span> : null}
                                    <h3>Công thức</h3>
                                </li>
                                {this.props.role ? 
                                <li onClick={this.props.checkMeal}>
                                    {this.props.showSpan === 5 ? <span></span> : null}
                                    <h3>Xác nhận món ăn</h3> 
                                </li> : null }
                            </ul>
                        </nav>
                    </div>
                </aside>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentMeal: state.meals.currentMeal,
        role: state.auth.role === 'ad' ? true :  state.auth.role === 'sad' ? true : false
    }
}
export default connect(mapStateToProps)(SideBar);