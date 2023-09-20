import { Metadata } from 'next';
import { Container, Box } from '@mui/material';
//Internal App
import { configTenant } from '@/config';
import { Footer } from '@/components/UI';
import { handleConfigTenant } from '@/utils';
import SupperButton from '@/components/UI/SupportButton';
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100vh',
        }}
      >
        <ZustandProvider>
          <AuthProvider>
            <Container>{children}</Container>
          </AuthProvider>
          <SupperButton tenant={params.tenant} />
        </ZustandProvider>
        <Footer tenant={params.tenant} />
      </Box>
    </MuiProvider>
  );
}
