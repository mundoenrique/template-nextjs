'use client';

import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormLabel, FormHelperText, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
//Internal App
import { InputCheckProps } from '@/interfaces';
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import useGetFormStore from '@/hooks/zustanHooks';

function InputCheckMUI(props: InputCheckProps): JSX.Element {
  const theme = useTheme();
  const { name, label, labelError, onChange, onClick, checked, value, tenant, error, disabled } = props;

  const  lang  = useGetFormStore(useLangStore, (state) => state.lang)
  const { t } = useTranslation(lang!, `${tenant}-general`);
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
  const { name, control, tenant, onChange, onClick, checked, ...restProps } = props;

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
              tenant={tenant}
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
        <InputCheckMUI name={name} onChange={onChange} onClick={onClick} tenant={tenant} {...restProps} />
      )}
    </>
  );
}
