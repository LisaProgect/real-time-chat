import '../assets/style.css';

import 'core-js/stable/index';
import React from 'react';

import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'debug:*';
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
