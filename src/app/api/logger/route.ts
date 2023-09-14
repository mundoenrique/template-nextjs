import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
const logger = require('@/utils/logger');
import { options } from '@/utils/nextAuth';
import { decrypt, encryptToView } from '@/utils';

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const reqData = JSON.parse(decrypt(payload));
  const session = await getServerSession(options);
  const url = req.headers.get('referer') || '';
  const tenant = url.split('/')[3];
  const ip = req.headers.get('x-forwarded-for');

  if (session) {
    logger[reqData.type]({ message: reqData.msg, user: session.user?.name, ip, tenant });
  } else {
    logger[reqData.type]({ message: reqData.msg });
  }

  const cifrado = encryptToView({ code: 0, msg: 'ok' });

  return new NextResponse(JSON.stringify(cifrado), {
    status: 200,
  });
}
