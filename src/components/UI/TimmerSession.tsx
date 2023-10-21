'use client';

import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
//Internal app
import { Modals } from '@/components/UI';
import { useTranslation } from '@/app/i18n/client';

export default function TimmerSession() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [inactive, setInactive] = useState(false);
  const { update, data: session } = useSession();
  const ref: any = useRef(null);

  useEffect(() => {
    let inactiveTime: any;
    const inactiveTimeLimit = 30000;

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

  useEffect(() => {
    let intervalSession: any;

    const timerSession = () => {
      if (!localStorage.sessionTime) {
        signOut();
      }

      const date = new Date(localStorage.sessionTime).getTime();
      const now = new Date().getTime();
      const time = Math.trunc(Math.abs((date - now) / 1000));
      const timeRest = parseInt(process.env.NEXT_PUBLIC_SESS_EXPIRATION || '300') - time;
      time.toString() === '1' && ref.current.click();
      if (timeRest === 45) {
        setShowModal(true);
      } else if (timeRest <= 0) {
        clearInterval(intervalSession);
        localStorage.removeItem('sessionTime');
        signOut();
      }
    };

    intervalSession = setInterval(timerSession, 1000);
  }, []);

  // beforeunload;
  // window.addEventListener('unload', () => {
  //   localStorage.clear();
  // });

  const viewSession = async () => {
    const session = await getSession();
    if (session === null) {
      signOut();
    } else {
      update();
    }
  };

  return (
    <>
      <Button sx={{ display: 'none' }} ref={ref} onClick={() => viewSession()} />

      <Modals
        msgModal={`Your session is about to expire. Do you want to continue using your App?`}
        showModal={showModal}
      >
        <Button
          variant="contained"
          onClick={() => {
            setShowModal(false);
            setInactive(false);
          }}
        >
          {t('buttons.accept')}
        </Button>
      </Modals>
    </>
  );
}
