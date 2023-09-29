'use client';

import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
//Internal app
import { DialogProps } from '@/interfaces';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Dialogs({
  title,
  maxWidth,
  msgDialog,
  buttonDialog,
  open = true,
  position,
}: DialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='dialog-accept-cookies'
      sx={{
        '& .MuiDialog-container': {
          alignItems: position ? 'flex-end' : 'center',
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{msgDialog}</DialogContent>
      <DialogActions>{buttonDialog}</DialogActions>
    </Dialog>
  );
}
