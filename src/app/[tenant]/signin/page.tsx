"use client";

import Image from "next/image";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "@mui/system";
import { useRouter } from "next/navigation";

export default function Signin({ params }: any) {

 const router = useRouter()
  
 const [lang, setLang] = useState('es')

  const { t } = useTranslation(lang, `${params.tenant}-signin`)
  
  const changeLanguage = (lang:string) => {
   setLang(lang)
  }

  return (
    <>
      <Typography>Cliente {params.tenant}</Typography>

      <Image
        src={`/images/${params.tenant}/img-logo-color.svg`}
        width={100}
        height={100}
        // fill={true}
        alt="Picture of the author"
        priority
      />
      <Button type="submit" fullWidth size="large" variant="contained">
        {t('buttons.accept')}
      </Button>
      
      <Container sx={{mt: 2}}>
       <Button onClick={() => changeLanguage('en')} size="large" variant="contained">
         English
       </Button>

       <Button onClick={() => changeLanguage('es')} size="large" variant="contained">
         Español
       </Button>
      </Container>
    </>
  );
}
