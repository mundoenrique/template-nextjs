//Internal App
import { RootLayout } from '@/interfaces';

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang={process.env.LANGUAGE}>
      <body>{children}</body>
    </html>
  );
}
