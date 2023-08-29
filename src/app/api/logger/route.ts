import { NextRequest, NextResponse } from "next/server";
import { validToken } from "@/utils/jwt";
const logger = require("@/utils/logger");

export async function POST(req: NextRequest) {

	const url = req.headers.get('referer') || ''
	const tenant = url.split('/')[3]
	const ipAddress = req.headers.get('x-forwarded-for');
	const token = req.cookies.get('next-auth.session-token')
	const payload:any = await validToken(token?.value)
	const json = await req.json();
	let msg

	if(payload){
		msg = { message: json.msg, user: payload.name, ip: ipAddress, tenant}
	} else {
		msg = { message: json.msg }
	}

 	logger[json.type](msg);

 	return new NextResponse(JSON.stringify({msg: 'ok'}), {
  	status: 200
 	});
};
