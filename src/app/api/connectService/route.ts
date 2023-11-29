import { NextRequest, NextResponse } from 'next/server';
import { log_message } from '@/utils';

//Internal app
import { decrypt, encryptToView } from '@/utils';
import connectServices from '@/services/connectServices';

export async function GET(req: NextRequest, { params }: any) {
  const { searchParams } = new URL(req.url);

  const url = decrypt({ data: searchParams.get('url') });

  const res: any = await connectServices.get(`/${url}`);
  const encryption: any = encryptToView({ code: res.code, payload: res.data });
  log_message('info',JSON.stringify(res))

  return new NextResponse(JSON.stringify(encryption), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const { url, data } = process.env.NEXT_PUBLIC_ACTIVE_SAFETY === 'ON' ?
    JSON.parse(decrypt({ data: payload })) : decrypt({ data: payload })

  const res: any = await connectServices.post(`/${url}`, data);
  const encryption = encryptToView({ code: res.code, payload: res.data });
  log_message('info',JSON.stringify(res))

  return new NextResponse(JSON.stringify(encryption), {
    status: res.status,
  });
}
