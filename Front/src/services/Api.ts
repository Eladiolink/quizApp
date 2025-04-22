import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // coloque o IP da sua máquina aqui
});

export default api;
