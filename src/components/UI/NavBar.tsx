import Image from 'next/image';
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export default function NavBar(): JSX.Element {

	const { data: session } = useSession()
  const router = usePathname();
  const currentTenant = router.split('/')[1] || 'novo';

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ textAlign:'center'}}>
        <Toolbar disableGutters>
					<Image src={`/images/${currentTenant}/img-logo-color.svg`} fill alt='Picture of the author' priority />
				</Toolbar>
				<Typography variant="h6" color="primary" component="div">
         { session ? `Bienvenido ${session?.user?.name}` : ''}
        </Typography>
      </Container>
    </AppBar>
  );
}
