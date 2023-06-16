import { FC, useState } from 'react';
import { Control, FieldError, useController } from 'react-hook-form';
import { FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface TextField  {
  name: string;
  label: string;
  control: Control;
  error?: FieldError;
}

const InputPassword : FC<TextField> = ({ name, label, control, error, ...rest }) => {

  const { field: { ref, ...inputProps } } = useController({ name, control });
  const [showPassword, setShowPass] = useState(false);

  const changeShowPass = () => {
    setShowPass(!showPassword);
  };

  return (
    <FormControl fullWidth error={!!error} variant="outlined" sx={{ mb: 2 }}>
      <Typography color="custom.tertiary" className="bold">
        {label}
      </Typography>
      <OutlinedInput
        id={name}
        fullWidth
        {...inputProps}
        {...rest}
        inputRef={ref}
        aria-describedby={`${name}-helper-text`}
        type={showPassword ? 'text' : 'password'}
        autoComplete="off"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={changeShowPass} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText sx={{ height: '16px' }} id={`${name}-helper-text`} error>
        {error && ( error.message )}
      </FormHelperText>
    </FormControl>
  );
};

export default InputPassword;
