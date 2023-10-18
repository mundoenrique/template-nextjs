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

export default function InstallPWA() {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [openBar, setOpenBar] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [iOS, setIOS] = useState(false);
	useEffect(() => {
		setIOS(isIOS);
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setOpenBar(true);
		});
		if (isIOS && !(window as any).navigator.standalone) {
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
		setOpenBar(!openBar);
	};
	const toggleCloseDialog = () => {
		setOpenDialog(!openDialog);
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
						{iOS ? (
							<>
								<Typography>
									Para Instalar, hacer click en el botón <IosShare /> y luego seleccionar
									"agregar a pantalla de inicio"
								</Typography>
							</>
						) : (
							<>
								<Button variant="contained" onClick={intallPrompt}>
									Instalar
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
