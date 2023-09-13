
import { decrypt, encrypt } from '@/utils';
import axios, { AxiosInstance, AxiosError } from 'axios';

let client: boolean = false
if (typeof window !== "undefined") {
	client = true
}

const connectApi: AxiosInstance = axios.create({
	baseURL: client ? '/api' : process.env.NEXT_PUBLIC_PATH_URL + '/api',
	timeout: parseInt(process.env.TIMEOUT_API || '50000')
});

connectApi.interceptors.request.use(
	async (config) => {
		const payload = encrypt(JSON.stringify(config.data))
		config.data = config.data ? { payload } : ''
		config.timeout = parseInt(process.env.TIMEOUT_API || '50000')
		return config
	},
	(err) => Error(err)
)

// Interceptor para manejar errores de respuesta
connectApi.interceptors.response.use(
	(response): any => {
		const resDecrypt = decrypt(response.data.payload, response.data.code)
		return JSON.parse(resDecrypt)
	},
	(error: AxiosError) => {
      return Promise.resolve({
        code: -1,
        data: 'At this time we are unable to accommodate your request, please try again later.',
      })
  }
)

export default connectApi;
