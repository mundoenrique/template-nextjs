import { NextRequest, NextResponse } from 'next/server';
//Internal app
const logger = require('@/utils/logger');
import { decrypt, encryptToView } from '@/utils';
import connectServices from '@/services/connectServices';

export async function GET(req: NextRequest, { params }: any) {
  const { searchParams } = new URL(req.url);

  const url = decrypt(searchParams.get('url'));

	const res: any = await connectServices.get(`/${url}`);

  const cifrado = encryptToView({ code: res.code, payload: res.data });

  return new NextResponse(JSON.stringify(cifrado), {
    status: 200,
  });
}
type ResponseData = {
  code: number;
  data: any;
  status: number;
}

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const { url, data } = JSON.parse(decrypt(payload));
//!DUDA  con const res = await connectServices.post(`/${url}`, data) as unknown;
	const res: ResponseData = await connectServices.post(`/${url}`, data);

  const cifrado = encryptToView({ code: res.code, payload: res.data });

  return new NextResponse(JSON.stringify(cifrado), {
    status: res.status,
  });
}
