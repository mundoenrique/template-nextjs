import { Metadata } from 'next';
import { Container } from '@mui/material';
//Internal App
import { handleConfigTenant } from '@/config';
import { GenerateMetadataProps, RootLayoutProps } from '@/interfaces';
import {
	AuthProvider,
	MuiProvider,
	HydrationContainerProvider,
} from '../Providers';

export async function generateMetadata({
	params,
}: GenerateMetadataProps): Promise<Metadata> {
	const { favicon } = handleConfigTenant(params.tenant);

	return {
		title: {
			template: '%s | Consola administrativa',
			default: 'Consola administrativa',
		},
		manifest: `/api/manifest`,
		description: 'Consola para el manejo de efectivo...',
		icons: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				sizes: '32x32',
				url: favicon,
			},
		],
	};
}

export default async function SigninLayout({
	children,
	params,
}: RootLayoutProps) {
	return (
		<MuiProvider theme={params.tenant}>
			<HydrationContainerProvider theme={params.tenant}>
				<AuthProvider>
					<Container>{children}</Container>
				</AuthProvider>
			</HydrationContainerProvider>
		</MuiProvider>
	);
}
