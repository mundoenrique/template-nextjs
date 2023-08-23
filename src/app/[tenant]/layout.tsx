import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getServerSession } from "next-auth/next"
//Internal App
import { configTenant } from '@/config';
import { Footer } from '@/components/UI';
import { handleConfigTenant } from '@/utils';
import MuiProvider from '../Providers/MuiProvider';
import { options } from "@/utils/nextAuth";
import { GenerateMetadataProps, RootLayoutProps } from '@/interfaces';
import { Container, Box } from '@mui/material';
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
	const session = await getServerSession(options)
  return (
    <MuiProvider theme={params.tenant} session={session}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100vh',
        }}
			>
					<Container>
						{children}
					</Container>
        <Footer tenant={params.tenant} />
        <Widget tenant={params.tenant} />
      </Box>
    </MuiProvider>
  );
}
