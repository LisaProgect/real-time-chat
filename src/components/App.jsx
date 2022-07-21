import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, MainPage, NoMatchPage, SignUpPage } from './pages/index';
import Navbar from './Navbar.jsx';
import routes from '../routes.js';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path={routes.mainPage} element={<MainPage />} />
            <Route path={routes.loginPage} element={<LoginPage />} />
            <Route path={routes.signUpPage} element={<SignUpPage />} />
            <Route path="*" element={<NoMatchPage />} />
        </Routes>
    </Router>
);

export default App;
