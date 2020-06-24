import React from 'react';
import './Heading.css';

const heading = (props) => (
    <div className="Title">
        <h2>{props.children}</h2>
        <span></span>
    </div>
)

export default heading;