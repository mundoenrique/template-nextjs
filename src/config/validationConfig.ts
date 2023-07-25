import * as yup from 'yup';

const regularExpressions = {
  alphabeticalSpace: /^['a-z ']{3,40}$/i,
  alphabeticalNumber: /^['a-z 0-9']+$/i,
  number: /^[0-9]+$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
  password: /^[\w!@*\-?¡¿+/.,#ñÑ]+$/,
};

export const getSchema = yup.object().shape({
  email: yup
    .string()
    .email('email_invalid')
    .required('email_required')
    .min(7, 'email_invalid')
    .matches(regularExpressions.emailValid, 'email_invalid'),
  password: yup
    .string()
    .required('password_required')
    .min(6, 'password_min')
    .max(25, 'password_max')
    .matches(regularExpressions.password, 'password_regex'),
  programs: yup.string().required('programs_required'),
  initialDate: yup.string().required('initialDate_required'),
  roles: yup.string().required('roles_required'),
  term: yup.string().required('term_required'),
});
