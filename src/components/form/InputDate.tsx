import { FC } from 'react';
import { FormControl, Typography, FormHelperText } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
interface DatePickerComponentProps {
  name: string
  error?: FieldError
  label: string
  format: string
  views: ('year' | 'month' | 'day')[]
  control: Control
  onChange?: (date: Date | null) => void
}

export const InputDate : FC<DatePickerComponentProps> = ({ name, error, label, format, views, control, onChange, ...rest }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth error={!!error} variant="outlined" sx={{ mb: 2 }}>
        <Typography color="custom.tertiary" className="bold">
            {label}
        </Typography>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker
              slotProps={{
                textField: {
                error: !!error,
              },
              }}
              {...field}
              {...rest}
              format={format}
              views={views}
            />
          )}
        />
        <FormHelperText sx={{ height: '16px' }} id={`${name}-helper-text`} error>
          {error && ( error.message )}
        </FormHelperText>
      </FormControl>
    </LocalizationProvider>


  );
};

export default InputDate;
