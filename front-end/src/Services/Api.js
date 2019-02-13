import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-pedidos-timm.herokuapp.com'
});
export default api;