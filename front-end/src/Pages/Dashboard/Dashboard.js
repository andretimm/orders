import React, { Component } from 'react';

import './Styles.css';
import Navigation from '../../Components/Navigation/Navigation';
import Order from '../../Components/Order/Order';

export default class Dashboard extends Component {

    state = {
        order: {},
    };

    handleSelectOrder = (order) => {
        this.setState({ order });
    }
    componentDidMount(){
        const user = localStorage.getItem('@OrdersTimm:name');
        if(!user){
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="dash-wrapper">
                <Navigation onSelectOrder={order => this.handleSelectOrder(order)} />
                <Order order={this.state.order} onSelectOrder={order => this.handleSelectOrder(order)} />
            </div>
        );
    }
}
