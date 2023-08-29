import { Metadata } from 'next';
//Internal App
import { configTenant } from '@/config';
import { Footer } from '@/components/UI';
import { handleConfigTenant } from '@/utils';
import MuiProvider from '../Providers/MuiProvider';
import AuthProvider from '../Providers/AuthProvider';
import ZustandProvider from '../Providers/ZustandProvider';
import { GenerateMetadataProps, RootLayoutProps } from '@/interfaces';
import { Container, Box } from '@mui/material';
import SupperButton from '@/components/UI/SupportButton'

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {

  const { title, description, favicon } = handleConfigTenant(params.tenant);
	const faviconDefault = handleConfigTenant('novo')
  const urlFavicon = params.tenant in configTenant && favicon !== '' ? favicon : faviconDefault?.favicon

  return {
    title: title || 'Admin Console',
    description: description,
    icons: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '32x32',
        url: urlFavicon,
      },
    ],
  };
}

export default async function SigninLayout({ children, params }: RootLayoutProps) {
	return (
		<ZustandProvider>
			<MuiProvider theme={params.tenant}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'nowrap',
						height: '100vh',
					}}
			>
					<AuthProvider>
						<Container>
							{children}
						</Container>
					</AuthProvider>
					<Footer tenant={params.tenant} />
					<SupperButton tenant={params.tenant} />
				</Box>
			</MuiProvider>
		</ZustandProvider>
  );
}
