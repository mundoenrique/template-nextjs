
import { cookies } from 'next/headers'
import axios, { AxiosInstance, AxiosError } from 'axios'
import { createRedisInstance } from '@/services/redis'

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
	async (config) => {
		const uid = await callOuth()
    const timeout = 50000
		config.timeout = timeout;
		config.headers["Authorization"] = `Bearer ${uid}`;
    return config;
  },
  (error) => {
    return Promise.reject({
      status: -1,
      data: 'Error al configurar la solicitud: ' + error.message
    });
  }
);


async function callOuth() {
	const cookieStore = cookies()
	const uidvdo = cookieStore.get('uidvdo')?.value

	try {
		const redis = createRedisInstance()
		const OuthToken: any = await redis.get(`session:${uidvdo}`)

		return OuthToken.accesToken
	} catch (error) {
		return null
	}

}

export default axiosInstance;
