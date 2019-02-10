import React, { Component } from 'react';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Header /></li>
                    <li><a className="active" href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        );
    }
}
