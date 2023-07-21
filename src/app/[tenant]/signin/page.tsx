'use client';

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Grid, Button } from '@mui/material';
//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { getSchema } from '@/config/validationConfig';
import { InputDatePicker, InputPass, InputSelect, InputText, NavBar, InputRadio } from '@/components/UI';

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
      programs: '',
      initialDate: '',
      roles: '',
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

  const RadioOptions = [
    {
      text: t('form.roles_admin_label'),
      value: 'A',
    },
    {
      text: t('form.roles_operator_label'),
      value: 'O',
    },
  ];

  const onSubmit = async (data: any) => {
    data.initialDate = dayjs(data.initialDate).format('DD/MM/YYYY');
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
            <InputPass name='password' control={control} tenant={params.tenant} additionalInfo />
            <InputSelect name='programs' control={control} tenant={params.tenant} options={selectOptions} />
            <InputDatePicker name='initialDate' control={control} tenant={params.tenant} />
            <InputRadio
              name='roles'
              label='Seleciona el tipo de usuario'
              control={control}
              tenant={params.tenant}
              options={RadioOptions}
            />
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
