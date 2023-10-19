'use client';
import { useEffect, useState } from 'react';
import { isIOS } from 'react-device-detect';

import {
	Button,
	Slide,
	IconButton,
	Stack,
	Paper,
	Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import IosShare from '@mui/icons-material/IosShare';

import { useTranslation } from '@/app/i18n/client';
import { Trans } from 'react-i18next';

export default function InstallPWA() {
	const { t } = useTranslation();

	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [iOSDevice, setIOSDevice] = useState<boolean>(false);
	const [openBar, setOpenBar] = useState<boolean>(false);

	useEffect(() => {
		setIOSDevice(isIOS);
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setOpenBar(true);
		});
		if (iOSDevice && !(window as any).navigator.standalone) {
			setOpenBar(true);
		}
	}, []);

	const intallPrompt = async () => {
		if (!deferredPrompt) {
			return;
		}
		await deferredPrompt.prompt();
		setDeferredPrompt(null);
		setOpenBar(false);
	};

	const toggleCloseBar = () => {
		setOpenBar(false);
	};

	return (
		<>
			<Slide mountOnEnter unmountOnExit direction="up" in={openBar}>
				<Paper
					elevation={0}
					square
					variant="outlined"
					sx={{
						bottom: 0,
						position: 'absolute',
						height: 80,
						zIndex: 99999,
						width: '100%',
						display: 'flex',
						paddingX: '8px',
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{
							width: '100%',
						}}
					>
						{iOSDevice ? (
							<>
								<Typography>
									<Trans
										i18nKey="pwaInstallDialog"
										components={{ icon: <IosShare /> }}
									/>
								</Typography>
								<IconButton
									size="large"
									onClick={toggleCloseBar}
									color="inherit"
								>
									<CloseIcon />
								</IconButton>
							</>
						) : (
							<>
								<Button variant="contained" onClick={intallPrompt}>
									{t('pwaInstallButton')}
								</Button>

								<IconButton
									size="large"
									onClick={toggleCloseBar}
									color="inherit"
								>
									<CloseIcon />
								</IconButton>
							</>
						)}
					</Stack>
				</Paper>
			</Slide>
		</>
	);
}
