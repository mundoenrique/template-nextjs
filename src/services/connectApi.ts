import axios, { AxiosInstance, AxiosError } from 'axios';

const connectApi: AxiosInstance = axios.create({
  baseURL: '/api'
});

// Interceptor para manejar errores de respuesta
connectApi.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
      return Promise.resolve({
        code: -1,
        data: 'At this time we are unable to accommodate your request, please try again later.',
      });
  }
);

export default connectApi;