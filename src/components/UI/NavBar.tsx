import Image from 'next/image';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
//Internal app
import { getImages } from '@/utils';
import { useTenantStore } from '@/store';
import { useSession, signOut } from 'next-auth/react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

export default function NavBar(): JSX.Element {
  const { data: session } = useSession();
  const { tenant } = useTenantStore();

  return (
    <AppBar position='static'>
      <Box sx={{ textAlign: 'center' }}>
        <Toolbar disableGutters>
          <Image src={getImages(tenant, 'img-logo-color.svg')} fill alt='Picture of the author' priority />
        </Toolbar>
        {session && (
          <>
            <Typography variant='h6' color='primary' component='div'>
              {` Bienvenido ${session.user?.name}`}
            </Typography>
            <IconButton onClick={() => signOut()} color='primary'>
              <ExitToAppOutlinedIcon color='primary' />
            </IconButton>
          </>
        )}
      </Box>
    </AppBar>
  );
}
