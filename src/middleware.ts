import { NextRequest, NextResponse } from "next/server";
//Internal app
import { configTenant } from "@/config";
const tenants = Object.keys(configTenant);

// ["novo", "bdb", "coop"];
const validTenants = new Set(tenants) //Set verificación de validez del tenant
const tenantCookie = "tenant";
const routeCookie = "currentRoute";
const SIGNIN_ROUTE = "/signin";
const ROUTES = ['/signin', '/dashboard', '/create-password'];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const tenant = getPathName(url);
  console.log('tenant:', tenant)

  const defaultTenant = req.cookies.get(tenantCookie)?.value || "novo";
  console.log('defaultTenant:', defaultTenant);

  const route = req.nextUrl.pathname.replace(`/${tenant}`, "");
  console.log('route:', route);

  // Verificar si el tenant es válido
  if (validTenants.has(tenant)) {
    console.log("tenant valido, estableciendo cookie...");
    const response = NextResponse.next()
    setTenantCookie(response, tenant);

    if (req.nextUrl.pathname.startsWith(`/${tenant}`)) {
      if (ROUTES.includes(route) ){
        console.log('Existe la ruta');
        const [,nameRoute] = route.split('/');
        console.log('nameRoute:', nameRoute);
        setCurrentRoute(response, nameRoute);
      }
    }
    return response;
  } else {
    console.log("tenant no valido, redireccionando a tenant valido...");
    const response = redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`);
    if (!req.cookies.get(tenantCookie))
      setTenantCookie(response, defaultTenant);
    return response;
  }
}

/**
 * Redirige a la ruta especificada.
 */
function redirectTo(url: URL, path: string): NextResponse {
  url.pathname = path;
  return NextResponse.redirect(url);
}

/**
 * Establece la cookie del tenant en la respuesta.
 */
function setTenantCookie(response: NextResponse, tenant: string): void {
  response.cookies.set({
    name: tenantCookie,
    value: tenant,
    path: "/",
  });
}

function setCurrentRoute(response: NextResponse, route: string): void { 
  response.cookies.set({
    name: routeCookie,
    value: route,
    path: "/",
  });
}

function getPathName(url: URL): string {
  const [pathname] = url.pathname.split("/");
  return pathname;
}

export const config = {
  matcher: [
    "/:tenant/(inicio|signin|dashboard)",
  ],
};
