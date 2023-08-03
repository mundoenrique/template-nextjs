import * as yup from 'yup';
import { Field, ValidationRule, ValidationShape } from '@/interfaces';

const regularExpressions = {
	alphabeticalSpace: /^['a-z ']{3,40}$/i,
	alphabeticalNumber: /^['a-z 0-9']+$/i,
	number: /^[0-9]+$/,
	emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
	password: /^[\w!@*\-?¡¿+/.,#ñÑ]+$/,
};

const validationRules: ValidationRule = {
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
	username: yup.string().required('username_required'),
	code: yup.string().required('Code is required'),
	city: yup.string().required('City is required'),
	address: yup.string().required('Address is required'),
};

/**
 * Genera un esquema de validación de yup basado en una matriz de campos de formulario.
 */
export const getSchema = (fields: Field[]): yup.ObjectSchema<any> => {
	const shape = fields.reduce<ValidationShape>((acc, field) => {
		if (typeof field === 'string') {
			acc[field] = validationRules[field];
		} else if (typeof field === 'object') {
			const key = Object.keys(field)[0];
			const subFields = field[key];
			acc[key] = yup.array().of(
				yup.object().shape(
					subFields.reduce<ValidationShape>((subAcc, subField) => {
						subAcc[subField] = validationRules[subField];
						return subAcc;
					}, {})
				)
			);
		}
		return acc;
	}, {});
	return yup.object().shape(shape);
};
