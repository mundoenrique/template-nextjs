'use client';

import { Controller } from 'react-hook-form';
import { useTranslation } from '@/app/i18n/client';
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';

function SelectMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, options, labelError, error, value, onChange } = props;
  const { t } = useTranslation();
  const textLabel = label ?? t(`form.${name}_label`);

  return (
    <FormControl error={!!error} variant='outlined' sx={{ mb: 2 }} fullWidth>
      <InputLabel id={name}>{textLabel}</InputLabel>
      <Select labelId={name} value={value} label={textLabel} onChange={onChange}>
        {options.map((option: any, i: number) => (
          <MenuItem value={option.value} key={i}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ height: '20px' }}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputSelect(props: InputOptionsProps) {
  const { name, control, onChange, options } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectMUI
              name={name}
              value={field.value}
              options={options}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
            />
          )}
        />
      ) : (
        <SelectMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
