import { FC } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { FormControl, FormControlLabel, FormHelperText, RadioGroup, Typography, RadioGroupProps } from '@mui/material';
import Radio from '@mui/material/Radio';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupComponentProps {
  name: string;
  label: string;
  options: RadioOption[];
  error?: FieldError;
  control: Control
}

export const InputRadio:FC<RadioGroupComponentProps> = ({ name, label, options, error, control, ...rest }: any) => {

  return (
    <FormControl fullWidth error={!!error} variant="outlined" sx={{ mb: 2 }}>
      <Typography color="custom.tertiary" className="bold">
      {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" {...field} {...rest}>
            {options.map((option:RadioOption) => (
              <FormControlLabel
                key={option.value}
                control={<Radio />}
                label={option.label}
                value={option.value}
                sx={{ color: 'custom.tertiary'}}
              />
            ))}
          </RadioGroup>
        )}
      />
      <FormHelperText sx={{ height: '16px' }} id={`${name}-helper-text`} error>
        {error && ( error.message )}
      </FormHelperText>
    </FormControl>
  );
};

export default InputRadio;
