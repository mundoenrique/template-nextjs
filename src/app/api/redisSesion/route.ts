import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
//Internal app
const Logger = require('@/utils/logger');
import { accessToken } from '@/services/oauth';
import { encryptToView, ramdomData } from '@/utils';
import { createRedisInstance } from '@/services/redis';

export async function GET() {
  const uid = cookies().get('uidvdo')?.value;

  Logger.info('Log in customer session in Redis');
  const redis = createRedisInstance();
  const oauthUser = await redis.get(`session:${uid}`);
  redis.quit();

  if (!oauthUser) {
    Logger.info('Request Oauth service');
    const resOauth: any = await accessToken();

    switch (resOauth.code) {
      case 0:
        return await connectRedis(resOauth.data.accessToken);
      default:
        const cifrado = encryptToView({ code: 1, msg: 'Oauth request error' });
        return new NextResponse(JSON.stringify(cifrado), {
          status: 200,
        });
    }
  } else {
    const cifrado = encryptToView({ code: 0, msg: 'Oauth session exists' });
    Logger.info(`Existe sesion en redis UID: ${uid}`);
    return new NextResponse(JSON.stringify(cifrado), {
      status: 200,
    });
  }
}

async function connectRedis(token: string) {
  const expireSesion = process.env.REDIS_EXIPRE || 3600;
  try {
    Logger.info('Start connection to Redis');
    const redis = createRedisInstance();
    const uid = ramdomData(70);
    await redis.set(`session:${uid}`, JSON.stringify({ accesToken: token }));
    Logger.info(`Register oauth in Redis UID: ${uid}`);
    await redis.expire(`session:${uid}`, expireSesion);
    redis.quit();

    const strict = process.env.NODE_ENV != 'production' ? 'lax' : 'strict';
    const cifrado = encryptToView({ code: 0, msg: 'Successful Redis registration process' });
    return new NextResponse(JSON.stringify(cifrado), {
      status: 200,
      headers: {
        'Set-Cookie': `uidvdo=${uid}; HttpOnly=true; Path=/; Secure=true; SameSite=${strict}`,
      },
    });
  } catch (error) {
    const cifrado = encryptToView({ code: 1, msg: 'Error in connection to Redis' });
    Logger.info(`No oauth record in redis`);
    return new NextResponse(JSON.stringify(cifrado), {
      status: 200,
    });
  }
}
