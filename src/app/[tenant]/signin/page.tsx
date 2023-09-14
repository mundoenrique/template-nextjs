'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';

//Internal App
import { log_message } from '@/utils';
import connectApi from '@/services/connectApi';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validation/validationConfig';
import { InputPass, InputText, NavBar, Modals } from '@/components/UI';

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

export default function LoginPage({ params }: any) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		sesionClient().then((data) => {
			if (data.code != 0) {
				setShowModal(true);
			}
		});
	}, []);

	log_message('info', 'Access the SIG-IN page');
	const router = useRouter();
	const { t } = useTranslation(`${params.tenant}-general`);
	const schema = getSchema(['email', 'password'], params.tenant);

	const { handleSubmit, control, reset } = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const onLoginUser = async ({ email, password }: FormData) => {
		let nuevo = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (nuevo?.error === null) {
			router.push(`dashboard`);
		}
	};

	return (
		<>
			<NavBar />

			<Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onLoginUser)}>
				Sign-in
				<Typography variant="h3" sx={{ mb: 3 }}></Typography>
				<Grid container columns={1} spacing={2}>
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

						<Button variant="contained" type="submit" fullWidth>
							{t('buttons.accept')}
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Modals
				msgModal={'We are unable to process your request at this time'}
				buttons={1}
				showModal={showModal}
			>
				<Button
					variant="contained"
					onClick={() => {
						setShowModal(false);
					}}
				>
					{t('buttons.accept')}
				</Button>
			</Modals>
		</>
	);
}
