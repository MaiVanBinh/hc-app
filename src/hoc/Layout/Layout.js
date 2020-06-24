import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Header from '../../components/Header/Header';

const layout = ( props ) => (
    <Aux>
        <Header />
        {props.children}
    </Aux>
);


export default layout;