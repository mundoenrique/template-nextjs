import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
const Logger = require('@/utils/logger');
import { decrypt, encryptToView } from '@/utils';

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const { data } = JSON.parse(decrypt(payload));
  const res = await axios.post(
    process.env.URL_RECAPTCHA || '',
    {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: data.token,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  Logger.info(`Recaptcha: Score: ${res.data.score}, Hostname: ${res.data.hostname}`);

  const resultRecaptcha = res.data.score >= 1 ? 0 : 1;

  if (resultRecaptcha == 1) {
    const encryption = encryptToView({ code: 1, payload: res.data });
    Logger.error('Recaptcha score failed');
    return new NextResponse(JSON.stringify(encryption), {
      status: 200,
    });
  }

  const encryption = encryptToView({ code: 0, payload: res.data });

  return new NextResponse(JSON.stringify(encryption), {
    status: 200,
  });
}
