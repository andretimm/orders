import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-alert";

import './index.css';
import App from './App';
import { AlertTemplate, Options } from "./Components/AlertTemplate/AlertTemplate";

ReactDOM.render((
    <Provider template={AlertTemplate} {...Options}>
        <App />
    </Provider>
), document.getElementById('root'));