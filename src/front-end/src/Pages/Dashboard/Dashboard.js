import React, { Component } from 'react';

import { Provider } from "react-alert";


import './Styles.css';
import Navigation from '../../Components/Navigation/Navigation';
import Order from '../../Components/Order/Order';
import { AlertTemplate, Options } from "../../Components/AlertTemplate/AlertTemplate";


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
                <Provider template={AlertTemplate} {...Options}>
                    <Order order={this.state.order} onSelectOrder={order => this.handleSelectOrder(order)} />
                </Provider>
            </div>
        );
    }
}
