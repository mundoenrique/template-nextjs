'use client';

import { usePathname } from 'next/navigation';
//Internal app
import { validateTenant } from '@/utils';
import { PageNotFound } from '@/components/UI';
import MuiProvider from './Providers/MuiProvider';
import { useTranslation } from '@/app/i18n/client';
import ZustandProvider from './Providers/ZustandProvider';

export default function NotFoundPage(): JSX.Element {
  const router = usePathname();
  const currentTenant = validateTenant(router.split('/')[1]);
  const { t } = useTranslation();

  const info = {
    status: '404',
    title: t('page_not_found'),
    description: t('message_not_found'),
    btnName: t('buttons.homepage'),
  };

  return (
    <MuiProvider theme={currentTenant}>
      <ZustandProvider theme={currentTenant}>
        <PageNotFound params={info} />
      </ZustandProvider>
    </MuiProvider>
  );
}
