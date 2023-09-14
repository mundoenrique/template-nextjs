'use client';

import { SessionProvider } from 'next-auth/react';
//Internal app
import { ProviderProps } from '@/interfaces';

export default function AuthProvider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
