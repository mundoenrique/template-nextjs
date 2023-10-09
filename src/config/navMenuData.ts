'use client';

import { MenuItem } from '@/interfaces/NavMenu';

export const menuData: Array<MenuItem> = [
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
						children: [],
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
						children: [],
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
						children: [],
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

				enable: true,
				children: [],
			},
			{
				title: 'view_fixes',

				url: '/cards/viewfixes',
				enable: true,
				children: [],
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
				children: [],
			},
			{
				title: 'online_trasanctions',
				url: '/report/online_trasanctions',
				enable: true,
				children: [],
			},
			{
				title: 'account_status',
				url: '/report/account_status',
				enable: true,
				children: [],
			},
			{
				title: 'income_reports',
				url: '/report/income_reports',
				enable: true,
				children: [],
			},
			{
				title: 'closing_balance',
				url: '/report/closing_balance',
				enable: true,
				children: [],
			},
		],
	},
];
