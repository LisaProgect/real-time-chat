import axios from 'axios';

const API_URL = { login: 'api/login', signup: 'api/signup' };

const register = (userName, password, url) =>
    axios.post(url, { userName, password }).then((response) => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });

const login = (userName, password) =>
    register(userName, password, API_URL.login);

const signup = (userName, password) =>
    register(userName, password, API_URL.signup);

const logout = () => localStorage.removeItem('user');

const authService = {
    login,
    signup,
    logout,
};

export default authService;
