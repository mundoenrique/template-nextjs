'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
//Internal app
import connectApi from '@/services/connectApi';
import { useTranslation } from '@/app/i18n/client';
import { InputSwitch, Dialogs } from '@/components/UI';

type resData = {
  code: number;
  msg: string;
};

const cookiesList = [
  {
    id: 1,
    name: 'necessaryCookies',
    title: 'Cookies necesarias',
    info: '',
    value: true,
    required: true,
  },
  {
    id: 2,
    name: 'functionalyCookies',
    title: 'Cookies funcionales',
    info: '',
    value: false,
    required: false,
  },
  {
    id: 3,
    name: 'performanceCookies',
    title: 'Cookies de rendimiento',
    info: '',
    value: false,
    required: false,
  },
];

export default function Cookies() {
  const { t } = useTranslation();
  const [open, dialogAccept] = useState(false);
  const [personalize, dialogPersonalize] = useState(false);

  const getCookiesList = async () => {
    const res: resData = await connectApi.get('cookies');

    if (res.msg != 'accepted') {
      dialogAccept(true);
    }
  };

  const setCookies = async (options: any, type: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PATH_URL}/api/cookies`, {
      method: 'POST',
      body: JSON.stringify({ options, type }),
    });
    const data = await response.json();
    const value = data.code === 0 ? false : true;
    type === 1 ? dialogAccept(value) : dialogPersonalize(value);
  };

  useEffect(() => {
    getCookiesList();
  }, []);

  return (
    <>
      <Dialogs
        open={open}
        position='end'
        maxWidth='xl'
        title={t('cookies.titles.privacy')}
        msgDialog={
          <Typography>
            {t('cookies.dialogs.1')}
            <Link href='/'>{t('cookies.dialogs.here')}</Link>
          </Typography>
        }
        buttonDialog={
          <>
            <Button
              variant='contained'
              onClick={() => {
                setCookies(cookiesList, 1);
              }}
            >
              {t('buttons.acceptAllCookies')}
            </Button>
            <Button
              variant='outlined'
              onClick={() => {
                dialogAccept(false);
                dialogPersonalize(true);
              }}
            >
              {t('buttons.personalizeCookies')}
            </Button>
          </>
        }
      />

      <Dialogs
        open={personalize}
        maxWidth='sm'
        title={t('cookies.titles.config')}
        msgDialog={
          <>
            <Typography>{t('cookies.dialogs.2')}</Typography>
            <Typography>
              {t('cookies.dialogs.3')}
              <Link href='/'>{t('cookies.dialogs.policy')}</Link>
            </Typography>
            <InputSwitch name='cookies' options={cookiesList} />
          </>
        }
        buttonDialog={
          <Button variant='contained' onClick={() => setCookies(cookiesList, 2)}>
            {t('buttons.saveAndExit')}
          </Button>
        }
      />
    </>
  );
}
