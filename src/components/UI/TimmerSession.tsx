'use client';

import { useEffect, useRef, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import { Modals } from '@/components/UI';
import { Button } from "@mui/material";
import { useTranslation } from "@/app/i18n/client";

export default function TimmerSession(tenant:any) {

	const { update } = useSession();
	const { t } = useTranslation(`${tenant}-general`);
	const [showModal, setShowModal] = useState(false);
	const ref: any = useRef(null);

	const viewSesion = async () => {
		const session = await getSession()
		if (session === null) {
			signOut()
		} else {
			update()
		}
	}

	useEffect(() => {

		let intervalSession:any

		const timerSession = () => {
			if (!localStorage.sessionTime) {
				signOut()
			}

			const date = new Date(localStorage.sessionTime).getTime()
			const now = new Date().getTime()
			const time = Math.trunc(Math.abs((date - now) / 1000))
			const timeRest = parseInt(process.env.NEXT_PUBLIC_SESS_EXPIRATION || '300') - time
			time.toString() === '1' && ref.current.click();
			if (timeRest === 45) {
				setShowModal(true)
			} else if (timeRest <= 0) {
				clearInterval(intervalSession)
				localStorage.removeItem('sessionTime')
				signOut()
			}
		}

		intervalSession = setInterval(timerSession,1000)
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Button sx={{ display:'none' }} ref={ref} onClick={() => viewSesion()} />

			<Modals msgModal={`Your session is about to expire. Do you want to continue using your App?`} showModal={showModal}>
      	<Button variant='contained' onClick={() => setShowModal(false)}>
          {t('buttons.accept')}
      	</Button>
			</Modals>
		</>
  );
};
