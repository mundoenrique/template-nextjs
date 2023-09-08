import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'

	const cookiesList = [
		{
			id: 1,
			name: 'necessaryCookies',
			title: "Cookies necesarias",
			info: "",
			value: true,
			required: true
		},
		{
			id: 2,
			name: 'functionalyCookies',
			title: "Cookies funcionales",
			info: "",
			value: false,
			required: false
		},
		{
			id: 3,
			name: 'performanceCookies',
			title: "Cookies de rendimiento",
			info: "",
			value: false,
			required: false
		},
];
  
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return await getCookies(cookiesList)
  } catch (error) {
    return new NextResponse(JSON.stringify({ code: 1, msg: 'Error' }), { status: 200 });
  }

  async function getCookies(data: any) {
    const cookieStore = cookies()
    try {
      const listCookies = cookieStore.getAll()
      return new NextResponse(JSON.stringify({ code: 0, msg: 'Proceso Ok', data: listCookies }))
    } catch (error) {
      return new NextResponse(JSON.stringify({ code: 1, msg: 'Error en seteo de cookies' }), {
        status: 200
      });
    }
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    return await setCookies(data)
  } catch (error) {
    return new NextResponse(JSON.stringify({ code: 1, msg: 'Error' }), { status: 200 });
  }

  async function setCookies(data: any) {
    const options = []
    try {
      for (let i = 0; i < data.options.length; i++) {
        if (data.type === 1) { 
          options.push(` ${data.options[i].name}=accepted; HttpOnly=true; Path=/; Secure=true; SameSite=strict`)
        } else if (data.type === 2 && data.options[i].value === true) {
          options.push(` ${data.options[i].name}=accepted; HttpOnly=true; Path=/; Secure=true; SameSite=strict`)
        }
      }
      
      return new NextResponse(JSON.stringify({ code: 0, msg: 'Proceso Ok' }), {
        status: 200,
        headers: {
          'Set-Cookie': options.toString()
        }
      })
    } catch (error) {
      return new NextResponse(JSON.stringify({ code: 1, msg: 'Error en seteo de cookies' }), {
        status: 200
      });
    }
  }
}
