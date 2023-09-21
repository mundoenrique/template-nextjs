'use client';

import { NavMenuItems } from '@/interfaces/NavMenu';

const profile = [
	'manage_companies',
	'create_company',
	'manage_users',
	'create_user',
	'unnamed_emission',
	'create_unnamed_emission',
	'beneficiary_account',
	'view_fixes',
	'issued_cards',
	'online_trasaccions',
];

/*
const profile = {
	user:[create,delete]
}

const profile = {
	user:{create:enable, delete:diable}
}

*/

export const menuData: NavMenuItems = [
	{
		title: 'companies',

		children: [
			{
				title: 'manage_companies',
				url: '/companies',
				icon: 'HomeWorkOutlined',
				enable: false,
				children: [
					{
						title: 'create_company',
						url: '/companies/create',
						enable: false,
					},
				],
			},
		],
	},
	{
		title: 'users',
		children: [
			{
				title: 'manage_users',
				url: '/users',
				icon: 'PersonSearchOutlined',
				enable: false,
				children: [
					{
						title: 'create_user',
						url: '/users/create',
						enable: false,
					},
				],
			},
		],
	},
	{
		title: 'requests',
		children: [
			{
				title: 'unnamed_emission',
				url: '/unnamedemission',
				icon: 'FeaturedPlayListOutlined',
				enable: false,
				children: [
					{
						title: 'create_unnamed_emission',
						url: '/unnamedemission/create',
						enable: false,
					},
				],
			},
		],
	},
	{
		title: 'cards',
		enable: false,
		children: [
			{
				title: 'beneficiary_account',
				url: '/beneficiaryaccount',
				icon: 'AccountBalanceWalletOutlined',
				enable: false,
			},
			{
				title: 'view_fixes',
				icon: 'AppSettingsAltOutlined',
				url: '/viewfixes',
				enable: false,
			},
		],
	},
	{
		title: 'reports',
		enable: false,
		children: [
			{
				title: 'cards_emmited',
				url: '/report/viewfixes',
				enable: false,
			},
			{ title: 'online_trasanctions', url: '/report/viewfixes', enable: false },
		],
	},
	{
		title: 'Level 0',
		children: [
			{ title: 'Level 1a' },
			{
				title: 'Level 1b',
				children: [
					{ title: 'Level 2a' },
					{
						title: 'Level 2b',
						children: [
							{ title: 'Level 3a' },
							{ title: 'Level 3b' },
							{ title: 'Level 3c' },
						],
					},
					{ title: 'Level 2c' },
				],
			},
			{ title: 'Level 1c' },
		],
	},
];

const getNestedPath = (arr, name) => {
	for (let item of arr) {
		if (item.title === name) return `/${name}`;
		if (item.children) {
			const child = getNestedPath(item.children, name);
			if (child) return `/${item.title}${child}`;
		}
	}
};

const getIndex = (arr, name) => {
	const idx = null;
	for (let t of Object.entries(arr)) {
		if (t[1].title == name) {
			return t[0];
		}
	}
};

const parseArr = (arr, name) => {
	let toParse = getNestedPath(arr, name);
	let split = toParse.split('/');
	split.shift();
	split.unshift(getIndex(arr, split[0]));

	console.log(split);
};
