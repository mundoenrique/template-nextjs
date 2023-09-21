'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
//Internal app
import { validateTenant } from '@/utils';
import MuiProvider from './Providers/MuiProvider';
import { useTranslation } from '@/app/i18n/client';
import { Footer, PageNotFound } from '@/components/UI';
import ZustandProvider from './Providers/ZustandProvider';

export default function NotFoundPage(): JSX.Element {
  const router = usePathname();
  const currentTenant = validateTenant(router.split('/')[1]);
  const { t } = useTranslation(`${currentTenant}-general`);

  const info = {
    status: '404',
    title: t('page_not_found'),
    description: t('message_not_found'),
    btnName: t('buttons.homepage'),
  };

  return (
    <ZustandProvider>
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
    </ZustandProvider>
  );
}
