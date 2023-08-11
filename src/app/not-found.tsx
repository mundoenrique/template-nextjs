'use client'
import { PageNotFound } from '@/components/UI';
import Footer from '@/components/UI/Footer';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import MuiProvider from './Providers/MuiProvider';
import { validateTenant } from '@/utils';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';

export default function NotFoundPage (): JSX.Element  {
	const router = usePathname();
	const currentTenant = validateTenant(router.split('/')[1]);
	const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${currentTenant}-general`);

	const info = {
		status : '404',
		title: t('page_not_found'),
		description: t('message_not_found'),
		btnName: t('buttons.homepage')
	}

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
			<PageNotFound params={info}  />
			<Footer tenant={currentTenant} />
      </Box>
    </MuiProvider>
  );
};
