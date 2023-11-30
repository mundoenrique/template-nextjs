import React from 'react';

export interface ModalProps {
  buttons?: 1 | 2;
  children: React.ReactNode;
  msgModal: string | React.ReactNode;
  widthOfModal?: number;
  showModal?: boolean | undefined;
}
