import { FC, useState } from 'react';
import { FormControl, MenuItem, Select, FormHelperText, Typography } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

interface SelectOption {
  label: string
  value: string
}

interface SelectComponentProps {
  name: string
  options: SelectOption[]
  error?: FieldError
  label: string
  control: Control
}

export const InputSelect: FC<SelectComponentProps> = ({ name, options, error, label, control, ...rest }: any) => {

  return (
      <FormControl fullWidth sx={{ mb: 2 }} error={!!error} variant="outlined">
        <Typography color="custom.tertiary" className="bold">
          {label}
        </Typography>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select {...field} {...rest}>
              <MenuItem disabled value="">
                <em>Select</em>
              </MenuItem>
              {options.map((option:SelectOption) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText sx={{ height: '16px' }} id={`${name}-helper-text`} error>
          {error && ( error.message )}
        </FormHelperText>
      </FormControl>
  );
};

export default InputSelect;
