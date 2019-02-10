import React, { Component } from 'react';

import './Styles.css';
import Header from '../Header/Header';

export default class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Header /></li>
                    <li><a className="active" href="#home">#0000 - Luke ​Skywalker</a></li>
                    <li><a href="#news">#0001 - Darth ​Vader</a></li>
                    <li><a href="#contact">#0002 - Han ​Solo</a></li>
                    <li><a href="#about">#0003 - Imperador ​Palpatine</a></li>
                    <li><a href="#about">#0004 - Han ​Solo</a></li>
                </ul>
            </nav>
        );
    }
}
