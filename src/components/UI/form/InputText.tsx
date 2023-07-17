"use client";

import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Controller } from "react-hook-form";
//Internal app
import { TextFieldProps } from "@/interfaces";
import { useLangStore } from "@/store/langStore";
import { useTranslation } from "@/app/i18n/client";

function InputMUI(props: TextFieldProps): JSX.Element {
  const {
    name,
    label,
    helperText,
    type,
    optional,
    error,
    value,
    tenant,
    onChange,
  } = props;
  const { lang } = useLangStore();
  const { t } = useTranslation(lang, `${tenant}-general`);
  const textLabel = label ?? t(`form.${name}_label`);

  return (
    <FormControl variant="outlined" error={!!error} sx={{ mb: 2 }} fullWidth>
      <InputLabel htmlFor={name}>{textLabel}</InputLabel>
      <OutlinedInput
        id={name}
        type={type ?? "text"}
        label={textLabel}
        aria-describedby={`${name}-helperText`}
        error={!!error}
        value={value}
        onChange={onChange}
        endAdornment={
          optional ? (
            <InputAdornment position="end">
              {t("form.optional_label")}
            </InputAdornment>
          ) : (
            ""
          )
        }
      />
      <FormHelperText sx={{ height: "20px" }} id={`${name}-helperText`}>
        {error ? t(`validation.${error.message}`) : helperText || ""}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputText(props: TextFieldProps) {
  const { name, control, tenant, onChange } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMUI
              name={name}
              value={field.value}
              tenant={tenant}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
            />
          )}
        />
      ) : (
        <InputMUI name={name} onChange={onChange} tenant={tenant} />
      )}
    </>
  );
}
