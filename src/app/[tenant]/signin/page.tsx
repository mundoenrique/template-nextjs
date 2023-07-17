"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Grid } from "@mui/material";
//Internal App
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";
import { getSchema } from "@/config/validationConfig";
import {
  Buttons,
  InputPass,
  InputSelect,
  InputText,
  NavBar,
} from "@/components/UI";

export default function Signin({ params }: any) {
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${params.tenant}-general`);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(getSchema),
  });

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

  const buttonSubmit = [
    {
      type: "submit",
      label: t("buttons.accept"),
      fullWidth: true,
    },
  ];

  const selectOptions = [
    {
      value: "1",
      text: "option 1",
    },
    {
      value: "2",
      text: "option 2",
    },
  ];

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <NavBar />

      <Box sx={{ m: 5 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Componentes
        </Typography>
        <Grid container columns={3} spacing={2}>
          <Grid item xs={2}>
            <Buttons buttons={buttonsView} />
          </Grid>
          <Grid item xs={2}>
            <InputText name="email" control={control} tenant={params.tenant} />
            <InputSelect
              name="select"
              control={control}
              tenant={params.tenant}
              options={selectOptions}
            />
            <InputPass
              name="password"
              control={control}
              tenant={params.tenant}
              additionalInfo
            />
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ m: "auto", maxWidth: 700, width: "100%" }}>
              <Buttons buttons={buttonSubmit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
