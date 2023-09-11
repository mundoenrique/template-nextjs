'use client';

import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button, Stack } from '@mui/material';

//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
// import { useRouter } from "next/navigation";
import { getSchema } from '@/config/validation/validationConfig';

import {
	InputDatePicker,
	InputPass,
	InputSelect,
	InputText,
	NavBar,
	InputRadio,
	InputCheck,
	InputSwitch,
	Modals,
	Dialogs
} from '@/components/UI';

import { usePathname } from 'next/navigation';
import { validateTenant } from '@/utils';

export default function Signin({ params }: any) {
	const [showModal, setShowModal] = useState(false);
	const [showModal200, setShowModal200] = useState(false);
	const [open, dialogAccept] = useState(false);
	const [personalize, dialogPersonalize] = useState(false);
	const [formData, setFormData] = useState<any>({});
	const router = usePathname();
	const currentTenant = validateTenant(router.split('/')[1]);
	const { lang } = useLangStore();
  // const language = useLangStore((state: any) => state.lang);
	const { t } = useTranslation(lang, `${params.tenant}-general`);
  // const { t } = useTranslation(language, `${params.tenant}-general`);
  // const router = useRouter();
  
	const schema = getSchema(
		['email', 'password', 'programs', 'initialDate', 'roles', 'term'],
		currentTenant
	);

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			email: '',
			password: '',
			programs: '',
			initialDate: '',
			roles: '',
			term: '',
		},
		resolver: yupResolver(schema),
	});

	const selectOptions = [
		{
			value: '1',
			text: 'option 1',
		},
		{
			value: '2',
			text: 'option 2',
		},
	];

	const RadioOptions = [
		{
			text: t('form.roles_admin_label'),
			value: 'A',
		},
		{
			text: t('form.roles_operator_label'),
			value: 'O',
		},
	];

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

	const onSubmit = async (data: any) => {
		data.initialDate = dayjs(data.initialDate).format('DD/MM/YYYY');
		setFormData(data);
		setShowModal(true);
	};

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
				let findState: any
				findState = list.filter((item: any) => item.name === 'necessaryCookies');
				showDialog = (findState[0].name === 'necessaryCookies') ? false : true
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

	const acceptAll = async () => {}
	const rejecttAll = async () => {}

	useEffect(() => {
		getCookiesList()
  },[])

	return (
		<>
			<NavBar />
      {/* <NavBar tenant={params.tenant} /> */}

			<Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h3" sx={{ mb: 3 }}>
					Componentes
				</Typography>
				<Grid container columns={3} spacing={2}>
					<Grid
						item
						xs={2}
						sx={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<Button variant="text">Variant `Text`</Button>
						<Button variant="outlined">Variant `Outlined`</Button>
						<Button variant="contained">Variant `Contained`</Button>
					</Grid>
					<Grid item xs={2}>
						<InputText
							name="email"
							control={control}
							tenant={params.tenant}
							optional
						/>
						<InputPass
							name="password"
							control={control}
							tenant={params.tenant}
							additionalInfo
						/>
						<InputSelect
							name="programs"
							control={control}
							tenant={params.tenant}
							options={selectOptions}
						/>
						<InputDatePicker
							name="initialDate"
							control={control}
							tenant={params.tenant}
						/>
						<InputRadio
							name="roles"
							control={control}
							label="Seleciona el tipo de usuario"
							tenant={params.tenant}
							options={RadioOptions}
						/>
						<InputCheck
							name="term"
							control={control}
							label="Seleciona el tipo de usuario"
							tenant={params.tenant}
						/>
					</Grid>
					<Grid item xs={1}>
						<Box sx={{ m: 'auto', maxWidth: 700, width: '100%' }}>
							<Button variant="contained" type="submit" fullWidth>
								{t('buttons.accept')}
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>

			<Modals
				msgModal={
					<>
						<Typography>
							{t('dataForm.email', { email: formData.email })}
						</Typography>
						<Typography>
							{t('dataForm.password', { password: formData.password })}
						</Typography>
						<Typography>
							{t('dataForm.programs', { programs: formData.programs })}
						</Typography>
						<Typography>
							{t('dataForm.initialDate', { initialDate: formData.initialDate })}
						</Typography>
						<Typography>
							{t('dataForm.roles', { roles: formData.roles })}
						</Typography>
					</>
				}
				buttons={2}
				showModal={showModal}
			>
				<Button variant="text" onClick={() => setShowModal(false)}>
					{t('buttons.cancel')}
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						setShowModal(false);
						setShowModal200(true);
						reset();
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
					buttonActions1={<>
						<Button variant="outlined" onClick={() => acceptAll()}>
							{t('buttons.acceptAll')}
						</Button>
						<Button variant="outlined" onClick={() => rejectAll()}>
							{t('buttons.rejectAll')}
						</Button>
					</>}
					buttonActions2={<>
						<Button variant="contained" onClick={() => setCookies(cookiesList, 2)}>
							{t('buttons.saveAndExit')}
						</Button>
					</>}
				>
					<InputSwitch
						name="cookies"
						control={control}
						tenant={params.tenant}
						options={cookiesList}
					/>
				</Dialogs>
			
      
      <Box sx={{ m: 5 }}>
        <Typography variant="h3">Botones</Typography>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Buttons buttons={buttonsView} /> */}
          </Grid>
        </Grid>
      </Box>
    </>

		</>
	);
}
