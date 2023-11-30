'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
//Internal app
import { getImages } from '@/utils';
import { useTenantStore } from '@/store';
import { Footer, SupportButton } from '@/components/UI';
import { ProviderProps, ThemeProviderProps } from '@/interfaces';

const HydrationContainerProvider = ({ children, theme }: ProviderProps & ThemeProviderProps) => {
  const [isHydrated, setIsHydrated] = useState(true);

  const handleCurrentTenant = () => {
    useTenantStore.setState(() => ({ tenant: theme }));
  };

  // Wait till Next.js rehydration completes
  useEffect(() => {
    handleCurrentTenant();
    setIsHydrated(false);
  }, []);

  const boxContainet = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100vh',
  };

  if (isHydrated)
    return (
      <Box sx={boxContainet}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Image
              src={getImages(theme, 'img-logo-color.svg')}
              width={300}
              height={60}
              alt='Picture of the author'
              priority
            />
            <Box sx={{ display: 'flex', m: 2 }}>
              <CircularProgress disableShrink color='inherit' />
            </Box>
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box sx={boxContainet}>
      {children}
      <SupportButton />
      <Footer />
    </Box>
  );
};

export default HydrationContainerProvider;
