/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { IconButton, SvgIconProps, Tooltip } from '@mui/material';

type IconProps = {
	label: string;
	icon: React.ReactElement<SvgIconProps>;
	action?: number;
	handleFunction?: () => void;
};

const IconTable = forwardRef(
	({ label, icon, action, handleFunction }: IconProps, ref) => {
		const handleContinue = () => {
			switch (action) {
				case 1:
					console.log('Ejecutar funcion');
					if (handleFunction) handleFunction();
					break;
				default:
					console.log('Abrir modal');
					break;
			}
		};
		return (
			<>
				<Tooltip title={label} placement="top" ref={ref}>
					<IconButton onClick={handleContinue}>{icon}</IconButton>
				</Tooltip>
			</>
		);
	}
);

export default IconTable;
