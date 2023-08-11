import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AppBar, Container, Toolbar } from '@mui/material';

export default function NavBar(): JSX.Element {
  const router = usePathname();
  const currentTenant = router.split('/')[1] || 'novo';

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Image src={`/images/${currentTenant}/img-logo-color.svg`} fill alt='Picture of the author' priority />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
