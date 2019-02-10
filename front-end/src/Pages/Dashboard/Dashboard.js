import React, { Component } from 'react';

import './Styles.css';
import Header from '../../Components/Header/Header';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dash-wrapper">
                <nav>
                    <ul>
                        <li><Header/></li>
                        <li><a className="active" href="#home">Home</a></li>
                        <li><a href="#news">News</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </nav>
                <div className="content">
                    Conteudo
                </div>
            </div>
        );
    }
}
