import React from 'react';
import classes from './ContactForm.module.css';

class ContactForm extends React.Component {
    render() {
        return (
            <div className={classes.ContactForm}>
                <form>
                    <div className={classes.Row100}>
                        <div className={classes.InputBx50}>
                            <input type="text" name="" placeholder="Họ tên" />
                        </div>
                        <div className={classes.InputBx50}>
                            <input type="text" name="" placeholder="Email hoặc SĐT" />
                        </div>
                    </div>
                    <div className={classes.Row100}>
                        <div className={classes.InputBx100}>
                            <textarea name="" id="" placeholder="Nội dung"></textarea>
                        </div>
                    </div>
                    <div className={classes.Row100}>
                        <div className={classes.InputBx100}>
                            <input type="submit" name="" value="Send" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContactForm;