"use client";

import { Box, Grid, Typography } from "@mui/material";
//Internal App
import { Buttons } from "@/app/components/UI";
import NavBar from "@/app/components/UI/NavBar";

export default function UI({ params }: any) {
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
