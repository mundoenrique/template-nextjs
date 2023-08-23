import axios, { AxiosInstance, AxiosError } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 50000
});

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
      return Promise.resolve({
        code: -1,
        data: 'At this time we are unable to accommodate your request, please try again later.',
      });
  }
);

// Interceptor para manejar timeout
axiosInstance.interceptors.request.use(
  (config) => {
    const timeout = 50000
    config.timeout = timeout;
    return config;
  },
  (error) => {
    return Promise.reject({
      status: -1,
      data: 'Error al configurar la solicitud: ' + error.message
    });
  }
);

export default axiosInstance;
