import axios from 'axios';

import authHeader from './auth-header.js';

const API_URL = { data: 'api/data' };

const getData = () =>
    axios
        .get(API_URL.data, { headers: authHeader() })
        .then((response) => response.data);

const dataService = {
    getData,
};

export default dataService;
