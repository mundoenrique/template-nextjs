import Link from 'next/link';
import { Button, CircularProgress, Typography } from '@mui/material';
//Internal app
import { ButtonProps, TypeButtonProps } from '@/interfaces';

export default function ButtonType({
  variant = 'contained',
  type,
  onClick,
  disabled,
  label,
  isLoading,
  form,
  url,
  fullWidth,
  icon,
}: ButtonProps) {
  const typeButton: TypeButtonProps = {
    handle: (
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        fullWidth={fullWidth}>
        {icon && (
          <Typography
            component='span'
            variant='h3'
            sx={{ color: 'primary.main', fontWeight: 700, mb: 0, pr: 1 }}>
            <i className={`${icon}`}></i>
          </Typography>
        )}
        {label}
      </Button>
    ),
    submit: (
      <Button
        form={form}
        type='submit'
        variant='contained'
        onClick={onClick}
        disabled={disabled || isLoading}
        fullWidth={fullWidth}>
        {isLoading ? <CircularProgress size={20} /> : label}
      </Button>
    ),
    reset: (
      <Button
        variant={variant}
        onClick={onClick}
        type='reset'
        disabled={disabled}
        fullWidth={fullWidth}>
        {label}
      </Button>
    ),
    redirect: (
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        component={Link}
        href={url || '/'}
        fullWidth={fullWidth}>
        {icon && (
          <Typography
            component='span'
            variant='h3'
            sx={{ color: 'primary.main', fontWeight: 700, mb: 0, pr: 1 }}>
            <i className={`${icon}`}></i>
          </Typography>
        )}
        {label}
      </Button>
    ),
  };

  return typeButton[`${type}`];
}
