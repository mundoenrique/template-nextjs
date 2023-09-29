'use client';
import { useState, useEffect } from 'react';
import {
	Avatar,
	Box,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
	Paper,
} from '@mui/material';
import { isDesktop } from 'react-device-detect';
//Internal App
import { usePathname } from 'next/navigation';
import { validateTenant } from '@/utils';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { MenuParentItem } from '@/interfaces';

import IconComponent from './Icon';

/*

*/
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

export default function NavMenu({ menuList }: MenuParentItem): JSX.Element {
	const depthLevel = 0;
	const [desktop, setDesktop] = useState(true);
	useEffect(() => {
		setDesktop(isDesktop);
	}, []);
	return (
		<Box id="Menu" sx={desktop ? desktopStyle : responsiveStyle}>
			{menuList.map((menuItem) => {
				return (
					<Box key={menuItem.title}>
						{menuItem.enable && (
							<ParentItem item={menuItem} depthLevel={depthLevel}></ParentItem>
						)}
					</Box>
				);
			})}
		</Box>
	);
}

function ParentItem({ item, depthLevel }: MenuParentItem): JSX.Element {
	const { t } = useTranslation();

	return (
		<>
			{depthLevel !== 0 ? (
				<ListItem
					sx={{
						display: 'block',
					}}
				>
					<Link href={item.url}>{t(`menu.${item.title}`)}</Link>
				</ListItem>
			) : (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ width: 60 }}>
						<Avatar sx={{ width: 44, height: 44 }}>
							<IconComponent iconName={item.icon}></IconComponent>
						</Avatar>
					</Box>
					<Typography variant="h5">{t(`menu.${item.title}`)}</Typography>
				</Box>
			)}
			{item.hasOwnProperty('children') && (
				<ChildrenItem item={item} depthLevel={depthLevel}></ChildrenItem>
			)}
		</>
	);
}

function ChildrenItem({ item, depthLevel }: MenuParentItem): JSX.Element {
	depthLevel = depthLevel + 1;

	return (
		<>
			{depthLevel === 1 ? (
				<>
					{item.children.map((menuItem) => {
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
											item={menuItem}
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
						{item.children.map((menuSubItem) => {
							return (
								<ParentItem
									item={menuSubItem}
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
