import Image from "next/image";
import { AppBar, Container, Toolbar } from "@mui/material";
//Internal App
import { NavBarProps } from "@/interfaces";

export default function NavBar({tenant}: NavBarProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src={`/images/${tenant}/img-logo-color.svg`}
            fill
            alt="Picture of the author"
            priority
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
