export interface ButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  type: 'handle' | 'submit' | 'reset' | 'redirect';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label: string;
  form?: any;
  url?: string;
  fullWidth?: boolean;
  icon?: string | undefined
}

export interface TypeButtonProps {
  handle: JSX.Element;
  submit: JSX.Element;
  reset: JSX.Element;
  redirect: JSX.Element
}

export interface ButtonMoleculesProps {
  buttons: any;
  sx?: string
}

export interface ReturnButtonProps {
  title?: string;
  url?: string;
  confirmToClose?: boolean
}
