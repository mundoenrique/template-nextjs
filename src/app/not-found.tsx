'use client'
import { PageNotFound } from '@/components/UI';
import Footer from '@/components/UI/Footer';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import MuiProvider from './Providers/MuiProvider';
import { validateTenant } from '@/utils';

export default function NotFoundPage (): JSX.Element  {
	const router = usePathname();
	const currentTenant = validateTenant(router.split('/')[1]);

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
			<PageNotFound tenant={currentTenant} />
			<Footer tenant={currentTenant} />
      </Box>
    </MuiProvider>
  );
};
