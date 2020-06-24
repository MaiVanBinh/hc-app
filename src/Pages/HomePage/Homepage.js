import React from 'react';
import Banner from '../../components/Banner/Banner';
import Methods from '../../components/Methods/Methods';
import Aux  from '../../hoc/Auxiliary/Auxiliary';
import Meals from '../../components/MealsBox/MealsBox';
import Contact from '../../components/Contact/Contact';

class Homepage extends React.Component {
    render() {
        return(
            <Aux>
                <Banner />
                <Methods />
                <Meals />
                <Contact />
            </Aux>
        );
    }
}

export default Homepage;