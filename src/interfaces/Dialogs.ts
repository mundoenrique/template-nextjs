import React from 'react';

export interface DialogProps {
  title: string;
  info1: React.ReactNode;
  info2: React.ReactElement<any, any> | string;
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | false;
  buttonActions1: React.ReactElement<any, any> | string;
  buttonActions2: React.ReactElement<any, any> | string;
  children?: React.ReactNode;
  open?: boolean | undefined;
  params?: {
    tenant: string;
  };
}
