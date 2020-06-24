import React from 'react';
import fLogo from '../../assets/facebook-logo.png';
import  twitter from '../../assets/twitter.png';
import instagram from '../../assets/instagram.png';
import classes from './Contact.module.css';
import ContactForm from './ContactForm/ContactForm';

const contact = () => (
    <div className={classes.Sec}>
        <div className={classes.Content}>
            <div>
                <h3>Liên hệ với chúng tôi</h3>
                <p>Hãy liên hệ với chúng tôi nếu bạn muốn hợp tác.</p>
            </div>
            <ContactForm />
            <div className={classes.Sci}>
                <ul>
                    <li><a href="/"><img src={fLogo} alt=""/></a></li>
                    <li><a href="/"><img src={twitter} alt="" /></a></li>
                    <li><a href="/"><img src={instagram} alt="" /></a></li>
                </ul>
            </div>
            <h3>Happy Cooking</h3>
            <p>Địa chỉ: <a href="https://www.google.com/maps/place/HCMC+National+University+Dormitory+Zone+B/@10.8830067,106.7795138,17z/data=!3m1!4b1!4m5!3m4!1s0x3174d885564f40f1:0x69ba5a55a3ec0e6f!8m2!3d10.8830014!4d106.7817025?hl=vi-VN">74 Tô Vĩnh Diện, thị xã Dĩ An, tình Bình Dương</a></p>
            <p className={classes.Copyright}>Design & Developed By <a href="/">MVB</a></p>
        </div>
    </div>
);

export default contact;