import { Metadata } from 'next';
import { Container } from '@mui/material';
//Internal App
import { configTenant } from '@/config';
import { handleConfigTenant } from '@/utils';
import { GenerateMetadataProps, RootLayoutProps } from '@/interfaces';
import { AuthProvider, MuiProvider, ZustandProvider } from '../Providers';

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { title, description, favicon } = handleConfigTenant(params.tenant);
  const faviconDefault = handleConfigTenant('novo');
  const urlFavicon = params.tenant in configTenant && favicon !== '' ? favicon : faviconDefault?.favicon;

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
    <MuiProvider theme={params.tenant}>
      <ZustandProvider theme={params.tenant}>
        <AuthProvider>
          <Container>{children}</Container>
        </AuthProvider>
      </ZustandProvider>
    </MuiProvider>
  );
}
