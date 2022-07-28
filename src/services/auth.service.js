import axios from 'axios';

const API_URL = 'api/';

const getFullPath = (path) => `${API_URL}${path}`;

const register = (userName, password) =>
    axios.post(getFullPath('signup'), { userName, password });

const login = (userName, password) =>
    axios
        .post(getFullPath('login'), { userName, password })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });

const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    login,
    logout,
};

export default authService;
