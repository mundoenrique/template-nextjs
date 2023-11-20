'use client';

import axios, { AxiosInstance, AxiosError } from 'axios';
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
    const reqData = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.stringify(config.data) : config.data
    config.url != '/redisSesion' && localStorage.setItem('sessionTime', new Date().toString());
    config.data = config.data ? { payload : encrypt({ data: reqData }) } : '';
    config.headers['Content-Type'] = 'application/json';
    config.timeout = parseInt(process.env.TIMEOUT_API || '50000');
    return config;
  },
  (error) => {
    return Promise.reject({
      data: {
        status: -1,
        data: `Error configuring the request: ${error.message}`,
      },
    });
  }
);

// Interceptor to handle response errors
connectApi.interceptors.response.use(
  (response): any => {
    let resDecrypt = decrypt({ data: response.data })
    resDecrypt = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.parse(resDecrypt) : resDecrypt
    const res = decrypt({ data: resDecrypt.payload, secret: resDecrypt.code })
    return process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ? JSON.parse(res) : res
  },
  (error: AxiosError) => {
    return Promise.resolve({
      data: {
        code: -1,
        data: 'At this time we are unable to accommodate your request, please try again later.',
      },
    });
  }
);

export default connectApi;
