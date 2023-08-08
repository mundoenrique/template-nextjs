"use client";

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, Stack } from "@mui/material";
import { useCookiesStore } from "@/store/cookiesStore";
import Cookies from 'js-cookie'

const style = {
  position: 'absolute' as 'absolute',
  top: '74%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
};

export default function Acceptcookies({ params }: any) {
  // console.log('params: ', params)
  const [open, showModal] = useState(false);
  // const [openPersonalize, personalizeCookies] = useState(false);
  const { onlyNecessary, acceptAll, removeCookies } = useCookiesStore();

  // const example = useCookiesStore((state: any) => state);
  // console.log('example: ', example)

  useEffect(() => {
    const cookies = Cookies.get()
    const nc = (cookies.necessaryCookies) ? false : true
    showModal(nc)
  }, [])

  return (
     <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Aviso de privacidad
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Utilizamos cookies propias y de terceros para obtener datos estadísticos de la navegación de nuestros usuarios y mejorar nuestros servicios. Si acepta, consideramos que acepta su uso. Puede cambiar la configuración u obtener más información <a target='_blank' href={'/'}>aquí</a >
          </Typography>
          <Stack spacing={4} sx={{ mt: 2 }} direction="row">
            <Button variant="contained" onClick={() => acceptAll('accepted')}>Aceptar todas las cookies</Button>
            <Button variant="contained" onClick={() => onlyNecessary('accepted')}>Sólo cookies necesarias</Button>
            <Button sx={{ maxWidth: 396 }} fullWidth size="large" variant="outlined">Personalizar cookies</Button>
            {/* onClick={() => personalizeCookies(true)} */}
          </Stack>
        </Box>
      </Modal>

      /* <Modal open={openPersonalize} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Configuración de cookies
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Cuando visita cualquiera de nuestros sitios web, puede almacenar o recuperar información en su navegador, principalmente en forma de cookies. Esta información puede ser sobre usted, sus preferencias o su dispositivo y se usa principalmente para hacer que el sitio funcione como usted espera. La información generalmente no lo identifica directamente, pero puede brindarle una experiencia web más personalizada. Como respetamos su derecho a la privacidad, puede optar por no permitir algunos tipos de cookies. Haga clic en los encabezados de las diferentes categorías para obtener más información y administrar sus preferencias. Tenga en cuenta que el bloqueo de algunos tipos de cookies puede afectar su experiencia en el sitio y los servicios que podemos ofrecer.
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }} direction="row">
            <Button variant="contained">Confirmar</Button>
            <Button variant="outlined">Aceptar todas</Button>
            <Button variant="outlined" onClick={() => personalizeCookies(false)}>Cancelar</Button>
          </Stack>
        </Box>
      </Modal> */
  );
}
