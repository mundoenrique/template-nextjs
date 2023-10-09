export const tenantConfig = {
	favicon: `${process.env.NEXT_PUBLIC_PATH_URL}/images/novo/favicon.ico`,
	imagesFooter: ['novopayment', 'pci'],
	networks: {
		facebook: '',
		instagram: '',
		twitter: '',
		youtube: '',
		linkedin: '',
	},
	PWA: {
		name: 'Azul App',
		short_name: 'AzulPWA',
		description: 'App for Azul management',
		theme_color: '#0A60F9',
		background_color: '#F3F3F3',
		screenshots: [
			{
				src: 's1.jpg',
				sizes: '1000x600',
				type: `image/jpg`,
				purpose: 'any',
			},
			{
				src: 's2.jpg',
				sizes: '1000x600',
				type: `image/jpg`,
				purpose: 'any',
			},
			{
				src: 's3.jpg',
				sizes: '1000x600',
				type: `image/jpg`,
				purpose: 'any',
			},
		],
	},
};
