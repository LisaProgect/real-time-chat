import 'core-js/stable/index';
import debug from 'debug';

import '../assets/style.css';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Login from './components/Login.jsx';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'debug:*';
    debug('debug:sct')('some args');
}

ReactDOM.createRoot(document.getElementById('root')).render(<Login />);
