'use client'
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
//Internal app
import { decrypt, encrypt } from '@/utils';

let client: boolean = false;
if (typeof window !== 'undefined') {
  client = true;
}

const connectApi: AxiosInstance = axios.create({
  baseURL: client ? '/api' : `${process.env.NEXT_PUBLIC_PATH_URL}/api`,
  timeout: parseInt(process.env.TIMEOUT_API || '50000'),
});

connectApi.interceptors.request.use(
	async (config) => {
		config.url != '/redisSesion' && localStorage.setItem("sessionTime", (new Date().toString()));
    const payload = encrypt(JSON.stringify(config.data));
		config.data = config.data ? { payload } : '';
		config.headers['Content-Type'] = 'application/json';
    config.timeout = parseInt(process.env.TIMEOUT_API || '50000');
    return config;
  },
  (error) => {
		return Promise.reject({
			data: {
				status: -1,
				data: `Error configuring the request: ${error.message}`
			}
		});
  }
);

// Interceptor to handle response errors
connectApi.interceptors.response.use(
	(response): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {

    const resDecrypt = decrypt(response.data.payload, response.data.code);
    return JSON.parse(resDecrypt);
  },
  (error: AxiosError) => {
		return Promise.resolve({
			data: {
				code: -1,
				data: 'At this time we are unable to accommodate your request, please try again later.'
			}
		});
  }
);

export default connectApi;
