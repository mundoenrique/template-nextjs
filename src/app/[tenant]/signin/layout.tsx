import { RootLayout } from '@/interfaces';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Signin - Admin Console',
  description: '...',
};

export default function Signinlayout({ children }: RootLayout) {
  return <>{children}</>;
}
