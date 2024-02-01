'use client';
import { useQrStore } from '@/store';

export default function VerifyCard() {
  const { user } = useQrStore();
  return (
    <>
      <h1>VerifyCard</h1>
      <h3>{user}</h3>
    </>
  );
}
