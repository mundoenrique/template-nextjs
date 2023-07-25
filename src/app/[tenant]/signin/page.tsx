"use client";

import { useRouter } from "next/navigation";
import { Button, Box, Typography, Grid } from "@mui/material";
//Internal App
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";
import { Buttons, NavBar } from "@/app/components/UI";
import { log_message } from "@/utils";

export default function Signin({ params }: any) {

  log_message('Accede a la pagin a SIG-IN', 'nameUser')
  const router = useRouter();
  const language = useLangStore((state: any) => state.lang);
  const { t } = useTranslation(language, `${params.tenant}-general`);

  const buttonsView = [
    {
      type: "handle",
      label: "Variant 'Text'",
      variant: "text",
    },
    {
      type: "handle",
      label: "Variant 'Outlined'",
      variant: "outlined",
    },
    {
      type: "submit",
      label: "Variant 'Contained'",
    },
  ];

  return (
    <>
      <NavBar tenant={params.tenant} />

      <Box sx={{ m: "auto", maxWidth: 700, width: "100%" }}>
        <Button
          onClick={() => router.push(`/${params.tenant}/dashboard`)}
          fullWidth
          size="large"
          variant="contained"
        >
          {t("buttons.accept")}
        </Button>
      </Box>
      <Box sx={{ m: 5 }}>
        <Typography variant="h3">Botones</Typography>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={4}>
            <Buttons buttons={buttonsView} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
