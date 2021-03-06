import React, { Component } from 'react';

import { withAlert } from "react-alert";

import api from '../../Services/Api';
import './Styles.css';

import Logo from './Logo.png';

class Login extends Component {
    state = {
        email: '',
    };
    handleInputChange = (e) => {
        this.setState({ email: e.target.value });
    }

    componentDidMount() {
        const user = localStorage.getItem('@OrdersTimm:name');
        if (user) {
            this.props.history.push('/dashboard');
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email } = this.state;

        if (!email.length) return;
        const { alert } = this.props;
        const user = await api.post("api/login", { email });
        if (user.data) {
            localStorage.setItem('@OrdersTimm:email', user.data.email);
            localStorage.setItem('@OrdersTimm:name', user.data.name);
            this.props.history.push('/dashboard');
        } else {
            alert.error("Email inválido ou não cadastrado!");
        }
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
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Entrar</button>
                </form>
                
            </div>
        );
    }
}

//Disponibiliza a mensagem de alert como propriedade
export default withAlert()(Login)