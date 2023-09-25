'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
//Internal app
import { useTenantStore } from '@/store';
import { ProviderProps } from '@/interfaces';
import { Footer, SupportButton } from '@/components/UI';

const HydrationZustand = ({ children, theme }: ProviderProps & any) => {
  const [isHydrated, setIsHydrated] = useState(true);

  const handleCurrentTenant = () => {
    useTenantStore.setState(() => ({ tenant: theme }));
  };

  // Wait till Next.js rehydration completes
  useEffect(() => {
    handleCurrentTenant();
    setIsHydrated(false);
  }, []);

  if (isHydrated)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100vh',
        }}
      >
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
              src={`/images/${theme}/img-logo-color.svg`}
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '100vh',
      }}
    >
      {children}
      <SupportButton />
      <Footer />
    </Box>
  );
};

export default HydrationZustand;
