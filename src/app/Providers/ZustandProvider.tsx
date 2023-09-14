'use client';

import { useEffect, useState } from 'react';
//Internal app
import { ProviderProps } from '@/interfaces';

const HydrationZustand = ({ children }: ProviderProps) => {
  const [isHydrated, setIsHydrated] = useState(true);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated) return null;

  return <>{children}</>;
};

export default HydrationZustand;
