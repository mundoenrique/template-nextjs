'use client';

import { Avatar, Box, Link, List, ListItem, Typography } from '@mui/material';
//Internal App

import { useTranslation } from '@/app/i18n/client';
import { MenuChild, NavMenuProps } from '@/interfaces';

import IconComponent from './Icon';

const desktopStyle = {
	display: 'flex',
	flexDirection: 'column',
	flexWrap: 'wrap',
	height: '250px',
	'& ul li': {
		p: 0,
	},
	'& h5': {
		fontWeight: '600',
	},
	'& .level-1': {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '20px',
		p: 0,

		pl: '60px',
	},
	'& .level-2': {
		py: '0px',
		fontSize: '16px',
		fontWeight: '400',
	},
	'& .level-2 li': {
		py: '0px',
	},
	'& .level-3': {
		pl: '12px',
	},
};

const responsiveStyle = {
	display: 'flex',
	flexDirection: 'column',
	flexWrap: 'no-wrap',

	'& ul li': {
		p: 0,
	},
	'& h5': {
		fontWeight: '600',
	},
	'& .level-1': {
		fontSize: '18px',
		fontWeight: '600',
		lineHeight: '20px',
		p: 0,

		pl: '60px',
	},
	'& .level-2': {
		py: '0px',
		fontSize: '16px',
		fontWeight: '400',
	},
	'& .level-2 li': {
		py: '0px',
	},
	'& .level-3': {
		pl: '12px',
	},
};

export default function NavMenu({
	menuList,
	desktop,
}: NavMenuProps): JSX.Element {
	const depthLevel = 0;
	const isDesktop = desktop;
	return (
		<Box id="Menu" sx={isDesktop ? desktopStyle : responsiveStyle}>
			{menuList.map((menuItem) => {
				return (
					<Box key={menuItem.title}>
						{menuItem.enable && (
							<ParentItem
								menuItem={menuItem}
								depthLevel={depthLevel}
							></ParentItem>
						)}
					</Box>
				);
			})}
		</Box>
	);
}

function ParentItem({ menuItem, depthLevel }: MenuChild): JSX.Element {
	const { t } = useTranslation();

	return (
		<>
			{depthLevel !== 0 ? (
				<ListItem
					sx={{
						display: 'block',
					}}
				>
					<Link href={menuItem.url}>{t(`menu.${menuItem.title}`)}</Link>
				</ListItem>
			) : (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ width: 60 }}>
						<Avatar sx={{ width: 44, height: 44 }}>
							<IconComponent iconName={menuItem.icon}></IconComponent>
						</Avatar>
					</Box>
					<Typography variant="h5">{t(`menu.${menuItem.title}`)}</Typography>
				</Box>
			)}
			{menuItem.hasOwnProperty('children') && (
				<ChildrenItem
					menuItem={menuItem}
					depthLevel={depthLevel}
				></ChildrenItem>
			)}
		</>
	);
}

function ChildrenItem({ menuItem, depthLevel }: MenuChild): JSX.Element {
	depthLevel = depthLevel + 1;

	return (
		<>
			{depthLevel === 1 ? (
				<>
					{menuItem.children.map((menuItem) => {
						return (
							<Box key={menuItem.title} sx={{ my: '8px' }}>
								<Box>
									<List
										className={`level-${depthLevel}`}
										sx={{
											display: 'block',
										}}
										key={menuItem.title}
									>
										<ParentItem
											menuItem={menuItem}
											depthLevel={depthLevel}
										></ParentItem>
									</List>
								</Box>
							</Box>
						);
					})}
				</>
			) : (
				<ListItem>
					<List
						className={`level-${depthLevel}`}
						sx={{
							display: 'block',
						}}
					>
						{menuItem.children.map((menuSubItem) => {
							return (
								<ParentItem
									menuItem={menuSubItem}
									key={menuSubItem.title}
									depthLevel={depthLevel}
								></ParentItem>
							);
						})}
					</List>
				</ListItem>
			)}
		</>
	);
}
