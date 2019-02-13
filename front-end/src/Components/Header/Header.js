import React, { Component } from 'react';

import './Styles.css';

export default class Header extends Component {

    state = {
        user: '',
    }

    componentDidMount() {
        const user = localStorage.getItem('@OrdersTimm:name');
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <header id="main-header">Pedidos - {user}</header>
        );
    }
}