import React from 'react';

export interface DialogProps {
  title: string;
  info1: any;
  info2: any;
  maxWidth: any;
  buttonActions1: any;
  buttonActions2: any;
  children?: React.ReactNode;
  open?: boolean | undefined;
  params?: any;
}
