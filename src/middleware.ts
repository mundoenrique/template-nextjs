import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { log_message, validToken } from '@/utils';

const access_url = process.env.NEXT_PUBLIC_ACCESS_URL;
const validTenants = access_url?.split(',');
const defaultTenant = validTenants?.[0];
const SIGNIN_ROUTE = '/signin';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const tenant = getPathName(url);
  const requireAuth: string[] = [`/${tenant}/dashboard`];

  log_message('debug', `Middleware in url pathname: ${url.pathname}`, 'fetch');

  if (!validTenants?.includes(tenant)) {
    //Redirect Tenant default
    return redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`);
  }

  if (requireAuth.some((path) => url.pathname.startsWith(path))) {
    return validateSession(url, tenant, req);
  }
}

function getPathName(url: URL): string {
  const [, pathname] = url.pathname.split('/');
  return pathname;
}

function redirectTo(url: URL, path: string, cookies: string[] = []): NextResponse {
  url.pathname = path;
  const response = NextResponse.redirect(url);

  if (cookies.length > 0) {
    cookies.forEach((element: any) => {
      response.cookies.set(element, '', { expires: new Date(Date.now()) });
    });
  }

  return response;
}

async function validateSession(url: URL, tenant: string, req: NextRequest) {
  log_message('debug', `Validating the user session`, 'fetch');

  const token = req.cookies.get('next-auth.session-token');
  const payload: any = await validToken(token?.value);
  const ip = req.headers.get('x-forwarded-for');

  if (!token || payload.ip != ip) {
    log_message('debug', `The session is not valid`, 'fetch');
    return redirectTo(url, `/${tenant}${SIGNIN_ROUTE}`, ['next-auth.session-token']);
  }
}

export const config = {
  matcher: ['/:tenant/signin', '/:tenant/dashboard', '/:tenant/dashboard/:path*'],
};
