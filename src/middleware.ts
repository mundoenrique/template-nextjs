import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt"
import { log_message } from "@/utils"

const access_url = process.env.NEXT_PUBLIC_ACCESS_URL
const validTenants = access_url?.split(',')
const defaultTenant = validTenants?.[0]
const SIGNIN_ROUTE = '/signin'

export async function middleware(req: NextRequest) {

	console.log('HEADEERS -> ', req)


	const url = req.nextUrl.clone();
	const tenant = getPathName(url);
	const requireAuth: string[] = [`/${tenant}/dashboard`]

  log_message('debug',`middleware en url pathname: ${url.pathname}`,'fetch')

	if (!validTenants?.includes(tenant)) {
		//Redirect Tenant default
		return redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`, [])
	}

	if (requireAuth.some((path) => url.pathname.startsWith(path))) {
		return validateSession(url, tenant, req)
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

	return response
}

async function validateSession(url: URL, tenant:string, req:any) {

	const ip = req.headers.get('x-forwarded-for');
	const token: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	console.log('ES EL TOKEN NUEVO ', token)

	if (!token || (token.ip != ip)) {
		return redirectTo(url,`/${tenant}${SIGNIN_ROUTE}`,['next-auth.session-token'])
	}
}

export const config = {
	matcher: ['/:tenant/signin', '/:tenant/dashboard', '/:tenant/dashboard/:path*']
};
