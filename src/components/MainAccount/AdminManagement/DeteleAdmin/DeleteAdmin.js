import React from 'react';
import Button from '../../../UI/Button/Button';

const deleteAdmin = (props) => {
    let admin = null
    if(props.admin){
        admin = (
            <div>
                <h3>Xóa?</h3>
                <p>Name: {props.admin.name}</p>
                <p>Email: {props.admin.email}</p>
                <p>Role: {props.admin.role === 'ad' ? 'Admin' : 'Super admin'}</p>
                <Button btnType="Danger" clicked={props.deleteAdmin}>Xóa</Button>
                <Button btnType="Success" clicked={props.cancelDelete}>Hủy tác vụ</Button>
            </div>
        );
    }
    return(
        <div>
            {admin}
        </div>
    )
    
};

export default deleteAdmin;