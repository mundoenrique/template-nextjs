import { cookies } from 'next/headers';
import axios, { AxiosInstance, AxiosError } from 'axios';
//Internal app
import { createRedisInstance } from '@/services/redis';
const Logger = require('@/utils/logger');

const connectServices: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: parseInt(process.env.TIMEOUT_API || '50000'),
});

// Interceptor to handle response errors
connectServices.interceptors.response.use(
	(response):any => {
    return {data: response.data, status: response.status};
  },
  (error: AxiosError) => {
		return Promise.resolve({
			data: {
				code: -1,
				data: 'At this time we are unable to accommodate your request, please try again later. ConnectServices',
			}
		});
  }
);

// Interceptor to handle timeout
connectServices.interceptors.request.use(
  async (config) => {
		const uid = await callOuth();
    config.timeout = parseInt(process.env.TIMEOUT_API || '50000');
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${uid}`;
    return config;
  },
  (error) => {
		return Promise.reject({
			data: {
				status: -1,
				data: `Error configuring the request: ${error.message}`,
			}
		});
  }
);

async function callOuth() {

	const redis = createRedisInstance();

	try {
		const cookieStore = cookies();
  	const uidvdo = cookieStore.get('uidvdo')?.value;
		const OuthToken: any = await redis.get(`session:${uidvdo}`);
		await redis.expire(`session:${uidvdo}`, parseInt(process.env.REDIS_EXPIRE || '600'));
		redis.quit();
		return OuthToken.accesToken;

	} catch (error) {
		Logger.error('Error in connection to Redis, access token was not obtained.')
    throw new Error(JSON.stringify({ errors: 'Error in redis', code: -1 }));
  }
}

export default connectServices;
