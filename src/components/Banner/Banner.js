import React from 'react';
import classes from './Banner.module.css';
import BannerText from './BannerText/BannerText';
import BannerImage from './BannerImage/BannerImage';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/instagram.png';
import facebookLogo from '../../assets/facebook-logo.png';
import leftArrow from '../../assets/bla.png';
import rightArrow from '../../assets/bra.png';

class Banner extends React.Component {
    state = {
        position: 0,
        bannerText: [{
            h1: 'EAT HEALTHY',
            h2: 'STAY HEALTHY',
            text: 'Đây chỉ là 1 sản phẩm đang được phát triển bởi sinh viên. Nếu bạn không hài lòng, mong bạn thông cảm',
            link: '/#',
            linkImage: 'img1.png'
        },
        {
            h1: 'EAT YOUR',
            h2: 'VEGGIES',
            text: 'Đây chỉ là 1 sản phẩm đang được phát triển bởi sinh viên. Nếu bạn không hài lòng, mong bạn thông cảm.',
            link: '/#',
            linkImage: 'img2.png'
        },
        {
            h1: 'GOOD FOOD',
            h2: 'GOOD MOOD',
            text: 'Đây chỉ là 1 sản phẩm đang được phát triển bởi sinh viên. Nếu bạn không hài lòng, mong bạn thông cảm.',
            link: '/#',
            linkImage: 'img3.png'
        }
    ]
    }
    prevHandler = () => {
        this.setState((prevState) => {
            return {position: (prevState.position-1 + 3) % 3}
        });
    }
    nextHandler = () => {
        this.setState((prevState) => {
            return {position: ((prevState.position + 1) % 3)}
        });
    }
    componentDidMount(){
        this.timerID = setInterval(() => {
            this.setState((prevState) => {
                return {position: (prevState.position-1 + 3) % 3}
            });
        },3000);
    } 
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return (
                <div className={classes.Banner}>
                    <div className={classes.Content}>
                        <BannerText  content={this.state.bannerText[this.state.position]}/>
                        <BannerImage image={this.state.bannerText[this.state.position].linkImage} />
                    </div>
                    <div className={classes.Icons}>
                        <ul className={classes.Sci}>
                            <li><img src={twitter} alt=""/></li>
                            <li><img src={instagram} alt=""/></li>
                            <li><img src={facebookLogo} alt=""/></li>
                        </ul>
                        <ul className={classes.Controls}>
                            <li onClick={this.prevHandler}><img src={leftArrow}  alt="" /></li>
                            <li onClick={this.nextHandler}><img src={rightArrow} alt="" /></li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default Banner;