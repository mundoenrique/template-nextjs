import { NextRequest, NextResponse } from 'next/server';
//Internal app
import { configTenant } from '@/config';
const tenants = Object.keys(configTenant);

// ["novo", "bdb", "coop"]; // variable de entorno
const validTenants = new Set(tenants); //Set verificación de validez del tenant
const tenantCookie = 'tenant';
const routeCookie = 'currentRoute';
const SIGNIN_ROUTE = '/signin';
const ROUTES = ['/signin'];

export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const tenant = getPathName(url);
	console.log('tenant:', tenant);

	const defaultTenant = req.cookies.get(tenantCookie)?.value || 'novo'; //default variable de entorno
	console.log('defaultTenant:', defaultTenant);

	// Verificar si el tenant es válido
	if (validTenants.has(tenant)) {
		console.log('tenant valido, estableciendo cookie...');
		const response = NextResponse.next();
		setTenantCookie(response, tenant);
		return response;
	} else {
		console.log('tenant invalido, redirigiendo...');
		return redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`);
	}
}

/**
 * Establece la cookie del tenant en la respuesta.
 */
function setTenantCookie(response: NextResponse, tenant: string): void {
	response.cookies.set({
		name: tenantCookie,
		value: tenant,
		path: '/',
	});
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
