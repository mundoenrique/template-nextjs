'use client';

import { Button } from '@mui/material';
import connectApi from '@/services/connectApi';
import { useEffect, useState } from 'react';
import {
	InputSwitch,
	Dialogs
} from '@/components/UI';
import { useTranslation } from '@/app/i18n/client';

type resData = {
    code: number;
    msg: string;
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

export default function Cookies({ params }: any) {

	const { t } = useTranslation();

	const [open, dialogAccept] = useState(false);
	const [personalize, dialogPersonalize] = useState(false);

	const getCookiesList = async () => {
		const res: resData = await connectApi.get('cookies');

		if (res.msg != 'accepted') {
			dialogAccept(true)
		}

	}

	const setCookies = async (options: any, type: number) => {
		const response = await fetch(process.env.NEXT_PUBLIC_PATH_URL + '/api/cookies', {
			method: 'POST',
			body: JSON.stringify({options, type})
		})
		const data = await response.json()
		const value = (data.code === 0) ? false : true
		type === 1 ? dialogAccept(value) : dialogPersonalize(value)
	}

	useEffect(() => {
    getCookiesList()
	}, []);

	return (
		<>
				<Dialogs
					open={open}
					position='end'
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
						options={cookiesList}
					/>
				</Dialogs>
      </>
	)

}
