import { handleConfigTenant } from '@/config';

import { getImages } from '@/utils';

const fileIcons = [48, 72, 96, 144, 192, 512];
type ScreenObj = {
  src: string,
  sizes: string,
  type: string,
  purpose: string,
  form_factor?: string,
}

export function generateManifest(tenant: string) {
	const { PWA } = handleConfigTenant(tenant);
	const manifestParams = {
		name: PWA?.name,
		short_name: PWA?.short_name,
		description: PWA?.description,
		theme_color: PWA?.theme_color,
		background_color: PWA?.background_color,
		start_url: `/${tenant}/signin`,
		icons: fileIcons.map((icon: number) => ({
			src: getImages(tenant, `pwa_icons/${icon}.png`).default.src,
			sizes: `${icon}x${icon}`,
			type: `image/png`,
		})),
		screenshots: (PWA?.screenshots as ScreenObj[]).map((e: ScreenObj) => {
			let obj: ScreenObj = Object.assign({}, e);
			obj['src'] = `/images/${tenant}/pwa_screenshots/${e.src}`;
			return obj;
		}),
		display: 'standalone',
		orientation: 'portrait',
	};

	let manifest = JSON.stringify(manifestParams, null, 2);

	return manifest;
}
