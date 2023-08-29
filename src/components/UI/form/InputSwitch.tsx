'use client';

import React, { useEffect, useState } from "react";
import { Controller } from 'react-hook-form';
import { FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material';
//Internal App
import { SwitchListProps } from '@/interfaces';

function SwitchMUI(props: SwitchListProps): JSX.Element {
  const { name, setValue, options } = props;  
  const [checkedSwitch, setCheckedSwitch] = useState({
    necessaryCookies: options[0].value,
    functionalyCookies: options[1].value,
    performanceCookies: options[2].value,
  });

  const handleSelect = (option: any, index: number, type: string) => {
    options[index].value = option.value === true ? false : true
    setCheckedSwitch({ ...checkedSwitch, [options[index].name]: options[index].value })
  };

  // setting form value manually here
  useEffect(() => {
    setValue(options[0].name, options[1].name, options[2].name, checkedSwitch);
  }, [options, checkedSwitch, setValue]);

  return (
    <FormControl component='fieldset' variant='standard' fullWidth>
      <FormGroup >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            label={option.title}
            name={option.name}
            checked
            disabled={option.required}
            sx={{ mb: 0, pl: 2 }}
            control={<Switch
              id={name + option.id}
              disabled={option.required}
              checked={option.value}
              onChange={() => handleSelect(option, index, 'null')} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default function SwitchCheck(props: SwitchListProps) {
  const { name, control, tenant, onChange, options, checked, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SwitchMUI
              name={name}
              value={field.value}
              options={options}
              tenant={tenant}
              checked={field.value === true ? false : true}
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
        <SwitchMUI name={name} onChange={onChange} options={options} tenant={tenant} {...restProps} />
      )}
    </>
  );
}
