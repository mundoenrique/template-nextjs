import { NextRequest, NextResponse } from "next/server"
import { createRedisInstance } from '@/services/redis'
import { ramdomData } from "@/utils"
import { accessToken } from '@/services/oauth'
import { cookies } from 'next/headers'
const Logger = require("@/utils/logger")

export async function GET(req: NextRequest, res: NextResponse) {

	const cookieStore = cookies()
	const uid = cookieStore.get('uidvdo')?.value

	Logger.info('Inicia registro de sesion cliente')
	const redis = createRedisInstance()
	const oauthUser = await redis.get(`session:${uid}`)
	redis.quit()

	if (!oauthUser) {
		Logger.info('Solita servicio de Oauth')
		const resOauth: any = await accessToken()

		switch (resOauth.code) {
			case 0:
				return await connectRedis(resOauth.data.accessToken)
			default:
				return new NextResponse(JSON.stringify({code:1, msg:'Error en solicitud Oauth'}), {
  			status: 200
 				});
		}
	} else {
		Logger.info(`Existe sesion en redis UID: ${uid}`)
		return new NextResponse(JSON.stringify({code:0, msg:'existe sesion Oauth'}), {
  		status: 200
 		});
	}
}

async function connectRedis( token: string) {
	try {
		Logger.info('Inicia conexion a Redis')
		const redis = createRedisInstance()
		const uid = ramdomData(70)
		await redis.set(`session:${uid}`, JSON.stringify({ accesToken: token }));
		Logger.info(`Registra oauth en redis UID: ${uid}`)
		await redis.expire(`session:${uid}`, 3600)
		redis.quit()

		const strict = process.env.NODE_ENV != 'production' ? "lax" : "strict"

		return new NextResponse(JSON.stringify({code:0, msg:'Proceso Ok' }), {
			status: 200,
			headers: {
				'Set-Cookie': `uidvdo=${uid}; HttpOnly=true; Path=/; Secure=true; SameSite=${strict}`,
				'x-hash': 'ELHASHDINAMICO'
			}
  	})
	} catch (error) {
		Logger.info(`No registro oauth en redis`)
		return new NextResponse(JSON.stringify({code:1, msg:'Error en conexion a redis'}), {
  	status: 200
 	});
	}
}
