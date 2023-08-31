import * as yup from 'yup';
import { RegularExpressions, ValidationRule } from '@/interfaces';
import {
	regularExpressions as novoRegExp,
	validationRules as novoValidationRules,
} from './validationRules-novo';

let regularExpressions: Partial<RegularExpressions> = {};

regularExpressions = { ...novoRegExp, ...regularExpressions };

export let validationRules: ValidationRule = {
	password: yup
		.string()
		.required('password_required')
		.min(6, 'password_min')
		.max(25, 'password_max')
		.test('passwordValid', 'password_required', (value) =>
			regularExpressions.password?.test(value)
		),
};

validationRules = { ...novoValidationRules, ...validationRules };
