import React from 'react';

export interface DialogProps {
  title: string;
  maxWidth: any;
  msgDialog: React.ReactNode;
  buttonDialog: React.ReactNode;
  open?: boolean | undefined;
  position?: string;
}
