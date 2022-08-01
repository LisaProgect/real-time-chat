import '../assets/style.css';
import './i18n.js';

import 'core-js/stable/index';
import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';

import store from './store.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
