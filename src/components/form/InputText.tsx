import { FC } from 'react';
import { Control, FieldError, useController } from 'react-hook-form';
import { OutlinedInput, FormHelperText, Typography, FormControl } from '@mui/material';

interface TextField  {
  name: string;
  label: string;
  control: Control;
  error?: FieldError;
}

const TextFieldComponent: FC<TextField> = ({ name, label, control, error, ...rest }) => {

  const { field: { ref, ...inputProps } } = useController({ name, control });

  return (
    <FormControl fullWidth error={!!error} variant="outlined" sx={{ mb: 2 }}>
      <Typography color="custom.tertiary" className="bold">
        {label}
      </Typography>
      <OutlinedInput
        fullWidth
        {...inputProps}
        {...rest}
        inputRef={ref}
        aria-describedby={`${name}-helper-text`}
      />
      <FormHelperText sx={{ height: '16px' }} id={`${name}-helper-text`} error>
        {error && ( error.message )}
      </FormHelperText>
    </FormControl>
  );
};

export default TextFieldComponent;
