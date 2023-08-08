//Internal App
import { RootLayout } from '@/interfaces';

export default function RootLayout({ children }: RootLayout) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
}
