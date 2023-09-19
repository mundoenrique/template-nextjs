'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
//Internal app
import { ProviderProps } from '@/interfaces';

const HydrationZustand = ({ children }: ProviderProps) => {
  const router = usePathname();
  const [isHydrated, setIsHydrated] = useState(true);
  const currentTenant = router.split('/')[1] || 'novo';

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated)
    return (
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
            src={`/images/${currentTenant}/img-logo-color.svg`}
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
    );

  return <>{children}</>;
};

export default HydrationZustand;
