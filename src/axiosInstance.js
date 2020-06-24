import axios from 'axios';
import {BASE_URL} from './Base_URL';
const instance = axios.create({
    baseURL: `${BASE_URL}/`,
});

export default instance;

