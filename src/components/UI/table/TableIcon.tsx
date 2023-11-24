import React, { forwardRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { IconProps } from '@/interfaces';

const IconTable = forwardRef(({ label, icon, action, handleFunction }: IconProps, ref) => {
  const handleContinue = () => {
    switch (action) {
      case 1:
        if (handleFunction) handleFunction();
        break;
      default:
        console.log('Open modal');
        break;
    }
  };
  return (
    <Tooltip title={label} placement="top" ref={ref}>
      <IconButton onClick={handleContinue}>{icon}</IconButton>
    </Tooltip>
  );
});

export default IconTable;
