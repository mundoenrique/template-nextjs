'use client';
import { Modals } from '@/components/UI';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQRCode } from 'next-qrcode';
import { io } from 'socket.io-client';

let socket: any;

export default function Card() {
  const { SVG } = useQRCode();

  const [showModal, setShowModal] = useState(true);
  const [msgModal, setmsgModal] = useState('Escanear el codigo QR');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://g868630t-3000.brs.devtunnels.ms/novo/qr');

  useEffect(() => {
    const socketInit = async () => {
      await fetch('/api/socket');
      socket = io('', {
        path: '/api/my_socket',
      });

      socket.on('connect', () => {
        console.log('Connected', socket.id);
      });

      socket.on('msjServer', (data: any) => {
        console.log('msjServer', data);
      });
    };
    socketInit();
  }, []);

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
