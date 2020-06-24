import React from 'react';
import classes from './SideBarAccount.module.css';
import notification from '../../../assets/notification.png';
import multiplication from '../../../assets/multiplication.png';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import moreIcon from '../../../assets/more.png';
import Backdrop from '../../UI/Backdrop/Backdrop';

class SideBar extends React.Component{
    state = {
        img: null,
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
        return(
            <Aux>
            <Backdrop show={this.state.show} clicked={this.removeShow}/>
            <div className={classes.MBar} onClick={this.addShow}>
                <span><img src={moreIcon} alt="" /></span>
            </div>
            <aside className={classAside.join(' ')}>
                <h1>Your Account
                    <span className={classes.Close}>
                        <img src={multiplication} alt="" onClick={this.removeShow}/>
                    </span>
                    <span className={classes.Notification} onClick={this.props.notification}>
                        <img src={notification} alt="" />
                    </span>
                </h1>
                <div className={classes.UserSide}>
                    <div className={classes.UserPic}>
                        <img src={this.props.imageUrl} width="100px" alt="" />
                    </div>
                    <div className={classes.UserInfo}>
                        <p>
                            <span className={classes.Name}>{this.props.name}</span>
                        </p>
                        <span className={classes.Mail}>{this.props.email}</span>
                    </div>
                </div>
                <div className={classes.SideNav}>
                    <h2>Thông tin</h2>
                    <nav>
                        <ul>
                            <li className={classes.active} onClick={this.props.mealsLikeClick}>
                                {this.props.showSpan === 1 ? <span></span> : null}
                                <h3>Món ăn yêu thích</h3>
                            </li>
                            <li onClick={this.props.yourMealClick}>
                                {this.props.showSpan === 2 ? <span></span> : null}
                                <h3>Món ăn của bạn</h3>
                            </li>
                            <li onClick={this.props.setting}>
                                {this.props.showSpan === 4 ? <span></span> : null}
                                <h3>Cài đặt</h3>
                            </li>
                            {this.props.role === 'sad' ?
                            <li onClick={this.props.addMealClick}>
                                {this.props.showSpan === 3 ? <span></span> : null}
                                <h3>Thêm món ăn</h3>
                            </li> : null}
                            {this.props.role === 'sad' ? 
                            <li onClick={this.props.createAdmin}>
                                {this.props.showSpan === 5 ? <span></span> : null}
                                <h3>Quản lý admin</h3>
                            </li> : null}
                        </ul>
                    </nav>
                </div>
            </aside>
        </Aux>
        );
    }
}

export default SideBar;