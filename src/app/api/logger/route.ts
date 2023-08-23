import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const logger = require("@/utils/logger");

export async function POST(req: NextRequest) {

	const url = req.headers.get('referer') || ''
	const tenant = url.split('/')[3]
	const ipAddress = req.headers.get('x-forwarded-for');
	const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const json = await req.json();
	let msg

	if(session){
		msg = { message: json.msg, user: session.name, ip: ipAddress, tenant}
	} else {
		msg = { message: json.msg, ip: ipAddress}
	}

 	logger[json.type](msg);

 	return new NextResponse(JSON.stringify({msg: 'ok'}), {
  	status: 200
 	});
};
