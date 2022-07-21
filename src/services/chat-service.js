/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import axios from 'axios';

export default class ChatService {
    _apiBase = '/api';

    login = async (data) => {
        console.log(data);
        try {
            const res = await axios.post(`${this._apiBase}/login`, data);

            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    };
}
