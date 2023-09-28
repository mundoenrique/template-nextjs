'use client';

import React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
//Internal app
import { DialogProps } from '@/interfaces'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dialogs({
  title,
  info1,
  info2,
  maxWidth,
  children,
  open = true,
  buttonActions1,
  buttonActions2
}: DialogProps): JSX.Element {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="dialog-accept-cookies"
      sx={{ m: 2 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-accept-cookies">
          {info1}
        </DialogContentText>
        <DialogContentText sx={{ mt: 1 }} id="dialog-accept-cookies">
          {info2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttonActions1}
      </DialogActions>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {buttonActions2}
      </DialogActions>
    </Dialog>
  );
}
