import * as Icons from '@mui/icons-material';

export type MenuItem = {
	title: string;
	children: Array<MenuItemChild>;
	icon: keyof typeof Icons;
	enable: boolean;
};

export interface MenuItemChild extends Omit<MenuItem, 'icon'> {
	title: string;
	children: Array<MenuItemChild>;
	url: string;
	enable: boolean;
}

export interface NavMenuProps {
	menuList: Array<MenuItem>;
	desktop: boolean;
}

export interface MenuChild {
	menuItem: MenuItemChild;
	depthLevel: number;
}
