import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import socket from 'socket.io-client';
import Loader from 'react-loader-spinner';

import api from '../../Services/Api';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {

    state = {
        active: '',
        orders: [],
        loaded: false
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
        this.subscribeToEvents();
        const orders = await api.get("api/orders");
        this.setState({ orders: orders.data, loaded: true });
    }

    //Inicia comunicação o servidor socket e fica escutando o evento
    subscribeToEvents = () => {
        const io = socket('https://api-pedidos-timm.herokuapp.com');
        io.on('newOrder', data => {
            let { orders } = this.state;
            orders.push(data);
            this.setState({ orders, active: '' });
        });
        io.on('updateOrder', data => {
            const { orders } = this.state;
            this.setState({ orders: orders.map(order => order.id === data.id ? data : order), active: '' });
        });
    }

    render() {
        const { loaded } = this.state;

        if (!loaded) {
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
                        <li className="loader-content-nav">
                            <div className="loader-nav">
                                <Loader
                                    type="Puff"
                                    color="#FFF"
                                    height="100px"
                                    width="100px"
                                />
                            </div>

                        </li>
                    </ul>
                </nav>
            );
        }
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
                        <li className="orders" key={order._id}>
                            <a
                                href="#customer"
                                id={order.id}
                                onClick={this.handleChangeActive}
                                className={order.id == this.state.active ? 'active' : ''}
                            >
                                #{order.id} - {order.customerName}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}