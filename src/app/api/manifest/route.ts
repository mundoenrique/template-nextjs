import { generateManifest } from '@/utils/manifest';

export async function GET(request: Request) {
	let { pathname } = new URL(request.url);
	let tenant = pathname.split('/');

	return new Response(generateManifest(tenant[1]), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
