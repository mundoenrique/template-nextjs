import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { decrypt, encryptToView } from "@/utils";

export async function POST(req: NextRequest) {

	const { payload } = await req.json();
	const { data } = JSON.parse(decrypt(payload));

	const res = await axios.post(process.env.URL_RECAPTCHA || '', {
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: data.token
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
	})

	const cifrado = encryptToView({ code: 0, payload: res.data });

 	return new NextResponse(JSON.stringify(cifrado), {
    status: 200,
  });
}

