import { NextRequest, NextResponse } from 'next/server';
//Internal app
const logger = require('@/utils/logger');
import connectServices from "@/services/connectServices"
import { decrypt, encryptToView } from '@/utils';

export async function GET(req: NextRequest, { params }: any) {

	const { searchParams } = new URL(req.url)

	const url = decrypt(searchParams.get('url'))

	const res: any = await connectServices.get(`/${url}`)
	const cifrado = encryptToView({ code: res.code, payload: res.data })

  return new NextResponse(JSON.stringify(cifrado), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {

	const { payload } = await req.json()
	const {url, data} = JSON.parse(decrypt(payload))

	const res: any = await connectServices.post(`/${url}`, data)
	const cifrado = encryptToView({ code: res.code, payload: res.data })

  return new NextResponse(JSON.stringify(cifrado), {
    status: res.status,
  });
}
