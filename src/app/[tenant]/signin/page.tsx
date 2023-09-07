'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button, Stack } from '@mui/material';

//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { useCookiesStore } from "@/store/cookiesStore";
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
	Modals,
} from '@/components/UI';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { validateTenant } from '@/utils';

export default function Signin({ params }: any) {
	const [showModal, setShowModal] = useState(false);
	const [showModal200, setShowModal200] = useState(false);
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

	const onSubmit = async (data: any) => {
		data.initialDate = dayjs(data.initialDate).format('DD/MM/YYYY');
		setFormData(data);
		setShowModal(true);
	};

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
      {/* <ModalCookies params={params}/> */}
      
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
