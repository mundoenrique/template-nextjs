import { NextRequest, NextResponse } from 'next/server';

const access_url = process.env.ACCESS_URL;
const validTenants = access_url?.split(',');

const SIGNIN_ROUTE = '/signin';

export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const tenant = getPathName(url);

	const defaultTenant = validTenants?.[0];

	if (!validTenants?.includes(tenant)) {
		//Redirect Tenant default
		return redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`);
	}
}

function getPathName(url: URL): string {
	const [, pathname] = url.pathname.split('/');
	return pathname;
}

function redirectTo(url: URL, path: string): NextResponse {
	url.pathname = path;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ['/:tenant/(signin)'],
};
