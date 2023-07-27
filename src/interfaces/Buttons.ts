export interface ButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  form?: any;
  fullWidth?: boolean;
}
