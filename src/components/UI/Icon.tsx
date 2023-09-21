'use client';

import * as Icons from '@mui/icons-material';

export type IconNames = keyof typeof Icons;
export type IconProps = {
	iconName: IconNames;
};

export default function IconComponent({ iconName }: IconProps): JSX.Element {
	const Icon = Icons[iconName];

	return Icon ? <Icon /> : <></>;
}
