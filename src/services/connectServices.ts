import { cookies } from 'next/headers';
import axios, { AxiosInstance, AxiosError } from 'axios';
//Internal app
import { createRedisInstance } from '@/services/redis';

const connectServices: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: parseInt(process.env.TIMEOUT_API || '50000'),
});

// Interceptor to handle response errors
connectServices.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.resolve({
      code: -1,
      data: 'At this time we are unable to accommodate your request, please try again later.',
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
      status: -1,
      data: `Error configuring the request: ${error.message}`,
    });
  }
);

async function callOuth() {
  const cookieStore = cookies();
  const uidvdo = cookieStore.get('uidvdo')?.value;

  try {
    const redis = createRedisInstance();
    const OuthToken: any = await redis.get(`session:${uidvdo}`);

    return OuthToken.accesToken;
  } catch (error) {
    return null;
  }
}

export default connectServices;
