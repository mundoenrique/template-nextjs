"use client";

import Image from "next/image";
import { Button, Typography, Grid, Toolbar, Box, Card, CardContent } from "@mui/material";
import { useTranslation } from "@/app/i18n/client";
import { useLangStore } from '@/store/langStore'
import { useRouter } from "next/navigation";

export default function Dashboard({ params }: any) {

 const router = useRouter()

 const language = useLangStore((state: any) => state.lang)
 const { t } = useTranslation(language, `${params.tenant}-general`)

 return (
  <>
   <Grid container>
    <Grid item >
     <Toolbar className="toolbar-table">
      <Typography component="div" className="bold" color="primary" variant="h5">
       <Image
        src={`/images/${params.tenant}/img-logo-color.svg`}
        width={100}
        height={100}
        // fill={true}
        alt="Picture of the author"
        priority
       />
      </Typography>
     </Toolbar>
    </Grid>
   </Grid>

   <Box
    sx={{
     alignItems: 'center',
     display: 'flex',
     justifyContent: 'center',
    }}
   >
    <Box
     sx={{
      alignItems: 'center',
      alignContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: '32px',
      width: '520px',
     }}
    >

     <Grid direction="row" display="flex" gap={2} sx={{mb:5}}>
     
     <Card sx={{ minWidth: 275 }}>
      <CardContent>
       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       {t('titles.master-acount')}
       </Typography>
      </CardContent>
     </Card>

     <Card sx={{ minWidth: 275 }}>
      <CardContent>
       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       {t('titles.preferencial-acount')}
       </Typography>
      </CardContent>
     </Card>

     </Grid>

     <Button onClick={() => router.push(`/${params.tenant}/signin`) } type="submit" fullWidth size="large" variant="contained">
      {t('buttons.close')}
     </Button>
    </Box>
   </Box>
  </>
 );
}
