import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { log_message, encryptToView } from '@/utils';

export async function GET(req: NextRequest, res: NextResponse) {
  const cookie = cookies().get('necessaryCookies')?.value || '';
  log_message('info',`Inicia cifrado a la vista ->  ${cookie}`)
  const encryption = encryptToView({ code: 0, msg: cookie });
  log_message('info', JSON.stringify(encryption))
  return new NextResponse(JSON.stringify(encryption), { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    return await setCookies(data);
  } catch (error) {
    return new NextResponse(JSON.stringify({ code: 1, msg: 'Error' }), { status: 200 });
  }

  async function setCookies(data: any) {
    const options = [];
    try {
      for (let i = 0; i < data.options.length; i++) {
        if (data.type === 1) {
          options.push(` ${data.options[i].name}=accepted; HttpOnly=true; Path=/; Secure=true; SameSite=strict`);
        } else if (data.type === 2 && data.options[i].value === true) {
          options.push(` ${data.options[i].name}=accepted; HttpOnly=true; Path=/; Secure=true; SameSite=strict`);
        }
      }

      return new NextResponse(JSON.stringify({ code: 0, msg: 'Process Ok' }), {
        status: 200,
        headers: {
          'Set-Cookie': options.toString(),
        },
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({ code: 1, msg: 'Cookie setting error' }), {
        status: 200,
      });
    }
  }
}
