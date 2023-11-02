import { generateManifest } from '@/utils/manifest';

export async function GET(req: Request) {
	const url = req.headers.get('referer') || '';
	const tenant = url.split('/')[3];
	return new Response(generateManifest(tenant), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
