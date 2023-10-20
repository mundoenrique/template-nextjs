'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
//Internal app
import { Modals } from '@/components/UI';
import { useTranslation } from '@/app/i18n/client';

export default function TimmerSession() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [inactive, setInactive] = useState(false);
  const { update } = useSession();

  useEffect(() => {
    let inactiveTime: any;
    const inactiveTimeLimit = 30000;

    if (!localStorage.sessionTime) {
      signOut();
    }

    const resetInactive = () => {
      clearTimeout(inactiveTime);
      if (session?.user) {
        inactiveTime = setTimeout(() => {
          setShowModal(true);
          setInactive(true);
          if (showModal) {
            signOut();
          }
        }, inactiveTimeLimit);
      }
    };

    const detectedActivity = () => {
      if (inactive) {
        setInactive(false);
      }
      resetInactive();
    };

    document.addEventListener('mousemove', detectedActivity);
    document.addEventListener('keydown', detectedActivity);

    resetInactive();

    return () => {
      document.removeEventListener('mousemove', detectedActivity);
      document.removeEventListener('keydown', detectedActivity);
      clearTimeout(inactiveTime);
    };
  }, [inactive, showModal]);

  // beforeunload;
  window.addEventListener('unload', () => {
    localStorage.clear();
  });

  return (
    <Modals msgModal={`Your session is about to expire. Do you want to continue using your App?`} showModal={showModal}>
      <Button
        variant='contained'
        onClick={() => {
          setInactive(false);
          setShowModal(false);
          update();
        }}
      >
        {t('buttons.accept')}
      </Button>
    </Modals>
  );
}
