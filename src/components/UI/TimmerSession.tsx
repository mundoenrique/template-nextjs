'use client';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
//Internal app
import { Modals } from '@/components/UI';
import { useTranslation } from '@/app/i18n/client';

export default function TimmerSession() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    let inactiveTime: any;
    const inactiveTimeLimit = 30000;

    const restablecerinactive = () => {
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

    const actividadDetectada = () => {
      if (inactive) {
        setInactive(false);
      }
      restablecerinactive();
    };

    document.addEventListener('mousemove', actividadDetectada);
    document.addEventListener('keydown', actividadDetectada);

    restablecerinactive();

    return () => {
      document.removeEventListener('mousemove', actividadDetectada);
      document.removeEventListener('keydown', actividadDetectada);
      clearTimeout(inactiveTime);
    };
  }, [inactive, showModal]);

  // beforeunload;
  window.addEventListener('unload', () => {
    localStorage.clear();
  });

  //   if (!localStorage.sessionTime) {
  //     signOut();
  //   }
  //   return () => clearInterval(myInterval.current);
  // }, []);

  // useEffect(() => {
  //   if (!isRunning) {
  //     console.log('entre aqui');

  //     myInterval.current = setInterval(() => setCounter((counter) => counter + 1), 10000);
  //     if (counter == 1 && session?.user) {
  //       console.log('Abri modal');
  //       setShowModal(true);
  //       setIsRunning(true);
  //     }

  //     if (counter == 2 && showModal === true) {
  //       console.log('Cerrar sesion');
  //       signOut();
  //     }
  //   }

  //   document.addEventListener('mousemove', () => {
  //     console.log('ejecuto eventos');
  //     clearInterval(myInterval.current);
  //     setCounter(0);
  //     setIsRunning(true);
  //     const timer = setTimeout(() => {
  //       setIsRunning(false);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   });

  //   // document.addEventListener('keypress', () => {
  //   //   clearInterval(myInterval.current);
  //   //   myInterval.current = null;
  //   //   setCounter(0);
  //   // });

  //   // beforeunload;
  //   // window.addEventListener('unload', () => {
  //   //   localStorage.clear();
  //   // });
  // }, [isRunning, setIsRunning]);

  // const handleResetCounter = () => {
  //   clearInterval(myInterval.current);
  //   myInterval.current = null;
  //   setCounter(0);
  //   setShowModal(false);
  //   setIsRunning(false);
  // };

  return (
    <Modals msgModal={`Your session is about to expire. Do you want to continue using your App?`} showModal={showModal}>
      <Button
        variant='contained'
        onClick={() => {
          setInactive(false);
          setShowModal(false);
        }}
      >
        {t('buttons.accept')}
      </Button>
    </Modals>
  );
}
