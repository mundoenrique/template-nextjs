import React from 'react';

export interface ModalProps {
  buttons?: 1 | 2;
  children: React.ReactNode;
  msgModal: any;
  widthOfModal?: number;
  showModal?: boolean | undefined;
}
