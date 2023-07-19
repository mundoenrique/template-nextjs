'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';
//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validationConfig';
import { InputDatePicker, InputPass, InputSelect, InputText, NavBar } from '@/components/UI';

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
      email: '',
      password: '',
    },
    resolver: yupResolver(getSchema),
  });

  const selectOptions = [
    {
      value: '1',
      text: 'option 1',
    },
    {
      value: '2',
      text: 'option 2',
    },
  ];

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <NavBar />

      <Box sx={{ m: 5 }} component='form' onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h3' sx={{ mb: 3 }}>
          Componentes
        </Typography>
        <Grid container columns={3} spacing={2}>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='text' type='submit'>
              Variant `Text`
            </Button>
            <Button variant='outlined' type='submit'>
              Variant `Outlined`
            </Button>
            <Button variant='contained' type='submit'>
              Variant `Contained`
            </Button>
          </Grid>
          <Grid item xs={2}>
            <InputText name='email' control={control} tenant={params.tenant} />
            <InputSelect name='select' control={control} tenant={params.tenant} options={selectOptions} />
            <InputPass name='password' control={control} tenant={params.tenant} additionalInfo />
            <InputDatePicker name='password' control={control} tenant={params.tenant} />
          </Grid>
          <Grid item xs={1}>
            <Box sx={{ m: 'auto', maxWidth: 700, width: '100%' }}>
              <Button variant='contained' type='submit' fullWidth>
                {t('buttons.accept')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
