'use client';

import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormLabel, FormHelperText, Radio, FormControlLabel, RadioGroup } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';

function InputRadioMUI(props: InputOptionsProps): JSX.Element {
  const theme = useTheme();
  const { name, label, labelError, error, value, onChange, options, tenant } = props;
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);
  return (
    <FormControl component='fieldset' variant='standard' fullWidth>
      {label && <FormLabel focused={false}>{label}</FormLabel>}
      <RadioGroup name={name} value={value} onChange={onChange}>
        {options.map((option, i: number) => (
          <FormControlLabel
            key={i}
            value={option.value}
            control={<Radio id={name + option.value} />}
            label={option.text}
            sx={{ mb: 0, pl: 2 }}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{ color: theme.palette.error.main, height: '20px' }} id={`${label}-helperText`}>
        {error ? t(`validation.${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputRadio(props: InputOptionsProps) {
  const { name, control, tenant, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputRadioMUI
              name={name}
              value={field.value}
              options={options}
              tenant={tenant}
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
        <InputRadioMUI name={name} onChange={onChange} options={options} tenant={tenant} />
      )}
    </>
  );
}
