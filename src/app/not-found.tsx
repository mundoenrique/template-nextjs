'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const tenantCookie = 'tenant';
const routeCookie = 'currentRoute';

export default function Custom404() {
	const router = useRouter();
	// Obtén la ruta almacenada en la cookie
	const tenant = Cookies.get(tenantCookie);
	const route = Cookies.get(routeCookie);

	// Si hay una ruta válida en la cookie, redirecciona a ella
	if (tenant && route) {
		router.push(`/${tenant}/${route}`);
	}

	return (
		<div>
			<h1>404 - Página no encontrada</h1>
			<p>Redireccionando...</p>
		</div>
	);
}
