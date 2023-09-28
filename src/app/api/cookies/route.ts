import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return await getCookies()
  } catch (error) {
    return new NextResponse(JSON.stringify({ code: 1, msg: 'Error' }), { status: 200 });
  }

  async function getCookies() {
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
