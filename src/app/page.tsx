"use client"

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { Box, Button, CircularProgress, Grid, Toolbar, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputText from '../components/form/InputText';
import InputPass from '../components/form/InputPassword';
import Alert from '../components/ui/AlertDialog';
import logo from '../assets/images/logo.svg';
import { connectApi } from '../services/connect'
import { encrypt } from '../utils/security';


const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid Date format').required('This field is required'),
  password: yup.string().required('This field is required')
});

export default function Home() {
  const [msg, setMsg] = useState('')
  const [loading, setloading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    Cookies.remove('token')
    localStorage.clear()
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validationSchema),
  });

  const alertDialog = useRef<any>(null);

  const handleClick = (show:boolean) => {
    if (alertDialog.current) {
      setloading(false)
      alertDialog.current.handleClickShow(show);
    }
  };

  const onSubmit = async (dataLogin: any) => {
    setloading(true)
    const {email, password} = dataLogin
    const {data} = await connectApi.post('/login', { email, password })

    console.log('aui la respuetsa -> ', data)

    switch (data.code) {
      case 0:
        const {token, user} = data
        Cookies.set('token', token)
        user.id = encrypt(user.id)
        localStorage.setItem('session', JSON.stringify(user))
        router.push('/dashboard')
			  return
      default:
        setMsg(data.msg)
        handleClick(true)
			  return
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ height: '100vh' }}>
          <Toolbar className="toolbar-table">
            <Typography component="div" className="bold" color="primary" variant="h5">
              <Image src={logo} alt="logo" width="35" height="35"></Image> Untitled UI
            </Typography>
          </Toolbar>

          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: 'calc(100vh - 100px)',
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
              <Box sx={{ alignItems: 'left' }}>
                <Typography variant="h5" color="custom.tertiary" className="bold">
                  Welcome back
                </Typography>
                <Typography variant="body1" color="custom.tertiary" className="bold" mb={2}>
                  Welcome back! Please enter your details
                </Typography>
                 <form onSubmit={handleSubmit(onSubmit)}>
                  <InputText
                    name="email"
                    label='Email'
                    control={control}
                    error={errors.email as any}
                  />
                  <InputPass
                    name="password"
                    label='Password'
                    control={control}
                    error={errors.password as any}
                  />
                  <Button type='submit' fullWidth size="large" variant="contained" disabled={loading}>
                    {loading && <CircularProgress color='primary' size={20} />}
                    {!loading && 'Sign in'}
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>

          <Toolbar sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <Typography color="custom.tertiary" className="bold">
              © Untited UI 2023
            </Typography>
          </Toolbar>
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: 'secondary.main', display: { xs: 'none', md: 'flex', xl: 'flex' } }}
        >
          <Image src={logo} alt="logo" width="320" height="320"></Image>
        </Grid>
      </Grid>
      <Alert ref={alertDialog} msg={msg} icon={<InfoOutlinedIcon color='primary'/>} />
    </>
  );
}
