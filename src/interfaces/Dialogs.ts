import React from 'react';

export interface DialogProps {
  title: string;
  maxWidth: any;
  msgDialog: React.ReactNode;
  buttonDialog: React.ReactNode;
  position?: string;
  children?: React.ReactNode;
  open?: boolean | undefined;
  params?: any;
}
