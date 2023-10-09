import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ExitToAppOutlined, MenuOutlined } from '@mui/icons-material';
//Internal app
import { useSession, signOut } from 'next-auth/react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Drawer,
	Popover,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import { menuData } from '@/config';
import { getImages } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { NavMenu } from '@/components/UI';

export default function NavBar(): JSX.Element {
	const { data: session } = useSession();
	const router = usePathname();
	const currentTenant = router.split('/')[1] || 'novo';
	const matches = useMediaQuery('(max-width:100px)');

	const [sideMenu, setSideMenu] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const myRef = useRef(null);
	useEffect(() => {
		setAnchorEl(myRef.current);
	}, []);

	const desktop = (
		<>
			<Toolbar disableGutters>
				<Image
					src={getImages(currentTenant, 'img-logo-color.svg')}
					alt="Picture of the author"
					priority
					style={{
						width: '100%',
						height: '70px',
					}}
				/>
				{session && (
					<IconButton
						onClick={() => {
							setSideMenu(true);
						}}
						color="primary"
					>
						<MenuOutlined color="primary" />
					</IconButton>
				)}
			</Toolbar>
			{session && (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="h6" color="primary" component="div">
						{` Bienvenido ${session.user?.name}`}
					</Typography>
					<IconButton color="primary">
						<ExitToAppOutlined color="primary" />
					</IconButton>
				</Box>
			)}
		</>
	);

	const responsive = (
		<>
			<Toolbar disableGutters>
				<Image
					src={getImages(currentTenant, 'img-logo-color.svg')}
					alt="Picture of the author"
					priority
					style={{
						width: '100%',
						height: '70px',
					}}
				/>
			</Toolbar>
			{session && (
				<IconButton
					color="primary"
					onClick={() => {
						setSideMenu(true);
					}}
				>
					<MenuOutlined color="primary" />
				</IconButton>
			)}
		</>
	);

	return (
		<AppBar position="static" id="navbar" ref={myRef}>
			<Box
				sx={{
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'row',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{matches ? responsive : desktop}
			</Box>
			{matches ? (
				<Drawer
					anchor={'right'}
					open={sideMenu}
					sx={{ width: 300 }}
					onClose={() => {
						setSideMenu(false);
					}}
				>
					<Box sx={{ width: 300 }}>
						<NavMenu menuList={menuData} desktop={false}></NavMenu>
					</Box>
				</Drawer>
			) : (
				<Popover
					anchorEl={anchorEl}
					open={sideMenu}
					onClose={() => {
						setSideMenu(false);
					}}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Box sx={{ minWidth: '900px', width: '90vw', margin: '16px' }}>
						<NavMenu menuList={menuData} desktop={true}></NavMenu>
					</Box>
				</Popover>
			)}
		</AppBar>
	);
}
