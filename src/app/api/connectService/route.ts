import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { decrypt, encryptToView } from '@/utils';
import connectServices from '@/services/connectServices';

type ResponseData = {
  code: number;
  data: string;
  status: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const url = decrypt(searchParams.get('url'));

	const res: ResponseData  = await connectServices.get(`/${url}`);

  const encryption = encryptToView({ code: res.code, payload: res.data });

  return new NextResponse(JSON.stringify(encryption), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const { payload } = await req.json();
  const { url, data } = JSON.parse(decrypt(payload));
	const res: ResponseData = await connectServices.post(`/${url}`, data);

  const encryption = encryptToView({ code: res.code, payload: res.data });

  return new NextResponse(JSON.stringify(encryption), {
    status: res.status,
  });
}
