import { NextRequest, NextResponse } from "next/server";
import { log_message } from "@/utils";

const validTenants = ["novo", "bdb", "coop"];
const tenantCookie = "tenant";
const SIGNIN_ROUTE = "/signin";
const DASHBOARD_ROUTE = "/dashboard";
const INICIO_ROUTE = "/inicio";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const tenant = url.pathname.split("/")[1];
  const defaultTenant = request.cookies.get(tenantCookie)?.value || "novo";
  const token = request.cookies.get("token")?.value || false;

  log_message(`middleware en url pathname: ${url.pathname}`,'','fetch')

  // Verificar si el tenant es válido
  if (!validTenants.includes(tenant)) {
    console.log("tenant no valido, redireccionando a tenant valido...");
    const response = redirectTo(url, `/${defaultTenant}${SIGNIN_ROUTE}`);
    if (!request.cookies.get(tenantCookie))
      setTenantCookie(response, defaultTenant);
    return response;
  }

  // Redirigir según el estado de autenticación del usuario
  if (token) {
    if (shouldRedirect(url.pathname, tenant, [SIGNIN_ROUTE, INICIO_ROUTE])) {
      console.log("Usuario autenticado, redirigiendo a dashboard...");
      return redirectTo(url, `/${tenant}${DASHBOARD_ROUTE}`);
    }
  } else {
    if (shouldRedirect(url.pathname, tenant, [DASHBOARD_ROUTE, INICIO_ROUTE])) {
      console.log("No hay usuario autenticado, redirigiendo a signin...");
      return redirectTo(url, `/${tenant}${SIGNIN_ROUTE}`);
    }
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
  console.log("tenant no encontrado en cookie, estableciendo cookie...");
  response.cookies.set({
    name: tenantCookie,
    value: tenant,
    path: "/",
  });
}

/**
 * Determina si se debe realizar una redirección en función del estado de autenticación del usuario y de la ruta actual.
 */
function shouldRedirect(
  pathname: string,
  tenant: string,
  routes: string[]
): boolean {
  return routes.some((route) => pathname === `/${tenant}${route}`);
}

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|images|favicon|fonts).*)",
    "/:tenant/(inicio|signin|dashboard)",
  ],
};
