import React, { Component } from 'react';

import './Styles.css';
import Navigation from '../../Components/Navigation/Navigation';
import Order from '../../Components/Order/Order';

export default class Dashboard extends Component {

    state = {
        order: {},
    };

    handleSelectOrder = (order) => {
        this.setState({ order })
        console.log(order);
        console.log(this.state.order);
    }

    render() {
        return (
            <div className="dash-wrapper">
                <Navigation onSelectOrder={order => this.handleSelectOrder(order)} />
                <Order order={this.state.order} />
            </div>
        );
    }
}
