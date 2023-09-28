'use client';

import React, { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import {
	InputPass,
	InputText,
	NavBar,
	InputSwitch,
	Modals,
	Dialogs
} from '@/components/UI';

//Internal App
import { log_message } from '@/utils';
import connectApi from '@/services/connectApi';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validation/validationConfig';

export default function Signin({ params }: any) {
  const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [msgModal, setmsgModal] = useState('');
	const [showModal200, setShowModal200] = useState(false);
	const [open, dialogAccept] = useState(false);
	const [personalize, dialogPersonalize] = useState(false);
	const [formData, setFormData] = useState<any>({});

  log_message('info', 'Access the SIG-IN page');
  const router = useRouter();
  const { t } = useTranslation();
  const schema = getSchema(['email', 'password'], params.tenant); //currentTenant

  type FormData = {
    email: string;
    password: string;
  };

  type resData = {
    code: number;
    msg: string;
  };

  const sesionClient = async () => {
    const res: resData = await connectApi.get(`/redisSesion`);
    return res;
  };

	const cookiesList = [
		{
			id: 1,
			name: 'necessaryCookies',
			title: "Cookies necesarias",
			info: "",
			value: true,
			required: true
		},
		{
			id: 2,
			name: 'functionalyCookies',
			title: "Cookies funcionales",
			info: "",
			value: false,
			required: false
		},
		{
			id: 3,
			name: 'performanceCookies',
			title: "Cookies de rendimiento",
			info: "",
			value: false,
			required: false
		},
	];

	const getCookiesList = async () => {
		const response = await fetch(process.env.NEXT_PUBLIC_PATH_URL + '/api/cookies', {
			method: 'GET',
		})
		const data = await response.json()
    const list = data.data
    let showDialog: any

		switch (list.length) {
			case 0:
				showDialog = true
				break
			default:
        list.map((option: any, i: number) => {
          if (option.name === 'necessaryCookies') {
            let findState: any
            findState = list.filter((item: any) => item.name === 'necessaryCookies');
            showDialog = (findState[0].name === 'necessaryCookies') ? false : true;
          }
        }) 
				break
		}
		dialogAccept(showDialog)
	}

	const setCookies = async (options: any, type: number) => {
		const response = await fetch(process.env.NEXT_PUBLIC_PATH_URL + '/api/cookies', {
			method: 'POST',
			body: JSON.stringify({options, type})
		})	
		const data = await response.json()
		const value = (data.code === 0) ? false : true
		if (type === 1) {
			dialogAccept(value)
		} else {
			dialogPersonalize(value)
		}
	}

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  });

	const onLoginUser = async ({ email, password }: FormData) => {

		setLoading(true)
		const resRedis = await sesionClient()

		if (resRedis.code === 0) {
			const resLogin = await signIn('credentials', { redirect: false, email, password })
			if (resLogin?.error === null) {
				const date = new Date
				localStorage.setItem('sessionTime', date.toString())
      	router.push(`dashboard`);
			} else {
				setmsgModal('Invalid username or password. Please try again.')
				setShowModal(true);
			}
		} else {
			setmsgModal('We are unable to process your request at this time')
			setLoading(false)
			setShowModal(true)
		}
  };

  useEffect(() => {
    getCookiesList()
  }, []);

  return (
    <>
      <NavBar />

      <Box sx={{ m: 5 }} component='form' onSubmit={handleSubmit(onLoginUser)}>
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
      <Modals msgModal="Formulario enviado" showModal={showModal200}>
				<Button variant="contained" onClick={() => setShowModal200(false)}>
					{t('buttons.accept')}
				</Button>
			</Modals>

      <>
				<Dialogs
					open={open}
					title={t('cookies.titles.privacy')}
					info1={<>{t('cookies.dialog1.info1')} <a href="/" target="_blank">{t('cookies.dialog1.here')}</a></>}
					info2=""
					maxWidth="xl"
					buttonActions1=""
					buttonActions2={<>
						<Button
							variant="contained"
							onClick={() => {
								setCookies(cookiesList, 1)
							}
						}>
							{t('buttons.acceptAllCookies')}
						</Button>
						<Button variant="outlined" onClick={() => {
								dialogAccept(false)
								dialogPersonalize(true)
							}
						}>
							{t('buttons.personalizeCookies')}
						</Button>
					</>}
				>
				</Dialogs>
				<Dialogs
					open={personalize}
					title={t('cookies.titles.config')}
					info1={t('cookies.dialog2.info1')}
					info2={<>{t('cookies.dialog2.info2')}<a href="/" target="_blank">{t('cookies.dialog2.info3')}</a></>}
					maxWidth="sm"
					buttonActions1={<></>}
					buttonActions2={<>
						<Button variant="contained" onClick={() => setCookies(cookiesList, 2)}>
							{t('buttons.saveAndExit')}
						</Button>
					</>}
				>
					<InputSwitch
						name="cookies"
						control={control}
						options={cookiesList}
					/>
				</Dialogs>
      </>
    </>
  );
}
