'use client';

import { Controller } from 'react-hook-form';
import { useTranslation } from '@/app/i18n/client';
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
//Internal App
import { InputSelectProps } from '@/interfaces';
import { useLangStore } from '@/store/langStore';

function SelectMUI(props: InputSelectProps) {
  const { name, label, options, labelError, error, value, tenant } = props;
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);
  const textLabel = label ?? t(`common:${name}_label`);

  return (
    <FormControl error={!!error} variant='outlined' sx={{ mb: 2 }} fullWidth>
      <InputLabel htmlFor={name}>{textLabel}</InputLabel>
      <Select id={name} native value={value} label={textLabel}>
        {options.map((option: any, i: number) => (
          <option value={option.value} key={i}>
            {option.text}
          </option>
        ))}
      </Select>
      <FormHelperText sx={{ height: '20px' }}>
        {error ? t(`validation:${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputSelect(props: InputSelectProps) {
  const { name, control, onChange, tenant, options } = props;

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
              tenant={tenant}
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
        <SelectMUI name={name} onChange={onChange} tenant={tenant} options={options} />
      )}
    </>
  );
}
