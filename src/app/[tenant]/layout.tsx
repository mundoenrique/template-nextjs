import { Metadata } from 'next';
import dynamic from 'next/dynamic';
//Internal App
import { configTenant } from '@/config';
import { Footer } from '@/components/UI';
import { handleConfigTenant } from '@/utils';
import MuiProvider from '../Providers/MuiProvider';
import { GenerateMetadataProps, RootLayoutProps } from '@/interfaces';
import { Container } from '@mui/material';
const Widget = dynamic(() => import('@/components/UI/SupportButton'), {
  ssr: false,
});

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
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100vh',
          p: '0 !important',
        }}
      >
        {children}
      </Container>
      <Footer tenant={params.tenant} />
      <Widget tenant={params.tenant} />
    </MuiProvider>
  );
}
