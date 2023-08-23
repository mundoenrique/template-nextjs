'use client';

import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation'
//Internal App
import { log_message } from "@/utils";
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validationConfig';
import {
	InputPass,
	InputText,
	NavBar,
} from '@/components/UI';

type FormData = {
	email: string,
	password: string
}

export default function LoginPage({ params }: any) {

	const { data: session, status } = useSession()
	const router = useRouter()

	log_message('info','Accede a la pagin a SIG-IN')
	const { lang } = useLangStore();
	const { t } = useTranslation(lang, `${params.tenant}-general`);
	const schema = getSchema([
		'email',
		'password'
	]);

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: yupResolver(schema),
	});

	const onLoginUser = async ({ email, password }: FormData) => {
		let nuevo = await signIn('credentials', { redirect: false, email, password })

		if (nuevo?.error === null) {
			router.push(`dashboard`)
		}

	}

	return (
		<>
			Hi {JSON.stringify(session)} estado { status }!
			<NavBar />

			<Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onLoginUser)}>
					Sign-in
				<Typography variant="h3" sx={{ mb: 3 }}>
				</Typography>
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
		</>
	);
}
