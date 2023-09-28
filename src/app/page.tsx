'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
//Internal app
import { validateTenant } from '@/utils';
import { PageNotFound } from '@/components/UI';
import MuiProvider from './Providers/MuiProvider';
import { useTranslation } from '@/app/i18n/client';

export default function HomePage(): JSX.Element {
  const router = usePathname();
  const currentTenant = validateTenant(router.split('/')[1]);
  const { t } = useTranslation();

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
      </Box>
    </MuiProvider>
  );
}
