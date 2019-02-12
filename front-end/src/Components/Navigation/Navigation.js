import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import api from '../../Services/Api';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {

    state = {
        active: '',
        orders: []
    };

    /**
     * Altera para ativo o pedido que estiver selecionada
     */
    handleChangeActive = (e) => {
        e.preventDefault();
        const order = e.currentTarget.id;
        if (order === "new") {
            this.setState({ active: '' });
            this.props.onSelectOrder({});
        } else {
            this.setState({ active: order });
            this.props.onSelectOrder(this.state.orders.find((e) => e.id == order));
        }
    }

    async componentDidMount() {
        const orders = await api.get("api/orders");
        this.setState({ orders: orders.data });
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Header /></li>
                    <li>
                        <a
                            href="#customer"
                            id="new"
                            onClick={this.handleChangeActive}
                            className="new-order">
                            <FontAwesomeIcon icon={faPlus} /> Criar novo pedido
                        </a>
                    </li>
                    {this.state.orders.map(order => (
                        <li className="orders">
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
