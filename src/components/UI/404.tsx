'use client';

import { Button, Typography, Box } from '@mui/material';

interface Params {
  status: string;
  title: string;
  description: string;
  btnName: string;
}

export default function PageNotFound({ params }: { params: Params }) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <Box sx={{ maxWidth: '500px', width: '100%' }}>
        <Box
          sx={{
            height: '100px',
            position: 'absolute',
            top: 40,
            zIndex: -1,
          }}
        >
          <Typography
            sx={{
              fontSize: '270px',
              fontWeight: 'bold',
              textAlign: 'center',
              opacity: '0.15',
            }}
            variant='h1'
          >
            {params.status}
          </Typography>
        </Box>
        <Typography variant='h2' sx={{ mb: 3 }}>
          {params.title}
        </Typography>
        <Typography sx={{ mb: 3 }}>{params.description}</Typography>
        <Button variant='contained' onClick={() => window.history.back()} fullWidth>
          {params.btnName}
        </Button>
      </Box>
    </Box>
  );
}
