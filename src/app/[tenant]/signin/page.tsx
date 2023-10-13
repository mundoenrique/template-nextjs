'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
//Internal App
import { getSchema } from '@/config';
import { log_message } from '@/utils';
import { usePuzzleStore } from '@/store';
import connectApi from '@/services/connectApi';
import { useTranslation } from '@/app/i18n/client';
import { InputPass, InputText, NavBar, Modals, Cookies, RecaptchaPuzzle } from '@/components/UI';
import { FormData, resData } from '@/interfaces';

export default function Signin({ params }: any) {
  const [credential, setCredential] = useState({ email: '', password: '' });
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showModal, setShowModal] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgModal, setmsgModal] = useState('');
  const { puzzle } = usePuzzleStore();

  log_message('info', 'Access the SIG-IN page');
  const router = useRouter();
  const { t } = useTranslation();
  const schema = getSchema(['email', 'password'], params.tenant);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const sesionClient = async ({ email, password }: FormData) => {
    setLoading(true);
    const res: resData = await connectApi.get(`/redisSesion`);
    if (res.code === 0) {
      await onLoginUser({ email, password });
    } else {
      setmsgModal('We are unable to process your request at this time');
      setShowModal(true);
      setLoading(false);
    }
    return res;
  };

  const onLoginUser = async ({ email, password }: FormData) => {
    if (!executeRecaptcha) {
      log_message('error', 'Invalid token');
      return;
    }

    const token = await executeRecaptcha('onSubmit');

    const { code }: resData = await connectApi.post(`/recaptchaVerify`, {
      data: { token },
    });

    if (code == 0) {
      const resLogin = await signIn('credentials', { redirect: false, email, password });
      if (resLogin?.error === null) {
        sesionRouter();
      } else {
        setmsgModal('Invalid username or password. Please try again.');
        setShowModal(true);
      }
    } else {
      setShowPuzzle(true);
      setCredential({
        email,
        password,
      });
    }
  };

  useEffect(() => {
    if (puzzle === 'true') {
      handlePuzzleVerify(credential.email, credential.password);
    }
  }, [puzzle]);

  const handlePuzzleVerify = async (email: any, password: any) => {
    await signIn('credentials', { redirect: false, email, password });
    sesionRouter();
    setShowPuzzle(false);
  };

  const sesionRouter = () => {
    const date = new Date();
    localStorage.setItem('sessionTime', date.toString());
    router.push('dashboard');
  };

  return (
    <>
      <Cookies />
      <NavBar />
      <Box sx={{ m: 5 }} component='form' onSubmit={handleSubmit(sesionClient)}>
        <Typography variant='h3' sx={{ mb: 3 }}>
          Sign-in
        </Typography>
        <Grid container columns={1} spacing={2}>
          <Grid item xs={2}>
            <InputText name='email' control={control} optional />
            <InputPass name='password' control={control} additionalInfo />

            <Button variant='contained' type='submit' disabled={loading} fullWidth>
              {loading && <CircularProgress color='secondary' size={20} />}
              {!loading && t('buttons.accept')}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Modals msgModal={msgModal} buttons={1} showModal={showModal}>
        <Button
          variant='contained'
          onClick={() => {
            setLoading(false);
            setShowModal(false);
          }}
        >
          {t('buttons.accept')}
        </Button>
      </Modals>
      <RecaptchaPuzzle open={showPuzzle} close={setShowPuzzle}>
        <Button
          variant='text'
          onClick={() => {
            setShowPuzzle(false);
            setLoading(false);
          }}
        >
          {t('buttons.close')}
        </Button>
      </RecaptchaPuzzle>
    </>
  );
}
