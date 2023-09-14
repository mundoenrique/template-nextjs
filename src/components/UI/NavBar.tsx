import Image from 'next/image';
import { useSession, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';
import { AppBar, Container, Toolbar, Typography, IconButton } from '@mui/material';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

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
				{
					session && ( <>
						<Typography variant="h6" color="primary" component="div">
							{` Bienvenido ${session.user?.name}`}
        		</Typography>
						<IconButton onClick={() => signOut()} color="primary">
							<ExitToAppOutlinedIcon color='primary' />
						</IconButton>
				 		</>
					)
				}
      </Container>
    </AppBar>
  );
}
