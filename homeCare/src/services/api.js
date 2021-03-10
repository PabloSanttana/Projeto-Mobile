import axios from 'axios';
import {localhost} from './localhost.json';
const api = axios.create({
  baseURL: localhost,
});

export default api;
