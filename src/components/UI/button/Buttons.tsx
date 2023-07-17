import { Box } from '@mui/material';
//Internal app
import ButtonType from './ButtonType';
import { ButtonMoleculesProps, ButtonProps } from '@/interfaces';

export default function Buttons({ buttons, sx }: ButtonMoleculesProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: buttons?.length > 1 ? 'space-between' : 'end', sx }}>
      {buttons.map((button: ButtonProps, i: string) => (
        <ButtonType
          key={i}
          label={button.label}
          variant={button.variant}
          type={button.type}
          onClick={button.onClick}
          isLoading={button.isLoading}
          form={button.form}
          url={button.url}
          fullWidth={button.fullWidth}
          icon={button.icon}
        />
      ))}
    </Box>
  );
}
