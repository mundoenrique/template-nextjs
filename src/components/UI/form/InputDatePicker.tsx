'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/es';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//Internal App
import { useLangStore } from '@/store/langStore';
import { useTranslation } from '@/app/i18n/client';
import { InputDatePickerProps } from '@/interfaces';

function DatePickerMUI(props: InputDatePickerProps) {
  const { name, label, labelError, error, tenant, onChange, value, views, format } = props;
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);
  const inputLabel = label ?? t(`common.${name}_label`);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={t('common.localeLang')}>
      <DatePicker
        slotProps={{
          textField: {
            error: error,
          },
        }}
        label={inputLabel}
        value={value}
        onChange={onChange}
        views={views}
        format={format}
        sx={{ width: '100%' }}
      />
      <FormHelperText sx={{ height: '20px', pl: 2 }} id={`${label}-helperText`}>
        {error ? labelError : ''}
      </FormHelperText>
    </LocalizationProvider>
  );
}

export default function InputDatePicker(props: InputDatePickerProps) {
  const { name, control, onChange, tenant, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePickerMUI
              name={name}
              value={field.value}
              tenant={tenant}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={!!error}
              {...restProps}
            />
          )}
        />
      ) : (
        <DatePickerMUI name={name} onChange={onChange} tenant={tenant} {...restProps} />
      )}
    </>
  );
}
