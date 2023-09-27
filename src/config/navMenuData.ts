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
		icon: 'HomeWorkOutlined',
		enable: true,
		children: [
			{
				title: 'manage_companies',
				url: '/companies',
				enable: true,
				children: [
					{
						title: 'create_company',
						url: '/companies/create',
						enable: true,
					},
				],
			},
		],
	},
	{
		title: 'users',
		icon: 'PersonSearchOutlined',
		enable: true,
		children: [
			{
				title: 'manage_users',
				url: '/users',
				enable: true,
				children: [
					{
						title: 'create_user',
						url: '/users/create',
						enable: true,
					},
				],
			},
		],
	},
	{
		title: 'requests',
		icon: 'FeaturedPlayListOutlined',
		enable: true,
		children: [
			{
				title: 'unnamed_emission',
				url: '/unnamedemission',
				enable: true,
				children: [
					{
						title: 'create_unnamed_emission',
						url: '/unnamedemission/create',
						enable: true,
					},
				],
			},
		],
	},
	{
		title: 'cards',
		icon: 'CreditCardOutlined',
		enable: true,
		children: [
			{
				title: 'beneficiary_account',
				url: '/cards/beneficiaryaccount',
				icon: 'AccountBalanceWalletOutlined',
				enable: true,
			},
			{
				title: 'view_fixes',
				icon: 'AppSettingsAltOutlined',
				url: '/cards/viewfixes',
				enable: true,
			},
		],
	},
	{
		title: 'reports',
		icon: 'AssessmentOutlined',
		enable: true,
		children: [
			{
				title: 'cards_emmited',
				url: '/report/cards_emmited',
				enable: true,
			},
			{
				title: 'online_trasanctions',
				url: '/report/online_trasanctions',
				enable: true,
			},
			{ title: 'account_status', url: '/report/account_status', enable: true },
			{ title: 'income_reports', url: '/report/income_reports', enable: true },
			{
				title: 'closing_balance',
				url: '/report/closing_balance',
				enable: true,
			},
		],
	},
	/*{
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
	},*/
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
