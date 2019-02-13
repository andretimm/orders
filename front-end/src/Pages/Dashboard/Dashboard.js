import React, { Component } from 'react';

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import './Styles.css';
import Navigation from '../../Components/Navigation/Navigation';
import Order from '../../Components/Order/Order';

const options = {
    timeout: 5000,
    position: "top center",
};

export default class Dashboard extends Component {

    state = {
        order: {},
    };

    handleSelectOrder = (order) => {
        this.setState({ order });
    }
    componentDidMount() {
        const user = localStorage.getItem('@OrdersTimm:name');
        if (!user) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="dash-wrapper">
                <Navigation onSelectOrder={order => this.handleSelectOrder(order)} />
                <Provider template={AlertTemplate} {...options}>
                    <Order order={this.state.order} onSelectOrder={order => this.handleSelectOrder(order)} />
                </Provider>
            </div>
        );
    }
}
