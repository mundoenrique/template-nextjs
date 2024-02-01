'use client';
import { Modals } from '@/components/UI';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';

export default function Card() {
  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState(true);
  const [msgModal, setmsgModal] = useState('Escanear el codigo QR');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://0e04-38-56-214-167.ngrok-free.app/novo/qr');

  return (
    <>
      <Box sx={{ m: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Card</h1>
            <h6>Generar codigo qr</h6>
          </Grid>
        </Grid>
      </Box>
      <Modals msgModal={msgModal} buttons={1} showModal={showModal}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SVG
              text={url}
              options={{
                margin: 2,
                width: 200,
              }}
            />
          </Grid>
        </Grid>
      </Modals>
    </>
  );
}
