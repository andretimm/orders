import React, { Component } from 'react';

import api from '../../Services/Api';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {

    state = {
        active: '',
        orders: []
    };

    /**
     * Altera para ativo a ordem que estiver selecionada
     */
    handleChangeActive = (e) => {
        e.preventDefault();
        const order = e.currentTarget.id;
        console.log(order);
        this.setState({ active: order });
        console.log();
        this.props.onSelectOrder(this.state.orders.find((e) => e.id == order));
    }

    async componentDidMount() {
        const orders = await api.get("api/orders");
        this.setState({orders : orders.data});
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Header /></li>
                    {this.state.orders.map(order => (
                        <li>
                            <a
                                href="#customer"
                                id={order.id}
                                onClick={this.handleChangeActive}
                                className={order.id == this.state.active ? 'active' : ''}
                                key={order._id}>
                                #{order.id} - {order.customerName}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
