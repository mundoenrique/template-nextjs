'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ProviderProps } from '@/interfaces';

export default function RecaptchaProvider({ children }: ProviderProps) {
  const activeRecpatcha = process.env.NEXT_PUBLIC_ACTIVE_RECAPTCHA;

  return (
    <>
      {activeRecpatcha === 'ON' ? (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
          {children}
        </GoogleReCaptchaProvider>
      ) : (
        { children }
      )}
    </>
  );
}
