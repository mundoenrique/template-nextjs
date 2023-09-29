import React from 'react';
import IconButton from '@mui/material/IconButton';
import { SvgIconProps, Tooltip } from '@mui/material';
import { RowTable, ActionOption } from '@/interfaces';

const ActionOptions = ({ field, label, icon, action, onAction }: any) => {
	const handleContinue = () => {
		onAction(action);
	};

	return (
		<>
			<Tooltip title={label} placement="top">
				<IconButton aria-label={field} color="primary" onClick={handleContinue}>
					{icon}
				</IconButton>
			</Tooltip>
		</>
	);
};

export default ActionOptions;
