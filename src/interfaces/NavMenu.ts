export interface NavMenu {
	title: string;
	children: NavMenuChild[];
}

export interface NavMenuChild {
	title: string;
	url?: string;
	icon?: string;
	children: NavMenuChild[];
}

export interface MenuParentItem {
	item: NavMenu | NavMenuChild;
	depthLevel: number;
}
export interface menuList {
	item: NavMenu | NavMenuChild;
	depthLevel: number;
}
export interface NavMenuItems extends Array<NavMenu> {}
