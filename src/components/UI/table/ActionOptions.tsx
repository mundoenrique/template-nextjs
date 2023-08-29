import React from 'react';
import IconButton from '@mui/material/IconButton';
import { SvgIconProps, Tooltip } from '@mui/material';
import { on } from 'events';

interface Props {
	field: string;
	label: string;
	icon: React.ReactElement<SvgIconProps>;
	action: number;
	onModal?: () => void;
	onRedirect?: () => void;
	onFunction: () => void;
}

const ActionOptions: React.FC<Props> = ({
	field,
	label,
	icon,
	action,
	onModal,
	onRedirect,
	onFunction,
}) => {
	const handleContinue = () => {
		if (action === 1 && onModal) {
			onModal();
		} else if (action === 2 && onRedirect) {
			onRedirect();
		} else {
			onFunction();
		}
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
