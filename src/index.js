import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from './App';
import store from './app/store';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router>
        {/* wrapping the entire app inside the Provider, so that all the app componenets have access to store variable */}
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);