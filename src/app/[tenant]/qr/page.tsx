'use client';

import { QRCodeReader } from '@/components/UI';
import { useRouter } from 'next/navigation';
import { useQrStore } from '@/store';

export default function Qr() {
  const router = useRouter();
  const { setUser } = useQrStore();

  const readCodeFunction = (data: any): Promise<any> => {
    return new Promise((resolve) => {
      console.log('readCodeFunction-pageQR:', data);
      setUser(data);
      router.push('verify');
      resolve(data);
    });
  };

  return <QRCodeReader readCode={readCodeFunction} />;
}
