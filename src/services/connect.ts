import axios from 'axios';

export const connectApi = axios.create({
  baseURL: '/api',
});
