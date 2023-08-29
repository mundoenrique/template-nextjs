
import axios, { AxiosInstance, AxiosError } from 'axios';

let client: boolean = false
if (typeof window !== "undefined") {
	client = true
}

const connectApi: AxiosInstance = axios.create({
	baseURL: client ? '/api' : process.env.NEXT_PUBLIC_PATH_URL + '/api',
	timeout: 50000
});

connectApi.interceptors.request.use(
	(config) => {
		const timeout = 50000
		config.timeout = timeout;
		return config
	},
	(err) => Error(err)
)

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
