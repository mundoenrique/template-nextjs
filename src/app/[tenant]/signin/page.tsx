'use client';

import React, { useEffect, useState } from 'react';
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
	Dialogs,
} from '@/components/UI';

//Internal App
import { log_message } from '@/utils';
import connectApi from '@/services/connectApi';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validation/validationConfig';

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
	const [loading, setLoading] = useState(false);
	const [msgModal, setmsgModal] = useState('');
	const [open, dialogAccept] = useState(false);
	const [personalize, dialogPersonalize] = useState(false);
	const [formData, setFormData] = useState<any>({});

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

	const onLoginUser = async ({ email, password }: FormData) => {
		setLoading(true);
		const resRedis = await sesionClient();

		if (resRedis.code === 0) {
			const resLogin = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			if (resLogin?.error === null) {
				const date = new Date();
				localStorage.setItem('sessionTime', date.toString());
				router.push(`dashboard`);
			} else {
				setmsgModal('Invalid username or password. Please try again.');
				setShowModal(true);
			}
		} else {
			setmsgModal('We are unable to process your request at this time');
			setLoading(false);
			setShowModal(true);
		}
	};

	return (
		<>
			<NavBar />

			<Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onLoginUser)}>
				<Typography variant="h3" sx={{ mb: 3 }}>
					Sign-in
				</Typography>
				<Grid container columns={1} spacing={2}>
					<Grid item xs={2}>
						<InputText name="email" control={control} optional />
						<InputPass name="password" control={control} additionalInfo />

						<Button
							variant="contained"
							type="submit"
							disabled={loading}
							fullWidth
						>
							{loading && <CircularProgress color="secondary" size={20} />}
							{!loading && t('buttons.accept')}
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Modals msgModal={msgModal} buttons={1} showModal={showModal}>
				<Button
					variant="contained"
					onClick={() => {
						setLoading(false);
						setShowModal(false);
					}}
				>
					{t('buttons.accept')}
				</Button>
			</Modals>
		</>
	);
}
