import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
    LoginPage,
    MainPage,
    NoMatchPage,
    SignUpPage,
} from './components/pages';
import Navbar from './components/Navbar.jsx';
import routes from './routes.js';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.jsx';
import { ConnectionProvider } from './contexts/ConnectionContext.jsx';

const App = () => (
    <ErrorBoundary>
        <Router>
            <ConnectionProvider>
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route
                        exact
                        path={routes.mainPage}
                        element={<MainPage />}
                    />
                    <Route
                        exact
                        path={routes.loginPage}
                        element={<LoginPage />}
                    />
                    <Route
                        exact
                        path={routes.signUpPage}
                        element={<SignUpPage />}
                    />
                    <Route path="*" element={<NoMatchPage />} />
                </Routes>
            </ConnectionProvider>
        </Router>
    </ErrorBoundary>
);

export default App;
