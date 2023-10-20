import Script from 'next/script';
//Internal app
import { RootLayout } from '@/interfaces';

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang={process.env.LANGUAGE}>
      <Script src='/register.js' />
      <body>{children}</body>
    </html>
  );
}
