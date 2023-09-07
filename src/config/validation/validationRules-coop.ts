import * as yup from 'yup';
import { RegularExpressions, ValidationRule } from '@/interfaces';
import {
	regularExpressions as novoRegExp,
	validationRules as novoValidationRules,
} from './validationRules-novo';

let regularExpressions: Partial<RegularExpressions> = {
	password: /^[\w\-+.ñÑ]+$/,
	validNickName: /^([a-zA-Z]{2}[a-zA-Z0-9_]{4,14})$/,
	docType: /^(C|E|F|N|U|P|T)$/,
};

regularExpressions = { ...novoRegExp, ...regularExpressions };

export let validationRules: ValidationRule = {};

validationRules = { ...novoValidationRules, ...validationRules };
