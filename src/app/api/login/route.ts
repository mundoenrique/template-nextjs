import { NextRequest, NextResponse } from "next/server";
import { signToken } from '@/utils/jwt'
import axiosInstance  from '@/services/axiosInstance';

export async function POST(req: NextRequest) {

 try {
  const json = await req.json();

    const response:any = await axiosInstance.get(`/users?user=${json.email}&password=${json.password}`);

    switch (response.code) {
      case 0:
        const { id, name, user } = response.data[0]
        const payload = { id, name, user };
        const token = signToken(id, name, user)

        return NextResponse.json({code: 0, token, user: payload })        
      case 1:
        return NextResponse.json({code: 1, msg: 'Invalid username or password. Please try again.'})
      default:
        return NextResponse.json({code: 1, msg: response.data})        
    }
 } catch (error) {
 	return new NextResponse(JSON.stringify({code: 1, msg: error}), {
  	status: 404
 	});
 }
};



