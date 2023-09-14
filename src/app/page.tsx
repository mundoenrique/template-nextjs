'use client';

import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
//Internal app
import { validateTenant } from '@/utils';
import Footer from '@/components/UI/Footer';
import { PageNotFound } from '@/components/UI';
import MuiProvider from './Providers/MuiProvider';
import { useTranslation } from '@/app/i18n/client';

export default function HomePage(): JSX.Element {
  const router = usePathname();
  const currentTenant = validateTenant(router.split('/')[1]);
  const { t } = useTranslation(`${currentTenant}-general`);

  const info = {
    status: '',
    title: t('title_error_general'),
    description: t('desc_error_general'),
    btnName: t('buttons.return'),
  };

  return (
    <MuiProvider theme={currentTenant}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100vh',
        }}
      >
        <PageNotFound params={info} />
        <Footer tenant={currentTenant} />
      </Box>
    </MuiProvider>
  );
}
