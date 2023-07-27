'use client';

import { Modal, Box, Avatar, Typography } from '@mui/material';
//Internal app
import { ModalProps } from '@/interfaces';

export default function Modals({
  msgModal,
  buttons = 1,
  widthOfModal = 430,
  children,
  showModal = true,
}: ModalProps): JSX.Element {
  return (
    <Modal open={showModal}>
      <Box
        sx={{
          maxWidth: { xs: 'max-content', sm: `${widthOfModal}px` },
          px: { xs: 2, sm: 3 },
        }}
        className='container-modal'
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Avatar>i</Avatar>
        </Box>
        <Box sx={{ maxHeight: { xs: 260, sm: 330 } }} className='modal-text'>
          {msgModal}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: buttons > 1 ? 'space-between' : 'end',
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
