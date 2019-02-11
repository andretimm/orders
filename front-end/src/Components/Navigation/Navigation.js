import React, { Component } from 'react';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {

    state = {
        active: '#0000',
        orders: [
            {
                number: '#0000',
                customer: 'Luke ​Skywalker'
            },
            {
                number: '#0001',
                customer: 'Darth ​Vader',
            },
            {
                number: '#0002',
                customer: 'Han ​Solo',
            },
            {
                number: '#0003',
                customer: 'Imperador ​Palpatine',
            },
        ]
    };

    handleChanceActive = (e) => {
        e.preventDefault();
        const order =  e.currentTarget.id;
        this.setState({active: order});
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
                                id={order.number}                       
                                onClick={this.handleChanceActive}
                                className={order.number === this.state.active ? 'active' : ''}
                                key={order.number}>
                                {order.number} - {order.customer}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
