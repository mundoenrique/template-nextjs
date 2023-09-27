'use client';

import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormLabel, FormHelperText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';
import { useTranslation } from '@/app/i18n/client';

function InputCheckMUI(props: InputCheckProps): JSX.Element {
  const theme = useTheme();
  const { name, label, labelError, onChange, onClick, checked, value, error, disabled } = props;
  const { t } = useTranslation();
  const textLabel = t(`form.${name}_label`);

  return (
    <FormControl component='fieldset' variant='standard' fullWidth>
      {label && <FormLabel focused={false}>{label}</FormLabel>}
      <FormGroup onClick={onClick}>
        <FormControlLabel
          value={value}
          disabled={disabled}
          checked
          control={<Checkbox id={name} checked={checked} onChange={onChange} />}
          label={textLabel}
          sx={{ mb: 0, pl: 2 }}
        />
      </FormGroup>
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px' }} id={`${label}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputCheck(props: InputCheckProps) {
  const { name, control, onChange, onClick, checked, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputCheckMUI
              name={name}
              value={field.value}
              onClick={onClick}
              checked={field.value === '' ? false : true}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} {...restProps} />
      )}
    </>
  );
}
