'use client';

import {
	Avatar,
	Box,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@mui/material';

import 'material-icons/iconfont/material-icons.css';
//Internal App
import { usePathname } from 'next/navigation';
import { validateTenant } from '@/utils';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { MenuParentItem } from '@/interfaces';

import IconComponent from './Icon';
/*

*/
const StyleMenu = {
	display: 'block',
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
		pt: '12px',
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

export default function Menu({ menuItems }): JSX.Element {
	const depthLevel = 0;
	return (
		<Box id="Menu" sx={StyleMenu}>
			{menuItems.map((el) => {
				return (
					<ParentItem
						item={el}
						key={el.title}
						depthLevel={depthLevel}
					></ParentItem>
				);
			})}
		</Box>
	);
}

function ParentItem({ item, depthLevel }: MenuParentItem): JSX.Element {
	const router = usePathname();
	const currentTenant = validateTenant(router.split('/')[1]);
	const { lang } = useLangStore();
	const { t } = useTranslation(lang, `${currentTenant}-general`);

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
				<Typography variant="h5">{t(`menu.${item.title}`)}</Typography>
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
							<Grid
								container
								spacing={0}
								key={menuItem.title}
								sx={{ my: '8px' }}
							>
								<Grid item xs="auto">
									<Box sx={{ width: 60 }}>
										<Avatar sx={{ width: 44, height: 44 }}>
											<IconComponent iconName={menuItem.icon}></IconComponent>
										</Avatar>
									</Box>
								</Grid>
								<Grid item xs>
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
								</Grid>
							</Grid>
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
