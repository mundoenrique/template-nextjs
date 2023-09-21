import { NavMenuItems } from '@/interfaces';

export const improveList = (menuData: NavMenuItems) => {
	for (const item of menuData) {
		item.url = addUrl(item.title);
		if (item.children && item.children.length > 0) {
			improveList(item.children);
		}
	}
};

const addUrl = () => {};
