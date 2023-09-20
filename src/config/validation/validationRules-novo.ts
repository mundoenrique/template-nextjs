import * as yup from 'yup';
//Internal app
import { RegularExpressions, ValidationRule } from '@/interfaces';

export const regularExpressions: Partial<RegularExpressions> = {
  onlyNumber: /^[0-9]{2,20}$/,
  onlyOneNumber: /^[0-9]{1}$/,
  namesValid: /^([a-zA-Zñáéíóú]+[s]*)+$/,
  validNickName: /^[a-zA-Z0-9_]{6,16}$/,
  shortPhrase: /^[a-zA-Z0-9ñáéíóú ().]{4,25}$/,
  longPhrase: /^[a-zA-Z0-9ñáéíóú ().,:;-]{5,150}$/,
  alphaName: /^[a-zA-Zñáéíóú ]{1,50}$/,
  alphaLetter: /^[a-zA-Zñáéíóú]{4,20}$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  alphanumunder: /^[wñÑ_]+$/,
  alphanum: /^[a-zA-Z0-9]+$/,
  password: /^[\w\-+.ñÑ]+$/,
  numeric: /^[0-9]+$/,
  phone: /^[0-9]{7,15}$/,
  phoneMasked: /^[0-9*]{7,20}$/,
  floatAmount: /^[0-9.,]+(.,[0-9]{2})?$/,
  date: {
    dmy: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/[0-9]{4}$/,
    my: /^(0?[1-9]|1[012])\/[0-9]{4}$/,
    y: /^[0-9]{4}$/,
  },
  checkedOption: /^([0|1])$/,
  docType: /^(CC|PP)$/,
};

export const validationRules: ValidationRule = {
  email: yup
    .string()
    .email('email_invalid')
    .required('email_required')
    .min(7, 'email_invalid')
    .test('emailValid', 'email_invalid', (value) => regularExpressions.emailValid?.test(value)),
  password: yup
    .string()
    .required('password_required')
    .min(6, 'password_min')
    .max(25, 'password_max')
    .test('passwordValid', 'password_required', (value) => regularExpressions.password?.test(value)),
  programs: yup.string().required('programs_required'),
  initialDate: yup.string().required('initialDate_required'),
  roles: yup.string().required('roles_required'),
  term: yup.string().required('term_required'),
};
