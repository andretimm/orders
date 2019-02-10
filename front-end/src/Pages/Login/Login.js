import React, { Component } from 'react';

import './Styles.css';

import Logo from './Logo.png';

export default class Login extends Component {
   state = {
        email: '',
    };
    handleInputChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email } = this.state;

        if (!email.length) return;

        localStorage.setItem('@OrdersTimm:email', email);

        //this.props.history.push('/timeline');
    }
    render() {
        return (
            <div className="login-wrapper">
            
                <form onSubmit={this.handleSubmit}>
                    <img src={Logo} alt="Go Twitter" />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}
