import { NextRequest, NextResponse } from "next/server";
const logger = require("@/utils/logger");

export async function POST(req: NextRequest) {

 const json = await req.json();
 let msg = json.msg

 if(json.user){
  msg = { message: json.msg, user: json.user}
 }

 logger.info(msg);

 return new NextResponse(JSON.stringify({msg: 'ok'}), {
  status: 200
 });
};
