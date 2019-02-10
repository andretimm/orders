import React, { Component } from 'react';

import './Styles.css';
import Navigation from '../../Components/Navigation/Navigation';
import Order from '../../Components/Order/Order';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                <Navigation />
                <Order />
            </div>
        );
    }
}
