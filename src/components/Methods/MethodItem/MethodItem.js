import React from 'react';
import './MethodItem.css';

const methodItem = (props) => {
    return(
        <div className="item" onClick={ props.clicked ? () => props.clicked(props.data) : null}>
            <a target="_blank">
                <img className="ico" src={props.data ? props.data.imageUrl : null} alt="" />
                <span>{props.data ? props.data.name : null}</span>
            </a>
        </div>
    );
};

export default methodItem;